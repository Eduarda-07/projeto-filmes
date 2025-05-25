/*******************************************************************************************
 * objetivo: controller responsável pela regra de negócio referente ao CROUD de avaliação
 * data: 20/05/25
 * autor: Eduarda Silva
 * versão: 1.0
 *******************************************************************************************/

// import do arquivo de mensagens e status code o projeto
const message = require('../../modulo/config.js')

// import do arquivo para realizar o CROUD de dados no Banco de Dados
const avaliacaoDAO = require('../../model/DAO/avaliacao.js')

const controllerFilme   = require('../filme/controllerFilme.js')

// função para tratar a inserção de uma nova avaliacao no DAO
const inserirAvaliacao = async function(avaliacao, contentType){

    try{
        //contentType é quem chega o body, especificando que deve ser json
        if(String(contentType).toLowerCase() == 'application/json'){
            if ( 
                avaliacao.descricao    == '' || avaliacao.descricao  == undefined || avaliacao.descricao  == null || avaliacao.descricao.length   > 45 ||
                avaliacao.nota == '' || avaliacao.nota == undefined || avaliacao.nota == null || isNaN(avaliacao.nota) || avaliacao.nota < 0 || avaliacao.nota > 10  ||
                avaliacao.id_filme     == '' || avaliacao.id_filme   == undefined || avaliacao.id_filme   == null || isNaN(avaliacao.id_filme)    || avaliacao.id_filme <= 0
               )
       
           {
               return message.ERROR_REQUIRED_FIELD //400
           }else{
               let resultAvaliacao = await avaliacaoDAO.insertAvaliacao(avaliacao)
       
               if(resultAvaliacao){
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

// função para tratar a atualização de uma avaliacao no DAO
const atualizarAvaliacao = async function(id, avaliacao, contentType){
    try {
        //contentType é quem chega o body, especificando que deve ser json
        if(String(contentType).toLowerCase() == 'application/json'){
            if (
                id                     == '' || id                   == undefined || id                   == null || isNaN(id) || id <= 0              ||
                avaliacao.descricao    == '' || avaliacao.descricao  == undefined || avaliacao.descricao  == null || avaliacao.descricao.length   > 45 ||
                avaliacao.nota == '' || avaliacao.nota == undefined || avaliacao.nota == null || isNaN(avaliacao.nota) || avaliacao.nota < 0 || avaliacao.nota > 10  ||
                avaliacao.id_filme     == '' || avaliacao.id_filme   == undefined || avaliacao.id_filme   == null || isNaN(avaliacao.id_filme)         || avaliacao.id_filme <= 0
               )
       
           {
               return message.ERROR_REQUIRED_FIELD //400
           }else{

               //validação para verificar se o id existe no banco
               let resultAvaliacao = await avaliacaoDAO.selectByIdAvaliacao(parseInt(id))
               
               if(resultAvaliacao != false || typeof(resultAvaliacao) == 'object'){

                    if(resultAvaliacao.length > 0){

                        //update
                        //adiciona o id da avaliacao no json com os dados
                        avaliacao.id = parseInt(id)

                        let result = await avaliacaoDAO.updateAvaliacao(avaliacao)

                        if(result){
                            return message.SUCCESS_UPDATED_ITEM //200
                        }else{
                            
                            return message.ERROR_INTERNAL_SERVER_MODEL //500
                        }

                    }else{
                        return message.ERROR_NOT_FOUND // 404
                    }
               }else{
                
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
               }
           }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        console.log(error);
        
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }


}

// função para tratar a exclusão de um filme no DAO
const excluirAvaliacao = async function(id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELD //400
        } else {

            //função para verificar se o id existe no banco de dados
            let resultAvaliacao = await avaliacaoDAO.selectByIdAvaliacao(parseInt(id))

            if(resultAvaliacao != false || typeof(resultAvaliacao) == 'object'){

                //se existir, aremos o delete
                if (resultAvaliacao.length > 0) {
    
                    //delete
                    let result = await avaliacaoDAO.deleteAvaliacao(parseInt(id))

                    if (result) {
                        return message.SUCCESS_DELETED_ITEM //200
                    } else {
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
    
                } else {
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// função para tratar o retorno de uma lista de filmes no DAO
const listarAvaliacao = async function(){
        try {

            let arrayAvaliacao = []

            //objeto do tipo JSON
            let dadosAvaliacao = {}

            //chama a funçção para retornar os filmes cadastrados
            let resultAvaliacao = await avaliacaoDAO.selectAllAvaliacao()

            if(resultAvaliacao != false || typeof(resultAvaliacao) == 'object'){
                if(resultAvaliacao.length > 0){

                    //criando um JSON de retorno de dados para API
                    dadosAvaliacao.status = true
                    dadosAvaliacao.status_code = 200
                    dadosAvaliacao.items = resultAvaliacao.length

                    for(const itemAvaliacao of resultAvaliacao){
                        // console.log("Item da Avaliação:", itemAvaliacao)
                     /* Monta o objeto do filme para retornar na avaliação */
                     //Busca os dados do filme na controller de filmes
                    let dadosFilme = await controllerFilme.buscarFilme(itemAvaliacao.id_filme)
                    
                    //verificando a existencia do filme no bd
                    if (dadosFilme && dadosFilme.films) {
                        itemAvaliacao.filme = dadosFilme.films;
                      } else {
                        itemAvaliacao.filme = null
                      }
                    //Adiciona um atributo filme no JSON de avaliações e coloca os dados do filme
                     itemAvaliacao.filme = dadosFilme.films
                    //Remover o id do JSON
                    delete itemAvaliacao.id_filme
                                                                
                    //Adiciona em um novo array o JSON de filmes com a sua nova estrutura de dados
                    arrayAvaliacao.push(itemAvaliacao)
                            
                                     
                    }
                    dadosAvaliacao.avaliacoes = resultAvaliacao

                    return dadosAvaliacao

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
const buscarAvaliacao = async function(id){
    try {
        if ( id === ""   ||   id === undefined || id === null  || isNaN(id)  || id <= 0 ) {
            
            return message.ERROR_REQUIRED_FIELD //400

        } else {
            let dadosAvaliacao = {}
            let arrayAvaliacao = []

            let resultAvaliacao= await avaliacaoDAO.selectByIdAvaliacao(parseInt(id))

            if(resultAvaliacao!= false || typeof(resultAvaliacao) == 'object'){

                if(resultAvaliacao.length > 0){

                    dadosAvaliacao.status = true
                    dadosAvaliacao.status_code = 200

                    for(const itemAvaliacao of resultAvaliacao){
                        /* Monta o objeto do filme para retornar na avaliação */
                        //Busca os dados do filme na controller de filmes
                       let dadosFilme = await controllerFilme.buscarFilme(itemAvaliacao.id_filme)
                       //Adiciona um atributo filme no JSON de avaliações e coloca os dados do filme
                       itemAvaliacao.filme = dadosFilme.films
                       //Remover o id do JSON
                       delete itemAvaliacao.id_filme
                                                                   
                       //Adiciona em um novo array o JSON de filmes com a sua nova estrutura de dados
                       arrayAvaliacao.push(itemAvaliacao)
                               
                                        
                       }

                    dadosAvaliacao.avaliacao = arrayAvaliacao
    
                    return dadosAvaliacao
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
          
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirAvaliacao,
    atualizarAvaliacao,
    excluirAvaliacao,
    listarAvaliacao,
    buscarAvaliacao
}