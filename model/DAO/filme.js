/*******************************************************************************************
 * objetivo: criar a comunicação com o banco de dados, para fazer o CROUD de filmes
 * data: 11/02/25
 * autor: Eduarda Silva
 * versão: 1.0
 *******************************************************************************************/


// import da biblioteca do prisma client para executar os scripts SQL
const{PrismaClient } = require('@prisma/client')


// função para inserir um novo filme
const insertFilme = async function(filme){

    // instancia (criar um objeto a ser utilizado) a bliblioteca do prisma/client
    const prisma = new PrismaClient()

    //
    let sql = `insert into tbl_filme (
                    nome, 
                    duracao, 
                    sinopse, 
                    data_lancamento, 
                    foto_capa, 
                    link_trailer
                    )
                    
                    values(
                        ${filme.nome},
                        ${filme.duracao},
                        ${filme.sinopse},
                        ${filme.data_lancamento},
                        ${filme.foto_capa},
                        ${filme.link_trailer}
                        )`

    // await só funciona com o "async", serve para fazer uma pausa no terminal para aguardar a conexão com o banco de dados
    let result = await prisma.$executeRawUnsafe(sql)

    if(result)
        return true
    else
        return false
    
}

// função para atualizar um filme existente
const updateFilme = async function(){

}

// função para deletar um filmeexistente
const deleteFilme = async function(){

}

// função para retornar todos os filmes existentes
const selectAllFilme = async function(){

}

// função para buscar um filme pelo id
const selecByIdFilme = async function(){

}

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilme,
    selecByIdFilme
}




