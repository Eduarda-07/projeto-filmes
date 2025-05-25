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

// função para inserir um novo genero
const insertGenero = async function(genero){
    try{
        let sql = `insert into tbl_genero (
                   descricao
                )
                    values(
                        '${genero.descricao}'
                    )`

         // await só funciona com o "async", serve para fazer uma pausa no terminal para aguardar a conexão com o banco de dados
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
 
    }catch (error){
        console.log(error);
        
        return false
    }

   
}

// função para atualizar um genero existente
const updateGenero = async function(genero){

    try {
        
        let sql = `update tbl_genero set descricao = '${genero.descricao}'
                                    where id_genero = ${genero.id}
                                    `
                            
        let resultGenero = await prisma.$executeRawUnsafe(sql)

        if(resultGenero){
            return true
        }else{
            return false
        }

    } catch (error) {
        return false
    }

}

// função para deletar um genero existente
const deleteGenero = async function(id){
    try {
        let sql = `delete from tbl_genero where id_genero = ${id}`

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

// função para retornar todos os generos existentes
const selectAllGenero = async function(){
    try{

        //scriptSQL para retornar todos os dados
        let sql = 'select * from tbl_genero order by id_genero desc'

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

// função para buscar um genero pelo id
const selecByIdGenero = async function(id){
    
    try {
        let sql = `select * from tbl_genero where id_genero = ${id}`

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
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGenero,
    selecByIdGenero
}




