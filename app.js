/***********************************************************************************************
 * objetivo: criar uma API para realizar o CROUD do sistema de controle de filme
 * data: 11/02/25
 * autor: Eduarda Silva
 * versão: 1.0
 * observação: 
 * 1) para criar a API precisamos instalar -> expres, cors e body-parser
 *      express: npm install express --save
 *      cors: nmp install cors --save
 *      body-parser: nmp install body-parser --save
 * 2) para criar interação com o banco de dados precisamos instalar -> prisma e prisma/client
 *       prisma -> npm install prisma --save (gerencia conexão com o banco)
 *       prisma/client -> npm install @prisma/client --save (para rodar scripts SQL)
 * 
 * Após a instalação do prisma e do prisma client, devemos:
 * 1) npx prisma init
 * 
 * Você deverá configurar o arquivo .env e schema.prisma com as credenciais do BD
 * 
 * Após essa configuração deverá rodar o seguinte comando:
 *  1) npx prisma migrate dev (tomar cuidado: acontece um reset no banco)
 ***********************************************************************************************/


// import das bibliotecas para criar api
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//manipular o body da requisição para chegar apenas JSON
const bodyParserJSON = bodyParser.json()

// cria o objeto app com referências do express para criar api
const app = express()

// configurações de acesso do CORS para API
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Cntrol-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())

    next()
})


const controllerFilme = require('./controller/filme/controllerFilme')
const controllerNacionalidade = require('./controller/nacionalidade/controllerNacionalidade')
const controllerGenero = require('./controller/genero/controllerGenero')
const controllerClassificacao = require('./controller/classificacao/controllerClassificacao')
const controllerIdioma = require('./controller/idioma/controllerIdioma')
const controllerPremiacao = require('./controller/premiacao/controllerPremiacao')
const controllerSexo = require('./controller/sexo/controllerSexo')

app.post('/v1/controle-filmes/filme', cors(), bodyParserJSON, async function (request, response){

    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultFilme = await controllerFilme.inserirFilme(dadosBody, contentType)

    response.status(resultFilme.status_code)
    response.json(resultFilme)
})

app.get('/v1/controle-filmes/filme', cors(), async function(request, response) {
    
    //chama a função para retornar os filmes
    let resultFilme = await controllerFilme.listarFilme()

    response.status(resultFilme.status_code)
    response.json(resultFilme)

})

app.get('/v1/controle-filmes/filme/:id', cors(), async function(request, response) {
    
    let idFilme = request.params.id

    let resultFilme = await controllerFilme.buscarFilme(idFilme)

    response.status(resultFilme.status_code)
    response.json(resultFilme)

})

app.delete('/v1/controle-filmes/filme/:id', cors(), async function (request, response) {
    
    let idFilme =  request.params.id

    let resultFilme = await controllerFilme.excluirFilme(idFilme)

    response.status(resultFilme.status_code)
    response.json(resultFilme)

    // no teste deste endpoint o filme 3 foi deletado!!!!

})

app.put('/v1/controle-filmes/filme/:id', cors(), bodyParserJSON, async function (request, response) {
    
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da requisição
    let idFilme =  request.params.id

    //recebe os dados da requisição pelo body
    let dadosBody = request.body

    let resultFilme = await controllerFilme.atualizarFilme(idFilme, dadosBody, contentType)

    response.status(resultFilme.status_code)
    response.json(resultFilme)

})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/v1/controle-filmes/nacionalidade', cors(), bodyParserJSON, async function (request, response){

    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultNacionalidade = await controllerNacionalidade.inserirNacionalidade(dadosBody, contentType)

    response.status(resultNacionalidade.status_code)
    response.json(resultNacionalidade)
})

app.put('/v1/controle-filmes/nacionalidade/:id', cors(), bodyParserJSON, async function (request, response) {
    
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da requisição
    let idNacionalidade =  request.params.id

    //recebe os dados da requisição pelo body
    let dadosBody = request.body


    let resultNacionalidade = await controllerNacionalidade.atualizarNacionalidade(idNacionalidade, dadosBody, contentType)

    response.status(resultNacionalidade.status_code)
    response.json(resultNacionalidade)

})

app.get('/v1/controle-filmes/nacionalidade', cors(), async function(request, response) {
    
    let resultNacionalidade = await controllerNacionalidade.listarNacionalidade()

    response.status(resultNacionalidade.status_code)
    response.json(resultNacionalidade)

})

app.get('/v1/controle-filmes/nacionalidade/:id', cors(), async function(request, response) {
    
    let idNacionalidade = request.params.id

    let resultNacionalidade = await controllerNacionalidade.buscarNacionalidade(idNacionalidade)

    response.status(resultNacionalidade.status_code)
    response.json(resultNacionalidade)

})

