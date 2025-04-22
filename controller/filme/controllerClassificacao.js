/*******************************************************************************************
 * objetivo: controller responsável pela regra de negócio referente ao CROUD de filme
 * data: 21/04/25
 * autor: Eduarda Silva
 * versão: 1.0
 *******************************************************************************************/

// import do arquivo de mensagens e status code o projeto
const message = require('../../modulo/config.js')

// import do arquivo para realizar o CROUD de dados no Banco de Dados
const filmeDAO = require('../../model/DAO/classificacao.js')


// função para tratar a inserção de uma nova classificacao no DAO
const inserirClassificacao = async function(classificacao, contentType){

    try{

        //contentType é quem chega o body, especificando que deve ser json
        if(String(contentType).toLowerCase() == 'application/json'){
            if ( 
                classificacao.descricao  ==  ''  ||  classificacao.descricao  ==  undefined  ||  classificacao.descricao  ==  null  ||  classificacao.descricao.length  > 45
               )
       
           {
               // response.status_code = 400
               // response.message = "Os atributos informados na requisição não estão de acordo. Ex: Campos obrigatórios, quantidade de caractéries..."
       
               return message.ERROR_REQUIRED_FIELD //400
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
const atualizarFilme = async function(id, filme, contentType){
    try {
        
        //contentType é quem chega o body, especificando que deve ser json
        if(String(contentType).toLowerCase() == 'application/json'){
            if (
                id                     == '' || id                     == undefined || id                     == null || isNaN(id) || id <= 0                || 
                filme.nome             == '' || filme.nome             == undefined || filme.nome             == null || filme.nome.length              > 80 ||
                filme.duracao          == '' || filme.duracao          == undefined || filme.duracao          == null || filme.duracao.length           > 5  ||
                filme.sinopse          == '' || filme.sinopse          == undefined || filme.sinopse          == null ||
                filme.data_lancamento  == '' || filme.data_lancamento  == undefined || filme.data_lancamento  == null || filme.data_lancamento.length   > 10 ||
                filme.foto_capa        == undefined || filme.foto_capa.length     > 200 ||
                filme.link_trailer     == undefined || filme.link_trailer.length  > 200 
               )
       
           {
               // response.status_code = 400
               // response.message = "Os atributos informados na requisição não estão de acordo. Ex: Campos obrigatórios, quantidade de caractéries..."
       
               return message.ERROR_REQUIRED_FIELD //400
           }else{

               //validação para verificar se o id existe no banco
               let resultFilme = await filmeDAO.selecByIdFilme(parseInt(id))
               
               if(resultFilme != false || typeof(resultFilme) == 'object'){

                    if(resultFilme.length > 0){

                        //update
                        //adiciona o id do filme no json com os dados
                        filme.id = parseInt(id)

                        let result = await filmeDAO.updateFilme(filme)

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
const excluirFilme = async function(id){
    try {


        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELD //400
        } else {

            //função para verificar se o id existe no banco de dados
            let resultFilme = await filmeDAO.selecByIdFilme(parseInt(id))

            if(resultFilme != false || typeof(resultFilme) == 'object'){

                //se existir, aremos o delete
                if (resultFilme.length > 0) {
    
                    //delete
                    let result = await filmeDAO.deleteFilme(parseInt(id))

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
const listarFilme = async function(){
        try {

            //objeto do tipo JSON
            let dadosFilme = {}

            //chama a funçção para retornar os filmes cadastrados
            let resultFilme = await filmeDAO.selectAllFilme()

            if(resultFilme != false || typeof(resultFilme) == 'object'){
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
const buscarFilme = async function(id){
    
    try {

        if ( id === ""   ||   id === undefined || id === null  || isNaN(id)  || id <= 0 ) {
            
            return message.ERROR_REQUIRED_FIELD //400

        } else {

    
            let dadosFilme = {}

            let resultFilme= await filmeDAO.selecByIdFilme(parseInt(id))

            if(resultFilme != false || typeof(resultFilme) == 'object'){

                if(resultFilme.length > 0){

                    dadosFilme.status = true
                    dadosFilme.status_code = 200
                    dadosFilme.films = resultFilme
    
                    return dadosFilme
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
    inserirFilme,
    atualizarFilme,
    excluirFilme,
    listarFilme,
    buscarFilme
}