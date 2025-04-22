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

// função para inserir uma nova categoria
const insertPremiacao = async function(premiacao){
    try{
        let sql = `insert into tbl_premiacao (
                    nome,
                    ano_indicacao
                )
                    values(
                        '${premiacao.nome}',
                        '${premiacao.ano_indicacao}'
                    )`

         // await só funciona com o "async", serve para fazer uma pausa no terminal para aguardar a conexão com o banco de dados
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
 
    }catch (error){
        console.log(error)
        return false
    }
}

// função para atualizar uma categoria existente
const updatePremiacao = async function(premiacao){

    try {
        
        let sql = `update tbl_premiacao set nome  = '${premiacao.descricao}',
                                            ano_indicacao = '${premiacao.ano_indicacao}'
                                        where id_premiacao = ${premiacao.id}
                                    `
        let resultPremiacao = await prisma.$executeRawUnsafe(sql)

        if(resultPremiacao){
            return true
        }else{
            return false
        }

    } catch (error) {
        console.log(error);
        
        return false
    }
}

// função para deletar uma categoria existente
const deletePremiacao = async function(id){
    try {
        let sql = `delete from tbl_premiacao where id_premiacao = ${id}`

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

// função para retornar todos as categorias existentes
const selectAllPremiacao = async function(){
    try{

        //scriptSQL para retornar todos os dados
        let sql = 'select * from tbl_premiacao order by id_premiacao desc'

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

// função para buscar uma categoria pelo id
const selecByIdPremiacao= async function(id){
    
    try {
        let sql = `select * from tbl_premiacao where id_premiacao = ${id}`

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
    insertPremiacao,
    updatePremiacao,
    deletePremiacao,
    selectAllPremiacao,
    selecByIdPremiacao
}