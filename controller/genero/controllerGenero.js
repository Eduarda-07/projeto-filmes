/*******************************************************************************************
 * objetivo: controller responsável pela regra de negócio referente ao CROUD de filme
 * data: 21/04/25
 * autor: Eduarda Silva
 * versão: 1.0
 *******************************************************************************************/

// import do arquivo de mensagens e status code o projeto
const message = require('../../modulo/config.js')

// import do arquivo para realizar o CROUD de dados no Banco de Dados
const generoDAO = require('../../model/DAO/genero.js')


// função para tratar a inserção de um novo genero no DAO
const inserirGenero = async function(genero, contentType){

    try{

        //contentType é quem chega o body, especificando que deve ser json
        if(String(contentType).toLowerCase() == 'application/json'){
            if ( 
                genero.descricao   == '' ||   genero.descricao   == undefined || genero.descricao   == null || genero.descricao.length      >  45 
               )
       
           {
               return message.ERROR_REQUIRED_FIELD //400
           }else{
               let resultGenero= await generoDAO.insertGenero(genero)
       
               if(resultGenero){
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

// função para tratar a atualização de um genero no DAO
const atualizarGenero = async function(id, genero, contentType){
    try {
        
        //contentType é quem chega o body, especificando que deve ser json
        if(String(contentType).toLowerCase() == 'application/json'){
            if (
                id      == '' ||     id      == undefined || id     == null || isNaN(id)    || id <= 0  || 
                genero.descricao         == '' || genero.descricao        == undefined || genero.descricao       == null || genero.descricao.length   > 45
               )
       
           {
               return message.ERROR_REQUIRED_FIELD //400
           }else{

               //validação para verificar se o id existe no banco
               let resultGenero = await generoDAO.selecByIdGenero(parseInt(id))
               
               if(resultGenero != false || typeof(resultGenero) == 'object'){

                    if(resultGenero.length > 0){

                        //update
                        //adiciona o id do genero no json com os dados
                        genero.id = parseInt(id)

                        let result = await generoDAO.updateGenero(genero)

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

// função para tratar a exclusão de um genero no DAO
const excluirGenero = async function(id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELD //400
        } else {

            //função para verificar se o id existe no banco de dados
            let resultGenero = await generoDAO.selecByIdGenero(parseInt(id))

            if(resultGenero != false || typeof(resultGenero) == 'object'){

                //se existir, faremos o delete
                if (resultGenero.length > 0) {
    
                    //delete
                    let result = await generoDAO.deleteGenero(parseInt(id))

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

// função para tratar o retorno de uma lista de generos no DAO
const listarGenero = async function(){
        try {

            //objeto do tipo JSON
            let dadosGenero = {}

            //chama a funçção para retornar os filmes cadastrados
            let resultGenero = await generoDAO.selectAllGenero()

            if(resultGenero != false || typeof(resultGenero) == 'object'){
                if(resultGenero.length > 0){

                    //criando um JSON de retorno de dados para API
                    dadosGenero.status = true
                    dadosGenero.status_code = 200
                    dadosGenero.items = resultGenero.length
                    dadosGenero.generos = resultGenero

                    return dadosGenero

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

// função para tratar o retorno de um genero filtrando pelo ID do DAO
const buscarGenero = async function(id){
    
    try {

        if ( id === ""   ||   id === undefined || id === null  || isNaN(id)  || id <= 0 ) {
            
            return message.ERROR_REQUIRED_FIELD //400

        } else {

    
            let dadosGenero = {}

            let resultGenero= await generoDAO.selecByIdGenero(parseInt(id))

            if(resultGenero != false || typeof(resultGenero) == 'object'){

                if(resultGenero.length > 0){

                    dadosGenero.status = true
                    dadosGenero.status_code = 200
                    dadosGenero.genero = resultGenero
    
                    return dadosGenero
                }else{
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

module.exports = {
    inserirGenero,
    atualizarGenero,
    excluirGenero,
    listarGenero,
    buscarGenero
}