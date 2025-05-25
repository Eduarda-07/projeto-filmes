/*******************************************************************************************
 * objetivo: criar a comunicação com o banco de dados, para fazer o CROUD de filmes
 * data: 20/05/25
 * autor: Eduarda Silva
 * versão: 1.0
 *******************************************************************************************/


// import da biblioteca do prisma client para executar os scripts SQL
const{PrismaClient } = require('@prisma/client')

// instancia (criar um objeto a ser utilizado) a bliblioteca do prisma/client
const prisma = new PrismaClient()

// função para inserir um novo filme
const insertAvaliacao = async function(avaliacao){
    try{
        let sql = `insert into tbl_avaliacao (
                    descricao, 
                    nota, 
                    id_filme
                )
                    values(
                        '${avaliacao.descricao}',
                        '${avaliacao.nota}',
                        '${avaliacao.id_filme}'
                    )`

         // await só funciona com o "async", serve para fazer uma pausa no terminal para aguardar a conexão com o banco de dados
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return result
        else
            return false
 
    }catch (error){
       console.log(error);
       
        return false
    }
}

// função para atualizar um filme existente
const updateAvaliacao = async function(avaliacao){

    try {
        
        let sql = `update tbl_avaliacao set descricao       = '${avaliacao.descricao}', 
                                            nota            = '${avaliacao.nota}', 
                                            id_filme        = ${avaliacao.id_filme}
                                    where id_avaliacao = ${avaliacao.id}
                                    `
                            
        let resultAvaliacao = await prisma.$executeRawUnsafe(sql)

        if(resultAvaliacao){
            return true
        }else{
            return false
        }

    } catch (error) {
        console.log(error);
        
        return false
    }

}

// função para deletar um filme existente
const deleteAvaliacao = async function(id){
    try {
        let sql = `delete from tbl_avaliacao where id_avaliacao = ${id}`

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

// função para retornar todos os filmes existentes
const selectAllAvaliacao = async function(){
    try{

        //scriptSQL para retornar todos os dados
        let sql = 'select * from tbl_avaliacao order by id_avaliacao desc'

        //executa o scriptSQL no banco de dados e aguarda o retorno dos dados 
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false

    }catch(error){
        console.log(error);
        
        return false
    }
}

// função para buscar um filme pelo id
const selectByIdAvaliacao = async function(id){
    
    try {
        let sql = `select * from tbl_avaliacao where id_avaliacao = ${id}`

        let result =  await prisma.$queryRawUnsafe(sql)

        if (result) {
            return result
        } else {
            return false
        }
    } catch (error) {
        console.log(error);
        
        return false
    }

}

module.exports = {
    insertAvaliacao,
    updateAvaliacao,
    deleteAvaliacao,
    selectAllAvaliacao,
    selectByIdAvaliacao
}