app.delete('/v1/controle-filmes/nacionalidade/:id', cors(), async function (request, response) {
    
    let idNacionalidade =  request.params.id

    let resultNacionalidade = await controllerNacionalidade.excluirNacionalidade(idNacionalidade)

    response.status(resultNacionalidade.status_code)
    response.json(resultNacionalidade)


})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/v1/controle-filmes/genero', cors(), bodyParserJSON, async function (request, response){

    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultGenero = await controllerGenero.inserirGenero(dadosBody, contentType)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.get('/v1/controle-filmes/genero', cors(), async function(request, response) {
    
    //chama a função para retornar os filmes
    let resultGenero = await controllerGenero.listarGenero()

    response.status(resultGenero.status_code)
    response.json(resultGenero)

})

app.get('/v1/controle-filmes/genero/:id', cors(), async function(request, response) {
    
    let idGenero = request.params.id

    let resultGenero = await controllerGenero.buscarGenero(idGenero)

    response.status(resultGenero.status_code)
    response.json(resultGenero)

})

app.delete('/v1/controle-filmes/genero/:id', cors(), async function (request, response) {
    
    let idGenero =  request.params.id

    let resultGenero = await controllerGenero.excluirGenero(idGenero)

    response.status(resultGenero.status_code)
    response.json(resultGenero)

   // registro 7 deletado no teste
})

app.put('/v1/controle-filmes/genero/:id', cors(), bodyParserJSON, async function (request, response) {
    
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da requisição
    let idGenero =  request.params.id

    //recebe os dados da requisição pelo body
    let dadosBody = request.body

    let resultGenero = await controllerGenero.atualizarGenero(idGenero, dadosBody, contentType)

    response.status(resultGenero.status_code)
    response.json(resultGenero)

})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/v1/controle-filmes/premiacao', cors(), bodyParserJSON, async function (request, response){

    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultPremiacao = await controllerPremiacao.inserirPremiacao(dadosBody, contentType)

    response.status(resultPremiacao.status_code)
    response.json(resultPremiacao)
})

app.get('/v1/controle-filmes/premiacao', cors(), async function(request, response) {
    
    //chama a função para retornar as categorias
    let resultPremiacao = await controllerPremiacao.listarPremiacao()

    response.status(resultPremiacao.status_code)
    response.json(resultPremiacao)
})

app.get('/v1/controle-filmes/premiacao/:id', cors(), async function(request, response) {
    
    let idPremiacao = request.params.id

    let resultPremiacao = await controllerPremiacao.buscarPremiacao(idPremiacao)

    response.status(resultPremiacao.status_code)
    response.json(resultPremiacao)
})

app.delete('/v1/controle-filmes/premiacao/:id', cors(), async function (request, response) {
    
    let idPremiacao =  request.params.id

    let resultPremiacao = await controllerPremiacao.excluirPremiacao(idPremiacao)

    response.status(resultPremiacao.status_code)
    response.json(resultPremiacao)
})

app.put('/v1/controle-filmes/premiacao/:id', cors(), bodyParserJSON, async function (request, response) {
    
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da requisição
    let idPremiacao =  request.params.id

    //recebe os dados da requisição pelo body
    let dadosBody = request.body

    let resultPremiacao = await controllerPremiacao.atualizarPremiacao(idPremiacao, dadosBody, contentType)

    response.status(resultPremiacao.status_code)
    response.json(resultPremiacao)
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/v1/controle-filmes/classificacao', cors(), bodyParserJSON, async function (request, response){

    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultClassificacao = await controllerClassificacao.inserirClassificacao(dadosBody, contentType)

    response.status(resultClassificacao.status_code)
    response.json(resultClassificacao)
})

app.get('/v1/controle-filmes/classificacao', cors(), async function(request, response) {
    
    //chama a função para retornar as classificações
    let resultClassificacao = await controllerClassificacao.listarClassificacao()

    response.status(resultClassificacao.status_code)
    response.json(resultClassificacao)
})

app.get('/v1/controle-filmes/classificacao/:id', cors(), async function(request, response) {
    
    let idClassificacao = request.params.id

    let resultClassificacao = await controllerClassificacao.buscarClassificacao(idClassificacao)

    response.status(resultClassificacao.status_code)
    response.json(resultClassificacao)
})

app.delete('/v1/controle-filmes/classificacao/:id', cors(), async function (request, response) {
    
    let idClassificacao =  request.params.id

    let resultClassificacao = await controllerClassificacao.excluirClassificacao(idClassificacao)

    response.status(resultClassificacao.status_code)
    response.json(resultClassificacao)
})

