/*******************************************************************************************
 * objetivo: controller responsável pela regra de negócio referente ao CROUD de filme
 * data: 11/02/25
 * autor: Eduarda Silva
 * versão: 1.0
 *******************************************************************************************/

// import do arquivo de mensagens e status code o projeto
const message = require('../../modulo/config.js')

// import do arquivo para realizar o CROUD de dados no Banco de Dados
const filmeDAO = require('../../model/DAO/filme.js')
const filmeGeneroDAO = require('../../model/DAO/filme_genero.js');


const controllerClassificacao   = require('../classificacao/controllerClassificacao.js')
const controllerIdioma   = require('../idioma/controllerIdioma.js')
const controllerNacionalidade   = require('../nacionalidade/controllerNacionalidade.js')
const controllerFilmeGenero  = require('./controllerFilmeGenero.js')

// função para tratar a inserção de um novo filme no DAO
const inserirFilme = async function(filme, contentType){

    try{

        //contentType é quem chega o body, especificando que deve ser json
        if(String(contentType).toLowerCase() == 'application/json'){
            if ( 
                filme.nome            == '' || filme.nome             == undefined || filme.nome             == null || filme.nome.length              > 80 ||
                filme.duracao          == '' || filme.duracao          == undefined || filme.duracao          == null || filme.duracao.length           > 5 ||
                filme.sinopse          == '' || filme.sinopse          == undefined || filme.sinopse          == null ||
                filme.data_lancamento  == '' || filme.data_lancamento  == undefined || filme.data_lancamento  == null || filme.data_lancamento.length  > 10 ||
                filme.foto_capa        == undefined || filme.foto_capa.length     > 200 ||
                filme.link_trailer     == undefined || filme.link_trailer.length  > 200 ||
                filme.id_classificacao == '' || filme.id_classificacao == undefined || filme.id_classificacao == null || isNaN(filme.id_classificacao)       || filme.id_classificacao <= 0    || 
                filme.id_idioma        == '' || filme.id_idioma        == undefined || filme.id_idioma        == null || isNaN(filme.id_idioma)              || filme.id_idioma        <= 0    || 
                filme.id_nacionalidade == '' || filme.id_nacionalidade == undefined || filme.id_nacionalidade == null || isNaN(filme.id_nacionalidade)       || filme.id_nacionalidade <= 0    
               )
       
           {
               // response.status_code = 400
               // response.message = "Os atributos informados na requisição não estão de acordo. Ex: Campos obrigatórios, quantidade de caractéries..."
       
               return message.ERROR_REQUIRED_FIELD //400
           }else{
               let resultfilme= await filmeDAO.insertFilme(filme)
       
                // associando generos
                // verificando se o filme foi inserido no banco
               if (resultfilme) {
               
                //verificando se tem algum campo chamado "genero" para ser add e se esse campo retorna um array
                if (filme.genero && Array.isArray(filme.genero)) {
                    // Obtém o ID do filme inserido
                    let filmeInserido = await filmeDAO.selectLastInsertId()
                    //acessa a propriedade id dentro do objeto retornado
                    let idFilme = filmeInserido[0].id
                    
                    // Para cada gênero no array do body, cria uma variavel genero na lista de filme 
                    for (let genero of filme.genero) {
                        // verifica se o campo "genero" possui um atributo id e se é int
                        if (genero.id && !isNaN(genero.id)) {
                            // adicionando os ids na tbl_filme_genero
                            let filmeGenero = {
                                id_filme: idFilme,
                                id_genero: genero.id
                            }
                            await filmeGeneroDAO.insertFilmeGenero(filmeGenero);
                        }
                    }
                }
                   return message.SUCCESS_CREATED_ITEM //201
               }else{
                   return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
            }   
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }

        
    }catch(error){
        console.log(error);
        
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
                filme.link_trailer     == undefined || filme.link_trailer.length  > 200 ||
                filme.id_classificacao == '' || filme.id_classificacao == undefined || filme.id_classificacao == null || isNaN(filme.id_classificacao)       || filme.id_classificacao <= 0    || 
                filme.id_idioma        == '' || filme.id_idioma        == undefined || filme.id_idioma        == null || isNaN(filme.id_idioma)              || filme.id_idioma        <= 0    || 
                filme.id_nacionalidade == '' || filme.id_nacionalidade == undefined || filme.id_nacionalidade == null || isNaN(filme.id_nacionalidade)       || filme.id_nacionalidade <= 0    
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
        console.log(error);
        
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// função para tratar o retorno de uma lista de filmes no DAO
const listarFilme = async function(){
        try {

            let arrayFilmes = []
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

                    //Precisamos utilizar o for of, pois o foreach não consegue trabalhar com requisições async com await
                    for(const itemFilme of resultFilme){
                        /* Monta o objeto da classificação para retornar no Filme */
                            //Busca os dados da classificação na controller de classificacao
                            let dadosClassificacao = await controllerClassificacao.buscarClassificacao(itemFilme.id_classificacao)
                            //Adiciona um atributo classificação no JSON de filmes e coloca os dados da classificação
                            itemFilme.classificacao = dadosClassificacao.classificacao
                            //Remover o id do JSON
                            delete itemFilme.id_classificacao
                        

                            let dadosIdioma = await controllerIdioma.buscarIdioma(itemFilme.id_idioma)
                            itemFilme.idioma = dadosIdioma.idioma
                            delete itemFilme.id_idioma

                            let dadosNacionalidade = await controllerNacionalidade.buscarNacionalidade(itemFilme.id_nacionalidade)
                            itemFilme.nacionalidade = dadosNacionalidade.nacionalidade
                            delete itemFilme.id_nacionalidade

                            // fazendo interação com a tbl_filme_genero
                            let dadosGenero = await controllerFilmeGenero.buscarGeneroPorFilme(itemFilme.id)

                            // verificando se retorna array e se não é false
                            if (dadosGenero && Array.isArray(dadosGenero.genero)) {
                            itemFilme.genero = dadosGenero.genero
                            } else {
                            //console.log(itemFilme.generos);
                            
                            //se for false retorna um array vazio 
                            itemFilme.genero = []


                            }

                        arrayFilmes.push(itemFilme)
     
                    }
                    dadosFilme.films = arrayFilmes

                    return dadosFilme

                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } catch (error) {
            console.log(error);
            
            return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
        }
}

// função para tratar o retorno de um filme filtrando pelo ID do DAO
const buscarFilme = async function(id){
    
    try {

        if ( id === ""   ||   id === undefined || id === null  || isNaN(id)  || id <= 0 ) {
            
            return message.ERROR_REQUIRED_FIELD //400

        } else {

            let arrayFilmes= []
            let dadosFilme = {}

            let resultFilme= await filmeDAO.selecByIdFilme(parseInt(id))

            if(resultFilme != false || typeof(resultFilme) == 'object'){

                if(resultFilme.length > 0){

                    dadosFilme.status = true
                    dadosFilme.status_code = 200
                    for(const itemFilme of resultFilme){
                        /* Monta o objeto da classificação para retornar no Filme */
                            //Busca os dados da classificação na controller de classificacao
                            let dadosClassificacao = await controllerClassificacao.buscarClassificacao(itemFilme.id_classificacao)
                            //Adiciona um atributo classificação no JSON de filmes e coloca os dados da classificação
                            itemFilme.classificacao = dadosClassificacao.classificacao
                            //Remover o id do JSON
                            delete itemFilme.id_classificacao
                        

                            let dadosIdioma = await controllerIdioma.buscarIdioma(itemFilme.id_idioma)
                            itemFilme.idioma = dadosIdioma.idioma
                            delete itemFilme.id_idioma

                            let dadosNacionalidade = await controllerNacionalidade.buscarNacionalidade(itemFilme.id_nacionalidade)
                            itemFilme.nacionalidade = dadosNacionalidade.nacionalidade
                            delete itemFilme.id_nacionalidade

                                // fazendo interação com a tbl_filme_genero
                            let dadosGenero = await controllerFilmeGenero.buscarGeneroPorFilme(itemFilme.id)
                            // verificando se retorna array e se não é false
                            if (dadosGenero && Array.isArray(dadosGenero.genero)) {
                            itemFilme.genero = dadosGenero.genero
                            } else {
                            //se for false retorna um array vazio 
                            itemFilme.genero = []
                            }


                        //Adiciona em um novo array o JSON de filmes com a sua nova estrutura de dados
                        arrayFilmes.push(itemFilme)
     
                    }
                    dadosFilme.films = arrayFilmes
    
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