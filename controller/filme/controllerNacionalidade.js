/*************************************************************************************************
 * objetivo: controller responsável pela regra de negócio referente ao CROUD da tbl_nacionalidade
 * data: 10/04/25
 * autor: Eduarda Silva
 * versão: 1.0
 ************************************************************************************************/

// import do arquivo de mensagens e status code o projeto
const message = require('../../modulo/config.js')

// import do arquivo para realizar o CROUD de dados no Banco de Dados
const nacionalideDAO = require('../../model/DAO/nacionalidade.js')

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
               let resultNacionalidade= await nacionalideDAO.inserirNacionalidade(nacionalidade)
       
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
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}



module.exports = {
    inserirNacionalidade
}