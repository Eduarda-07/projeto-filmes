/*************************************************************************************************
 * objetivo: criar a comunicação com o banco de dados, para fazer o CROUD da tabela Nacionalidade
 * data: 10/04/25
 * autor: Eduarda Silva
 * versão: 1.0
 *************************************************************************************************/


// import da biblioteca do prisma client para executar os scripts SQL
const{PrismaClient } = require('@prisma/client')

// instancia (criar um objeto a ser utilizado) a bliblioteca do prisma/client
const prisma = new PrismaClient()

// função para inserir um novo registro
const insertNacionalidade = async function(nacionalidade){
    try{
        let sql = `insert into tbl_nacionalidade(
                    descricao
                )
                 
                    values(
                        '${nacionalidade.descricao}'
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

const updateNacionalidade = async function(nacionalidade){

    try {
        
        let sql = `update tbl_nacionalidade set 
                                    descricao = '${nacionalidade.descricao}'
                                    where id_nacionalidade = ${nacionalidade.id}`

        let resultNacionalidade = await prisma.$executeRawUnsafe(sql)

        if(resultNacionalidade){
            return true
        }else{
            return false
        }

    } catch (error) {
      
        return false
    }

}

const deleteNacionalidade = async function(id){
    try {
        let sql = `delete from tbl_nacionalidade where id_nacionalidade = ${id}`

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

const selectAllNacionalidade = async function(){
    try{

        let sql = 'select * from tbl_nacionalidade order by id_nacionalidade desc'

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false

    }catch(error){
        return false
    }
}

const selecByIdNacionalidade = async function(id){
    
    try {
        let sql = `select * from tbl_nacionalidade where id_nacionalidade = ${id}`

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
    insertNacionalidade,
    updateNacionalidade,
    deleteNacionalidade,
    selectAllNacionalidade,
    selecByIdNacionalidade
}
