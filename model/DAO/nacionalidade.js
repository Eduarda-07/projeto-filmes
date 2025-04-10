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
                        '${filme.descricao}'
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
