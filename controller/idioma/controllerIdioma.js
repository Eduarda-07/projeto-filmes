/*******************************************************************************************
 * objetivo: controller responsável pela regra de negócio referente ao CROUD de filme
 * data: 22/04/25
 * autor: Eduarda Silva
 * versão: 1.0
 *******************************************************************************************/

// import do arquivo de mensagens e status code o projeto
const message = require('../../modulo/config.js')

// import do arquivo para realizar o CROUD de dados no Banco de Dados
const idiomaDAO = require('../../model/DAO/idioma.js')


// função para tratar a inserção de um novo filme no DAO
const inserirIdioma = async function(idioma, contentType){

    try{
        //contentType é quem chega o body, especificando que deve ser json
        if(String(contentType).toLowerCase() == 'application/json'){
            if ( 
                idioma.pais         == '' || idioma.pais         == undefined || idioma.pais         == null || idioma.pais.length       > 45 ||
                idioma.nome         == '' || idioma.nome         == undefined || idioma.nome         == null || idioma.nome.length       > 15 ||
                idioma.codigo       == '' || idioma.codigo       == undefined || idioma.codigo       == null || idioma.codigo.length     > 10
               )
       
           {
               return message.ERROR_REQUIRED_FIELD //400
           }else{
               let resultIdioma = await idiomaDAO.insertIdioma(idioma)
       
               if(resultIdioma){
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
const atualizarIdioma = async function(id, idioma, contentType){
    try {
        //contentType é quem chega o body, especificando que deve ser json
        if(String(contentType).toLowerCase() == 'application/json'){
            if (
                id                  == '' || id                  == undefined || id                  == null || isNaN(id) || id <= 0          ||
                idioma.pais         == '' || idioma.pais         == undefined || idioma.pais         == null || idioma.pais.length       > 45 ||
                idioma.nome         == '' || idioma.nome         == undefined || idioma.nome         == null || idioma.nome.length       > 15 ||
                idioma.codigo       == '' || idioma.codigo       == undefined || idioma.codigo       == null || idioma.codigo.length     > 10
               )
       
           {
               return message.ERROR_REQUIRED_FIELD //400
           }else{

               //validação para verificar se o id existe no banco
               let resultIdioma = await idiomaDAO.selecByIdIdioma(parseInt(id))
               
               if(resultIdioma != false || typeof(resultIdioma) == 'object'){

                    if(resultIdioma.length > 0){

                        //update
                        //adiciona o id do filme no json com os dados
                        idioma.id = parseInt(id)

                        let result = await idiomaDAO.updateIdioma(idioma)

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
const excluirIdioma = async function(id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELD //400
        } else {

            //função para verificar se o id existe no banco de dados
            let resultIdioma = await idiomaDAO.selecByIdIdioma(parseInt(id))

            if(resultIdioma != false || typeof(resultIdioma) == 'object'){

                //se existir, aremos o delete
                if (resultIdioma.length > 0) {
    
                    //delete
                    let result = await idiomaDAO.deleteIdioma(parseInt(id))

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
const listarIdioma = async function(){
        try {

            //objeto do tipo JSON
            let dadosIdioma = {}

            //chama a funçção para retornar os filmes cadastrados
            let resultIdioma = await idiomaDAO.selectAllIdioma()

            if(resultIdioma != false || typeof(resultIdioma) == 'object'){
                if(resultIdioma.length > 0){

                    //criando um JSON de retorno de dados para API
                    dadosIdioma.status = true
                    dadosIdioma.status_code = 200
                    dadosIdioma.items = resultIdioma.length
                    dadosIdioma.idiomas = resultIdioma

                    return dadosIdioma

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
const buscarIdioma = async function(id){
    try {
        if ( id === ""   ||   id === undefined || id === null  || isNaN(id)  || id <= 0 ) {
            
            return message.ERROR_REQUIRED_FIELD //400

        } else {
            let dadosIdioma = {}

            let resultIdioma= await idiomaDAO.selecByIdIdioma(parseInt(id))

            if(resultIdioma != false || typeof(resultIdioma) == 'object'){

                if(resultIdioma.length > 0){

                    dadosIdioma.status = true
                    dadosIdioma.status_code = 200
                    dadosIdioma.idioma = resultIdioma
    
                    return dadosIdioma
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
    inserirIdioma,
    atualizarIdioma,
    excluirIdioma,
    listarIdioma,
    buscarIdioma
}