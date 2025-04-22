/*******************************************************************************************
 * objetivo: criar a comunicação com o banco de dados, para fazer o CROUD de filmes
 * data: 21/04/25
 * autor: Eduarda Silva
 * versão: 1.0
 *******************************************************************************************/


// import da biblioteca do prisma client para executar os scripts SQL
const{PrismaClient } = require('@prisma/client')

// instancia (criar um objeto a ser utilizado) a bliblioteca do prisma/client
const prisma = new PrismaClient()

// função para inserir uma nova classificação
const insertClassificacao = async function(classificacao){
    try{
        let sql = `insert into tbl_classificacao (
                   descricao
                )
                    values(
                        '${classificacao.descricao}'
                    )`

         // await só funciona com o "async", serve para fazer uma pausa no terminal para aguardar a conexão com o banco de dados
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
 
    }catch (error){
        // console.log(error)
        return false
    }

   
}

// função para atualizar um filme existente
const updateClassificacao = async function(classificacao){

    try {
        
        let sql = `update tbl_classificacao set descricao  = '${classificacao.descricao}', 
                                    where id_classificacao = ${classificacao.id}
                                    `
                            
        let resultClassificacao = await prisma.$executeRawUnsafe(sql)

        if(resultClassificacao){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }

}

// função para deletar uma classificação existente
const deleteClassificacao = async function(id){
    try {
        let sql = `delete from tbl_classificacao where id_classificacao = ${id}`

        let result =  await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

// função para retornar todas as classificações existentes
const selectAllClassificacao = async function(){
    try{
        //scriptSQL para retornar todos os dados
        let sql = 'select * from tbl_classificacao order by id_classificacao desc'

        //executa o scriptSQL no banco de dados e aguarda o retorno dos dados 
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false

    }catch(error){
        return false
    }
}

// função para buscar uma classificacao pelo id
const selecByIdClassificacao = async function(id){
    
    try {
        let sql = `select * from tbl_classificacao where id_classificacao = ${id}`

        let result =  await prisma.$queryRawUnsafe(sql)

        if (result) {
            return result
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

module.exports = {
    insertClassificacao,
    updateClassificacao,
    deleteClassificacao,
    selectAllClassificacao,
    selecByIdClassificacao
    
}