app.put('/v1/controle-filmes/classificacao/:id', cors(), bodyParserJSON, async function (request, response) {
    
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da requisição
    let idClassificacao =  request.params.id

    //recebe os dados da requisição pelo body
    let dadosBody = request.body

    let resultClassificacao = await controllerClassificacao.atualizarClassificacao(idClassificacao, dadosBody, contentType)

    response.status(resultClassificacao.status_code)
    response.json(resultClassificacao)
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/v1/controle-filmes/idioma', cors(), bodyParserJSON, async function (request, response){

    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultIdioma = await controllerIdioma.inserirIdioma(dadosBody, contentType)

    response.status(resultIdioma.status_code)
    response.json(resultIdioma)
})

app.get('/v1/controle-filmes/idioma', cors(), async function(request, response) {
    
    //chama a função para retornar as classificações
    let resultIdioma = await controllerIdioma.listarIdioma()

    response.status(resultIdioma.status_code)
    response.json(resultIdioma)
})

app.get('/v1/controle-filmes/idioma/:id', cors(), async function(request, response) {
    
    let idIdioma = request.params.id

    let resultIdioma = await controllerIdioma.buscarIdioma(idIdioma)

    response.status(resultIdioma.status_code)
    response.json(resultIdioma)
})

app.delete('/v1/controle-filmes/idioma/:id', cors(), async function (request, response) {
    
    let idIdioma =  request.params.id

    let resultIdioma = await controllerIdioma.excluirIdioma(idIdioma)

    response.status(resultIdioma.status_code)
    response.json(resultIdioma)
})

app.put('/v1/controle-filmes/idioma/:id', cors(), bodyParserJSON, async function (request, response) {
    
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da requisição
    let idIdioma =  request.params.id

    //recebe os dados da requisição pelo body
    let dadosBody = request.body

    let resultIdioma = await controllerIdioma.atualizarIdioma(idIdioma, dadosBody, contentType)

    response.status(resultIdioma.status_code)
    response.json(resultIdioma)
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/v1/controle-filmes/sexo', cors(), bodyParserJSON, async function (request, response){

    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultSexo = await controllerSexo.inserirSexo(dadosBody, contentType)

    response.status(resultSexo.status_code)
    response.json(resultSexo)
})

app.put('/v1/controle-filmes/sexo/:id', cors(), bodyParserJSON, async function (request, response) {
    
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da requisição
    let idSexo=  request.params.id

    //recebe os dados da requisição pelo body
    let dadosBody = request.body


    let resultSexo = await controllerSexo.atualizarSexo(idSexo, dadosBody, contentType)

    response.status(resultSexo.status_code)
    response.json(resultSexo)

})

app.get('/v1/controle-filmes/sexo', cors(), async function(request, response) {
    
    let resultSexo = await controllerSexo.listarSexo()

    response.status(resultSexo.status_code)
    response.json(resultSexo)

})

app.get('/v1/controle-filmes/sexo/:id', cors(), async function(request, response) {
    
    let idSexo = request.params.id

    let resultSexo = await controllerSexo.buscarSexo(idSexo)

    response.status(resultSexo.status_code)
    response.json(resultSexo)

})

app.delete('/v1/controle-filmes/sexo/:id', cors(), async function (request, response) {
    
    // item 3 deletado no teste
    let idSexo =  request.params.id

    let resultSexo = await controllerSexo.excluirSexo(idSexo)

    response.status(resultSexo.status_code)
    response.json(resultSexo)


})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/v1/controle-filmes/dublagem', cors(), bodyParserJSON, async function (request, response){

    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultDublagem = await controllerDublagem.inserirDublagem(dadosBody, contentType)

    response.status(resultDublagem.status_code)
    response.json(resultDublagem)
})

app.put('/v1/controle-filmes/dublagem/:id', cors(), bodyParserJSON, async function (request, response) {
    
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da requisição
    let idDublagem=  request.params.id

    //recebe os dados da requisição pelo body
    let dadosBody = request.body


    let resultDublagem = await controllerDublagem.atualizarDublagem(idDublagem, dadosBody, contentType)

    response.status(resultSexo.status_code)
    response.json(resultDublagem)

})

app.get('/v1/controle-filmes/dublagem', cors(), async function(request, response) {
    
    let resultDublagem = await controllerDublagem.listarDublagem()

    response.status(resultDublagem.status_code)
    response.json(resultDublagem)

})

app.get('/v1/controle-filmes/dublagem/:id', cors(), async function(request, response) {
    
    let idDublagem = request.params.id

    let resultDublagem = await controllerDublagem.buscarDublagem(idDublagem)

    response.status(resultDublagem.status_code)
    response.json(resultDublagem)

})

app.delete('/v1/controle-filmes/dublagem/:id', cors(), async function (request, response) {
    
    // item 3 deletado no teste
    let idDublagem =  request.params.id

    let resultDublagem = await controllerDublagem.excluirDublagem(idDublagem)

    response.status(resultDublagem.status_code)
    response.json(resultDublagem)


})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen('8080', function(){
    console.log('API funcionando e aguardadndo requisições')
})