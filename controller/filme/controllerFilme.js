/*******************************************************************************************
 * objetivo: controller responsável pela regra de negócio referente ao CROUD de filme
 * data: 11/02/25
 * autor: Eduarda Silva
 * versão: 1.0
 *******************************************************************************************/

// import do arquivo de mensagens e status code o projeto
const message = require('../../modulo/config.js')

// import do arquivo para realizar o CROUD de dados no Banco de Dados
const filmeDAO = require('../../model/DAO/filme.js')

// função para tratar a inserção de um novo filme no DAO
const inserirFilme = async function(filme, contentType){

    try{

        if(String(contentType).toLowerCase() == 'application/json'){
            if ( filme.nome             == '' || filme.nome             == undefined || filme.nome             == null || filme.nome.length              > 80 ||
                filme.duracao          == '' || filme.duracao          == undefined || filme.duracao          == null || filme.duracao.length           > 5 ||
                filme.sinopse          == '' || filme.sinopse          == undefined || filme.sinopse          == null ||
                filme.data_lancamento  == '' || filme.data_lancamento  == undefined || filme.data_lancamento  == null || filme.data_lancamento.length  > 10 ||
                filme.foto_capa        == undefined || filme.foto_capa.length     > 200 ||
                filme.link_trailer     == undefined || filme.link_trailer.length  > 200 
               )
       
           {
               // response.status_code = 400
               // response.message = "Os atributos informados na requisição não estão de acordo. Ex: Campos obrigatórios, quantidade de caractéries..."
       
               return message.ERRO_REQUIRED_FIELD //400
           }else{
               let resultfilme= await filmeDAO.insertFilme(filme)
       
               if(resultfilme){
                   return message.SUCCESS_CREATED_ITEM //201
               }else{
                   return message.ERROR_INTERNAL_SERVER_MODEL //500
               }
                   
           }   
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }

        
    }catch(error){
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
    
        
}

// função para tratar a atualização de um filme no DAO
const atualizarFilme = async function(){
    
}

// função para tratar a exclusão de um filme no DAO
const excluirFilme = async function(){
    
}

// função para tratar o retorno de uma lista de filmes no DAO
const listarFilme = async function(){
        try {

            //objeto do tipo JSON
            let dadosFilme = {}

            //chama a funçção para retornar os filmes cadastrados
            let resultFilme = await filmeDAO.selectAllFilme()

            if(resultFilme != false){
                if(resultFilme.length > 0){

                    //criando um JSON de retorno de dados para API
                    dadosFilme.status = true
                    dadosFilme.status_code = 200
                    dadosFilme.items = resultFilme.length
                    dadosFilme.films = resultFilme

                    return dadosFilme

                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } catch (error) {
            return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
        }
}

// função para tratar o retorno de um filme filtrando pelo ID do DAO
const buscarFilme = async function(){
    
}

module.exports = {
    inserirFilme,
    atualizarFilme,
    excluirFilme,
    listarFilme,
    buscarFilme
}