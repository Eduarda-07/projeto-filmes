/**********************************************************************************
 * Objetivo: criar a comunicação com o banco de dados, para fazer o CROUD de filmes
 * Data: 13/06/2025
 * Autor: Eduara
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const filmeGeneroDAO = require('../../model/DAO/filme_genero.js')

//Função para tratar a inserção de um novo genero no DAO
const inserirFilmeGenero = async function(filmeGenero, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
                if (
                    filmeGenero.id_filme       == ''   || filmeGenero.id_filme     == undefined    || filmeGenero.id_filme  == null || isNaN(filmeGenero.id_filme)  || filmeGenero.id_filme <=0 ||
                    filmeGenero.id_genero      == ''   || filmeGenero.id_genero    == undefined    || filmeGenero.id_genero == null || isNaN(filmeGenero.id_genero) || filmeGenero.id_genero<=0
                )
                {
                    return message.ERROR_REQUIRED_FIELD //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let resultFilmeGenero = await filmeGeneroDAO.insertFilmeGenero(filmeGenero)

                    if(resultFilmeGenero)
                        return message.SUCCESS_CREATED_ITEM //201
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a atualização de um genero no DAO
const atualizarFilmeGenero = async function(id, filmeGenero, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (id                                == ''           || id                       == undefined    || id                    == null || isNaN(id)  || id  <= 0   ||
                    filmeGenero.id_filme              == ''           || filmeGenero.id_filme     == undefined    || filmeGenero.id_filme  == null || isNaN(filmeGenero.id_filme)  || filmeGenero.id_filme <=0 ||
                    filmeGenero.id_genero             == ''           || filmeGenero.id_genero    == undefined    || filmeGenero.id_genero == null || isNaN(filmeGenero.id_genero) || filmeGenero.id_genero<=0
                )
                {
                    return message.ERROR_REQUIRED_FIELD //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultFilmeGenero = await filmeGeneroDAO.selectByIdFilmeGenero(parseInt(id))

                    if(resultFilmeGenero != false || typeof(resultFilmeGenero) == 'object'){
                        if(resultFilmeGenero.length > 0 ){
                            //Update
                            //Adiciona o ID do genero no JSON com os dados
                            filmeGenero.id = parseInt(id)

                            let result = await filmeGeneroDAO.updateGenero(filmeGenero)

                            if(result){
                                return message.SUCCESS_UPDATED_ITEM //200
                            }else{
                                return message.ERROR_INTERNAL_SERVER_MODEL //500
                            }
                        }else{
                            return message.ERROR_NOT_FOUND //404
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

//Função para tratar a exclusão de um genero no DAO
const excluirFilmeGenero = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELD //400
        }else{

            //Função que verifica se  ID existe no BD
            let resultFilmeGenero = await filmeGeneroDAO.selectByIdFilmeGenero(parseInt(id))

            if(resultFilmeGenero != false || typeof(resultFilmeGenero) == 'object'){
                //Se existir, faremos o delete
                if(resultFilmeGenero.length > 0){
                    //delete
                    let result = await filmeGeneroDAO.deleteFilmeGenero(parseInt(id))

                    if(result){
                        return message.SUCCESS_DELETED_ITEM //200
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
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

//Função para tratar o retorno de uma lista de generos do DAO
const listarFilmeGenero = async function(){
    try {
        //Objeto do tipo JSON
        let dadosFilmeGenero = {}
        //Chama a função para retornar os generos cadastrados
        let resultFilmeGenero = await filmeGeneroDAO.selectAllFilmeGenero()

        if(resultFilmeGenero != false || typeof(resultFilmeGenero) == 'object'){
            if(resultFilmeGenero.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosFilmeGenero.status = true
                dadosFilmeGenero.status_code = 200
                dadosFilmeGenero.items = resultFilmeGenero.length
                dadosFilmeGenero.filmeGenero = resultFilmeGenero

                return dadosFilmeGenero
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

//Função para tratar o retorno de um genero filtrando pelo ID do DAO
const buscarFilmeGenero = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELD //400
        }else{
            let dadosFimeGenero = {}

            let resultFilmeGenero = await filmeGeneroDAO.selectByIdFilmeGenero(parseInt(id))
            
            if(resultFilmeGenero != false || typeof(resultFilmeGenero) == 'object'){
                if(resultFilmeGenero.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosFimeGenero.status = true
                    dadosFimeGenero.status_code = 200
                    dadosFimeGenero.genero = resultFilmeGenero

                    return dadosFimeGenero //200
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

//Função para retornar os generos relacionados a um filme
const buscarGeneroPorFilme = async function(idFilme){
    try {
        if(idFilme == '' || idFilme == undefined || idFilme == null || isNaN(idFilme) || idFilme <=0){
            return message.ERROR_REQUIRED_FIELD //400
        }else{
            dadosFilmeGenero = {}

            let resultgenero = await filmeGeneroDAO.selectGeneroByIdFilme (parseInt(idFilme))
            
            if(resultgenero != false || typeof(resultgenero) == 'object'){
                if(resultgenero.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosgenero.status = true
                    dadosgenero.status_code = 200
                    dadosgenero.genero = resultgenero

                    return dadosgenero //200
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
    inserirFilmeGenero,
    atualizarFilmeGenero,
    excluirFilmeGenero,
    listarFilmeGenero,
    buscarFilmeGenero,
    buscarGeneroPorFilme
} 