/*******************************************************************************************
 * objetivo: controller responsável pela regra de negócio referente ao CROUD de filme
 * data: 21/04/25
 * autor: Eduarda Silva
 * versão: 1.0
 *******************************************************************************************/

// import do arquivo de mensagens e status code o projeto
const message = require('../../modulo/config.js')

// import do arquivo para realizar o CROUD de dados no Banco de Dados
const classificacaoDAO = require('../../model/DAO/classificacao.js')


// função para tratar a inserção de uma nova classificacao no DAO
const inserirClassificacao = async function(classificacao, contentType){

    try{

        //contentType é quem chega o body, especificando que deve ser json
        if(String(contentType).toLowerCase() == 'application/json'){
            if ( 
                classificacao.descricao  ==  ''  ||  classificacao.descricao  ==  undefined  ||  classificacao.descricao  ==  null  ||  classificacao.descricao.length  > 45
               )
           {
               return message.ERROR_REQUIRED_FIELD //400
           }else{
               let resultClassificacao= await classificacaoDAO.insertClassificacao(classificacao)
       
               if(resultClassificacao){
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

// função para tratar a atualização de uma classificacao no DAO
const atualizarClassificacao = async function(id, classificacao, contentType){
    try {
        //contentType é quem chega o body, especificando que deve ser json
        if(String(contentType).toLowerCase() == 'application/json'){
            if (
                id      == '' ||     id      == undefined || id     == null || isNaN(id)    || id <= 0  || 
                classificacao.descricao       == '' || classificacao.descricao     == undefined ||  classificacao.descricao     == null || classificacao.descricao.length      > 45 
               )
       
           {
               return message.ERROR_REQUIRED_FIELD //400
           }else{

               //validação para verificar se o id existe no banco
               let resultClassificacao = await classificacaoDAO.selecByIdClassificacao(parseInt(id))
               
               if(resultClassificacao != false || typeof(resultClassificacao) == 'object'){

                    if(resultClassificacao.length > 0){

                        //update
                        //adiciona o id da classificacao no json com os dados
                        classificacao.id = parseInt(id)

                        let result = await classificacaoDAO.updateClassificacao(classificacao)

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

// função para tratar a exclusão de uma classificacao no DAO
const excluirClassificacao = async function(id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELD //400
        } else {

            //função para verificar se o id existe no banco de dados
            let resultClassificacao = await classificacaoDAO.selecByIdClassificacao(parseInt(id))

            if(resultClassificacao != false || typeof(resultClassificacao) == 'object'){

                //se existir, faremos o delete
                if (resultClassificacao.length > 0) {
    
                    //delete
                    let result = await classificacaoDAO.deleteClassificacao(parseInt(id))

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

// função para tratar o retorno de uma lista de classificações no DAO
const listarClassificacao = async function(){
        try {

            //objeto do tipo JSON
            let dadosClassificacao = {}

            //chama a função para retornar as classificações cadastradas
            let resultClassificacao = await classificacaoDAO.selectAllClassificacao()

            if(resultClassificacao != false || typeof(resultClassificacao) == 'object'){
                if(resultClassificacao.length > 0){

                    //criando um JSON de retorno de dados para API
                    dadosClassificacao.status = true
                    dadosClassificacao.status_code = 200
                    dadosClassificacao.items = resultClassificacao.length
                    dadosClassificacao.classificacoes = resultClassificacao

                    return dadosClassificacao

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

// função para tratar o retorno de uma classificacao filtrando pelo ID do DAO
const buscarClassificacao = async function(id){
    
    try {
        if ( id === ""   ||   id === undefined || id === null  || isNaN(id)  || id <= 0 ) {
            
            return message.ERROR_REQUIRED_FIELD //400

        } else {
            let dadosClassificacao = {}

            let resultClassificacao= await classificacaoDAO.selecByIdClassificacao(parseInt(id))

            if(resultClassificacao != false || typeof(resultClassificacao) == 'object'){

                if(resultClassificacao.length > 0){

                    dadosClassificacao.status = true
                    dadosClassificacao.status_code = 200
                    dadosClassificacao.classificacao = resultClassificacao
    
                    return dadosClassificacao
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
    inserirClassificacao,
    atualizarClassificacao,
    excluirClassificacao,
    listarClassificacao,
    buscarClassificacao
}