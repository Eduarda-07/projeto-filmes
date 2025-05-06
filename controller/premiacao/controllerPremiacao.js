/*******************************************************************************************
 * objetivo: controller responsável pela regra de negócio referente ao CROUD de filme
 * data: 21/04/25
 * autor: Eduarda Silva
 * versão: 1.0
 *******************************************************************************************/

// import do arquivo de mensagens e status code o projeto
const message = require('../../modulo/config.js')

// import do arquivo para realizar o CROUD de dados no Banco de Dados
const premiacaoDAO = require('../../model/DAO/premiacao.js')


// função para tratar a inserção de uma nova classificacao no DAO
const inserirPremiacao = async function(premiacao, contentType){

    try{

        //contentType é quem chega o body, especificando que deve ser json
        if(String(contentType).toLowerCase() == 'application/json'){
            if ( 
                premiacao.nome  ==  ''  ||  premiacao.nome  ==  undefined  ||  premiacao.nome  ==  null  ||  premiacao.nome.length  > 100 ||
                premiacao.ano_indicacao   ==  ''  ||  premiacao.ano_indicacao   ==  undefined  ||  premiacao.ano_indicacao   ==  null  ||  premiacao.ano_indicacao.length  > 4
               )
           {
            console.log(premiacao)
               return message.ERROR_REQUIRED_FIELD //400
           }else{
               let resultPremiacao= await premiacaoDAO.insertPremiacao(premiacao)
       
               if(resultPremiacao){
                   return message.SUCCESS_CREATED_ITEM //201
               }else{
                   return message.ERROR_INTERNAL_SERVER_MODEL //500
               }       
           }   
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
        
    }catch(error){
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// função para tratar a atualização de uma classificacao no DAO
const atualizarPremiacao = async function(id, premiacao, contentType){
    try {
        //contentType é quem chega o body, especificando que deve ser json
        if(String(contentType).toLowerCase() == 'application/json'){
            if (
                id      == '' ||     id      == undefined || id     == null || isNaN(id)    || id <= 0  || 
                premiacao.nome  ==  ''  ||  premiacao.nome  ==  undefined  ||  premiacao.nome  ==  null  ||  premiacao.nome.length  > 100 ||
                premiacao.ano_indicacao   ==  ''  ||  premiacao.ano_indicacao   ==  undefined  ||  premiacao.ano_indicacao  ==  null   ||  premiacao.ano_indicacao.length  > 4
               )
       
           {
               return message.ERROR_REQUIRED_FIELD //400
           }else{

               //validação para verificar se o id existe no banco
               let resultPremiacao = await premiacaoDAO.selecByIdPremiacao(parseInt(id))
               
               if(resultPremiacao != false || typeof(resultPremiacao) == 'object'){

                    if(resultPremiacao.length > 0){

                        //update
                        //adiciona o id da classificacao no json com os dados
                        premiacao.id = parseInt(id)

                        let result = await premiacaoDAO.updatePremiacao(premiacao)

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

// função para tratar a exclusão de uma classificacao no DAO
const excluirPremiacao = async function(id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELD //400
        } else {

            //função para verificar se o id existe no banco de dados
            let resultPremiacao = await premiacaoDAO.selecByIdPremiacao(parseInt(id))

            if(resultPremiacao != false || typeof(resultPremiacao) == 'object'){

                //se existir, faremos o delete
                if (resultPremiacao.length > 0) {
    
                    //delete
                    let result = await premiacaoDAO.deletePremiacao(parseInt(id))

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
const listarPremiacao = async function(){
        try {

            //objeto do tipo JSON
            let dadosPremiacao = {}

            //chama a função para retornar as classificações cadastradas
            let resultPremiacao = await premiacaoDAO.selectAllPremiacao()

            if(resultPremiacao != false || typeof(resultPremiacao) == 'object'){
                if(resultPremiacao.length > 0){

                    //criando um JSON de retorno de dados para API
                    dadosPremiacao.status = true
                    dadosPremiacao.status_code = 200
                    dadosPremiacao.items = resultPremiacao.length
                    dadosPremiacao.premiacoes = resultPremiacao

                    return dadosPremiacao

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
const buscarPremiacao = async function(id){
    
    try {
        if ( id === ""   ||   id === undefined || id === null  || isNaN(id)  || id <= 0 ) {
            
            return message.ERROR_REQUIRED_FIELD //400

        } else {
            let dadosPremiacao = {}

            let resultPremiacao= await premiacaoDAO.selecByIdPremiacao(parseInt(id))

            if(resultPremiacao != false || typeof(resultPremiacao) == 'object'){

                if(resultPremiacao.length > 0){

                    dadosPremiacao.status = true
                    dadosPremiacao.status_code = 200
                    dadosPremiacao.premiacao = resultPremiacao
    
                    return dadosPremiacao
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
    inserirPremiacao,
    atualizarPremiacao,
    excluirPremiacao,
    listarPremiacao,
    buscarPremiacao
}