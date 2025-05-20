/*******************************************************************************************
 * objetivo: criar a comunicação com o banco de dados, para fazer o CROUD de filmes
 * data: 13/05/25
 * autor: Eduarda Silva
 * versão: 1.0
 *******************************************************************************************/


// import da biblioteca do prisma client para executar os scripts SQL
const{PrismaClient } = require('@prisma/client')

// instancia (criar um objeto a ser utilizado) a bliblioteca do prisma/client
const prisma = new PrismaClient()

// função para inserir um novo sexo
const insertSexo = async function(sexo){
    try{
        let sql = `insert into tbl_sexo (
                   descricao,
                   abreviacao
                )
                    values(
                        '${sexo.descricao}',
                        '${sexo.abreviacao}'
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

// função para atualizar um sexo existente
const updateSexo = async function(sexo){

    try {
        
        let sql = `update tbl_sexo set descricao  = '${sexo.descricao}',
                                       abreviacao = '${sexo.abreviacao}'
                                    where id_sexo = ${sexo.id}
                                    `
                            
        let resultSexo = await prisma.$executeRawUnsafe(sql)

        if(resultSexo){
            return true
        }else{
            return false
        }

    } catch (error) {
        return false
    }

}

// função para deletar um sexo existente
const deleteSexo = async function(id){
    try {
        let sql = `delete from tbl_sexo where id_sexo = ${id}`

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

// função para retornar todos os sexos existentes
const selectAllSexo = async function(){
    try{

        //scriptSQL para retornar todos os dados
        let sql = 'select * from tbl_sexo order by id_sexo desc'

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

// função para buscar um sexo pelo id
const selecByIdSexo = async function(id){
    
    try {
        let sql = `select * from tbl_sexo where id_sexo = ${id}`

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
    insertSexo,
    updateSexo,
    deleteSexo,
    selectAllSexo,
    selecByIdSexo
}




