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
const insertCategoria = async function(categoria){
    try{
        let sql = `insert into tbl_categoria (
                    descricao
                )
                    values(
                        '${categoria.descricao}'
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

// função para atualizar uma categoria existente
const updateCategoria = async function(categoria){

    try {
        
        let sql = `update tbl_categoria set nome  = '${categoria.descricao}'
                                        where id_categoria = ${descricao.id}
                                    `
        let resultCategoria = await prisma.$executeRawUnsafe(sql)

        if(resultCategoria){
            return true
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

// função para deletar uma categoria existente
const deleteCategoria = async function(id){
    try {
        let sql = `delete from tbl_categoria where id_categoria = ${id}`

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
const selectAllCategoria = async function(){
    try{

        //scriptSQL para retornar todos os dados
        let sql = 'select * from tbl_categoria order by id_categoria desc'

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
const selecByIdCategoria = async function(id){
    
    try {
        let sql = `select * from tbl_categoria where id_categoria = ${id}`

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
    insertCategoria,
    updateCategoria,
    deleteCategoria,
    selectAllCategoria,
    selecByIdCategoria
}