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
const controllerNacionalidade = require('./controller/filme/controllerNacionalidade')

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

app.listen('8080', function(){
    console.log('API funcionando e aguardadndo requisições')
})