/*******************************************************************************************
 * objetivo: criar a comunicação com o banco de dados, para fazer o CROUD de filmes
 * data: 22/04/25
 * autor: Eduarda Silva
 * versão: 1.0
 *******************************************************************************************/


// import da biblioteca do prisma client para executar os scripts SQL
const{PrismaClient } = require('@prisma/client')

// instancia (criar um objeto a ser utilizado) a bliblioteca do prisma/client
const prisma = new PrismaClient()

// função para inserir um novo idioma
const insertIdioma = async function(idioma){
    try{
        let sql = `insert into tbl_idioma (
                    pais, 
                    nome, 
                    codigo
                )
                    values(
                        '${idioma.pais}',
                        '${idioma.nome}',
                        '${idioma.codigo}'
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

// função para atualizar um idioma existente
const updateIdioma = async function(idioma){
    try {
        
        let sql = `update tbl_idioma set pais            = '${idioma.pais}', 
                                         nome            = '${idioma.nome}', 
                                         codigo          = '${idioma.codigo}'
                                        where id_idioma  = ${idioma.id}
                                    `
                            
        let resultIdioma = await prisma.$executeRawUnsafe(sql)

        if(resultIdioma){
            return true
        }else{
            return false
        }

    } catch (error) {
        return false
    }

}

// função para deletar um idioma existente
const deleteIdioma = async function(id){
    try {
        let sql = `delete from tbl_idioma where id_idioma = ${id}`

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

// função para retornar todos os idiomas existentes
const selectAllIdioma = async function(){
    try{

        //scriptSQL para retornar todos os dados
        let sql = 'select * from tbl_idioma order by id_idioma desc'

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

// função para buscar um idioma pelo id
const selecByIdIdioma = async function(id){
    try {
        let sql = `select * from tbl_idioma where id_idioma = ${id}`

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
    insertIdioma,
    updateIdioma,
    deleteIdioma,
    selectAllIdioma,
    selecByIdIdioma
}




