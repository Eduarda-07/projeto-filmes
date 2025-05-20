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


// função para tratar a inserção de uma nova avaliacao no DAO
const inserirAvaliacao = async function(avaliacao, contentType){

    try{
        //contentType é quem chega o body, especificando que deve ser json
        if(String(contentType).toLowerCase() == 'application/json'){
            if ( 
                avaliacao.descricao    == '' || avaliacao.descricao  == undefined || avaliacao.descricao  == null || avaliacao.descricao.length   > 45 ||
                avaliacao.nota         == '' || avaliacao.nota       == undefined || avaliacao.nota       == null || avaliacao.nota.length        > 15 ||
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
                avaliacao.nota         == '' || avaliacao.nota       == undefined || avaliacao.nota       == null || avaliacao.nota.length        > 10 ||
                avaliacao.id_filme     == '' || avaliacao.id_filme   == undefined || avaliacao.id_filme   == null || isNaN(avaliacao.id_filme)         || avaliacao.id_filme <= 0
               )
       
           {
               return message.ERROR_REQUIRED_FIELD //400
           }else{

               //validação para verificar se o id existe no banco
               let resultAvaliacao = await avaliacaoDAO.selecByIdIAvaliacao(parseInt(id))
               
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
            let resultAvaliacao = await avaliacaoDAO.selecByIdAvaliacao(parseInt(id))

            if(resultAvaliacao != false || typeof(resultAvaliacao) == 'object'){

                //se existir, aremos o delete
                if (resultAvaliacao.length > 0) {
    
                    //delete
                    let result = await avaliacaoDAO.deleteIdAvaliacao(parseInt(id))

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

            //objeto do tipo JSON
            let dadosIdAvaliacao = {}

            //chama a funçção para retornar os filmes cadastrados
            let resultAvaliacao = await avaliacaoDAO.selectAllAvaliacao()

            if(resultAvaliacao != false || typeof(resultAvaliacao) == 'object'){
                if(resultAvaliacao.length > 0){

                    //criando um JSON de retorno de dados para API
                    dadosIdAvaliacao.status = true
                    dadosIdAvaliacao.status_code = 200
                    dadosIdAvaliacao.items = resultAvaliacao.length
                    dadosIdAvaliacao.avaliacoes = resultAvaliacao

                    return dadosIdAvaliacao

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

            let resultAvaliacao= await avaliacaoDAO.selecByIdIAvaliacao(parseInt(id))

            if(resultAvaliacao!= false || typeof(resultAvaliacao) == 'object'){

                if(resultAvaliacao.length > 0){

                    dadosAvaliacao.status = true
                    dadosAvaliacao.status_code = 200
                    dadosAvaliacao.avaliacao = resultAvaliacao
    
                    return dadosAvaliacao
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
          
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        // console.log(error)
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