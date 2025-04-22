/*************************************************************************************************
 * objetivo: controller responsável pela regra de negócio referente ao CROUD da tbl_nacionalidade
 * data: 10/04/25
 * autor: Eduarda Silva
 * versão: 1.0
 ************************************************************************************************/

// import do arquivo de mensagens e status code o projeto
const message = require('../../modulo/config.js')

// import do arquivo para realizar o CROUD de dados no Banco de Dados
const nacionalidadeDAO = require('../../model/DAO/nacionalidade.js')

// função para tratar a inserção de um novo registro no DAO
const inserirNacionalidade = async function(nacionalidade, contentType){

    try{

        //contentType é quem chega o body, especificando que deve ser json
        if(String(contentType).toLowerCase() == 'application/json'){
            if ( 
                nacionalidade.descricao  ==  ''  ||  nacionalidade.descricao  ==  undefined  ||  nacionalidade.descricao  ==  null  ||  nacionalidade.descricao.length  > 45
               )
           {
               return message.ERROR_REQUIRED_FIELD //400
           }else{
               let resultNacionalidade= await nacionalidadeDAO.insertNacionalidade(nacionalidade)
       
               if(resultNacionalidade){
                   return message.SUCCESS_CREATED_ITEM //201
               }else{
                   return message.ERROR_INTERNAL_SERVER_MODEL //500
               }
                   
           }   
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }

        
    }catch(error){
        // console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
       
    }
}

const atualizarNacionalidade = async function(id, nacionalidade, contentType){

    try {
        
        if(String(contentType).toLowerCase() == 'application/json'){
            if (
               id      == '' ||     id      == undefined || id     == null || isNaN(id)    || id <= 0  || 
                nacionalidade.descricao         == '' || nacionalidade.descricao        == undefined || nacionalidade.descricao       == null || nacionalidade.descricao.length            > 45 
               )
       
           {
               return message.ERROR_REQUIRED_FIELD //400
           }else{

               //validação para verificar se o id existe no banco
               let resultNacionalidade = await nacionalidadeDAO.selecByIdNacionalidade(parseInt(id))
               
               if(resultNacionalidade != false || typeof(resultNacionalidade) == 'object'){

                    if(resultNacionalidade.length > 0){

                        nacionalidade.id = parseInt(id)

                        let result = await nacionalidadeDAO.updateNacionalidade(nacionalidade)

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

const excluirNacionalidade = async function(id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELD //400
        } else {

            let resultNacionalidade = await nacionalidadeDAO.selecByIdNacionalidade(parseInt(id))

            if(resultNacionalidade != false || typeof(resultNacionalidade) == 'object'){

                if (resultNacionalidade.length > 0) {
    
                    let result = await nacionalidadeDAO.deleteNacionalidade(parseInt(id))

                    if (result) {
                        return message.SUCCESS_DELETED_ITEM //200
                    } else {
                        console.log(error);
                        
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

const listarNacionalidade = async function(){
        try {
            let dadosNacionalidade = {}

            let resultNacionalidade = await nacionalidadeDAO.selectAllNacionalidade()

            if(resultNacionalidade != false || typeof(resultNacionalidade) == 'object'){
                if(resultNacionalidade.length > 0){

                    dadosNacionalidade.status = true
                    dadosNacionalidade.status_code = 200
                    dadosNacionalidade.items = resultNacionalidade.length
                    dadosNacionalidade.nacionalidade = resultNacionalidade

                    return dadosNacionalidade

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

const buscarNacionalidade = async function(id){
    
    try {

        if ( id === ""   ||   id === undefined || id === null  || isNaN(id)  || id <= 0 ) {
            
            return message.ERROR_REQUIRED_FIELD //400

        } else {

    
            let dadosNacionalidade = {}

            let resultNacionalidade= await nacionalidadeDAO.selecByIdNacionalidade(parseInt(id))

            if(resultNacionalidade != false || typeof(resultNacionalidade) == 'object'){

                if(resultNacionalidade.length > 0){

                    dadosNacionalidade.status = true
                    dadosNacionalidade.status_code = 200
                    dadosNacionalidade.nacionalidade = resultNacionalidade
    
                    return dadosNacionalidade
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
    inserirNacionalidade,
    atualizarNacionalidade,
    excluirNacionalidade,
    listarNacionalidade,
    buscarNacionalidade
}