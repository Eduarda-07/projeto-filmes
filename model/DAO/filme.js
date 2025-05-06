/*******************************************************************************************
 * objetivo: criar a comunicação com o banco de dados, para fazer o CROUD de filmes
 * data: 11/02/25
 * autor: Eduarda Silva
 * versão: 1.0
 *******************************************************************************************/


// import da biblioteca do prisma client para executar os scripts SQL
const{PrismaClient } = require('@prisma/client')

// instancia (criar um objeto a ser utilizado) a bliblioteca do prisma/client
const prisma = new PrismaClient()

// função para inserir um novo filme
const insertFilme = async function(filme){
    try{
        let sql = `insert into tbl_filme (
                    nome, 
                    duracao, 
                    sinopse, 
                    data_lancamento, 
                    foto_capa, 
                    link_trailer,
                    id_classificacao,
                    id_idioma,
                    id_nacionalidade
                )
                 
                    values(
                        '${filme.nome}',
                        '${filme.duracao}',
                        '${filme.sinopse}',
                        '${filme.data_lancamento}',
                        '${filme.foto_capa}',
                        '${filme.link_trailer}',
                        '${filme.id_classificacao}'
                        ' ${filme.id_idioma}',
                        '${filme.id_nacionalidade}'
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
const updateFilme = async function(filme){

    try {
        
        let sql = `update tbl_filme set nome                = '${filme.nome}', 
                                        duracao             = '${filme.duracao}', 
                                        sinopse             = '${filme.sinopse}', 
                                        data_lancamento     = '${filme.data_lancamento}', 
                                        foto_capa           = '${filme.foto_capa}', 
                                        link_trailer        = '${filme.link_trailer}',
                                        id_classificacao    = '${filme.id_classificacao}'
                                        id_idioma           = ' ${filme.id_idioma}',
                                        id_nacionalidade    = '${filme.id_nacionalidade}'
                                    where id = ${filme.id}
                                    `
                            
        let resultFilme = await prisma.$executeRawUnsafe(sql)

        if(resultFilme){
            return true
        }else{
            return false
        }

    } catch (error) {
        return false
    }

}

// função para deletar um filme existente
const deleteFilme = async function(id){
    try {
        let sql = `delete from tbl_filme where id = ${id}`

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
const selectAllFilme = async function(){
    try{

        //scriptSQL para retornar todos os dados
        let sql = 'select * from tbl_filme order by id desc'

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

// função para buscar um filme pelo id
const selecByIdFilme = async function(id){
    
    try {
        let sql = `select * from tbl_filme where id = ${id}`

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
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilme,
    selecByIdFilme
}




