/*******************************************************************************************
 * objetivo: controller responsável pela regra de negócio referente ao CROUD de filme
 * data: 21/04/25
 * autor: Eduarda Silva
 * versão: 1.0
 *******************************************************************************************/

// import do arquivo de mensagens e status code o projeto
const message = require('../../modulo/config.js')

// import do arquivo para realizar o CROUD de dados no Banco de Dados
const sexoDAO = require('../../model/DAO/sexo.js')


// função para tratar a inserção de um novo sexo no DAO
const inserirSexo = async function(sexo, contentType){

    try{

        //contentType é quem chega o body, especificando que deve ser json
        if(String(contentType).toLowerCase() == 'application/json'){
            if ( 
                sexo.descricao   == '' ||   sexo.descricao   == undefined || sexo.descricao   == null || sexo.descricao.length      >  45 ||
                sexo.abreviacao  == '' ||   sexo.abreviacao  == undefined || sexo.abreviacao  == null || sexo.abreviacao.length     >  1 
               )
       
           {
               return message.ERROR_REQUIRED_FIELD //400
           }else{
               let resultSexo= await sexoDAO.insertSexo(sexo)
       
               if(resultSexo){
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

// função para tratar a atualização de um sexo no DAO
const atualizarSexo = async function(id, sexo, contentType){
    try {
        
        //contentType é quem chega o body, especificando que deve ser json
        if(String(contentType).toLowerCase() == 'application/json'){
            if (
                id      == '' ||     id      == undefined || id     == null || isNaN(id)    || id <= 0  || 
                sexo.descricao         == '' || sexo.descricao        == undefined || sexo.descricao       == null || sexo.descricao.length   > 45  ||
                sexo.abreviacao        == '' || sexo.abreviacao       == undefined || sexo.abreviacao      == null || sexo.abreviacao.length  > 1
               )
       
           {
               return message.ERROR_REQUIRED_FIELD //400
           }else{

               //validação para verificar se o id existe no banco
               let resultSexo = await sexoDAO.selecByIdSexo(parseInt(id))
               
               if(resultSexo != false || typeof(resultSexo) == 'object'){

                    if(resultSexo.length > 0){

                        //update
                        //adiciona o id do sexo no json com os dados
                        sexo.id = parseInt(id)

                        let result = await sexoDAO.updateSexo(sexo)

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

// função para tratar a exclusão de um sexo no DAO
const excluirSexo = async function(id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELD //400
        } else {

            //função para verificar se o id existe no banco de dados
            let resultSexo = await sexoDAO.selecByIdSexo(parseInt(id))

            if(resultSexo != false || typeof(resultSexo) == 'object'){

                //se existir, faremos o delete
                if (resultSexo.length > 0) {
    
                    //delete
                    let result = await sexoDAO.deleteSexo(parseInt(id))

                    if (result) {
                        return message.SUCCESS_DELETED_ITEM //200
                    } else {
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
    
                } else {
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                console.log(error);
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// função para tratar o retorno de uma lista de sexos no DAO
const listarSexo = async function(){
        try {

            //objeto do tipo JSON
            let dadosSexo = {}

            //chama a função para retornar os sexos cadastrados
            let resultSexo = await sexoDAO.selectAllSexo()

            if(resultSexo != false || typeof(resultSexo) == 'object'){
                if(resultSexo.length > 0){

                    //criando um JSON de retorno de dados para API
                    dadosSexo.status = true
                    dadosSexo.status_code = 200
                    dadosSexo.items = resultSexo.length
                    dadosSexo.sexos = resultSexo

                    return dadosSexo

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

// função para tratar o retorno de um sexo filtrando pelo ID do DAO
const buscarSexo = async function(id){
    
    try {

        if ( id === ""   ||   id === undefined || id === null  || isNaN(id)  || id <= 0 ) {
            
            return message.ERROR_REQUIRED_FIELD //400

        } else {

    
            let dadosSexo = {}

            let resultSexo= await sexoDAO.selecByIdSexo(parseInt(id))

            if(resultSexo != false || typeof(resultSexo) == 'object'){

                if(resultSexo.length > 0){

                    dadosSexo.status = true
                    dadosSexo.status_code = 200
                    dadosSexo.sexo = resultSexo
    
                    return dadosSexo
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
    inserirSexo,
    atualizarSexo,
    excluirSexo,
    listarSexo,
    buscarSexo
}

