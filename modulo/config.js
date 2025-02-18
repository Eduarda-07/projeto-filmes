/*************************************************************************************
 * objetivo: arquivo de confiuração para padronizar mensagens e status code da API
 * data: 18/02/25
 * autor: Eduarda Silva
 * versão: 1.0
 *************************************************************************************/



/*************************** STATUS CODE DE MENSAGEM DE ERRO **************************/

const ERROR_REQUIRED_FIELD = {status: false, status_code: 400, message: "Não foi possível realizar a requisição, pois existem campo obrigatórios que não foram preenchidos ou não atendem a quantidade de caracteres!!!"}

const ERROR_INTERNAL_SERVER = {status: false, status_code: 500, message: "Devido a erros internos no servidor, não foi possível processar a requisição"}



/*************************** STATUS CODE DE MENSAGEM DE SUCESSO ************************/
const SUCCESS_CREATED_ITEM = {status: true, status_code: 201, message: "Item criado com sucesso!!"}


module.exports = {
    ERROR_REQUIRED_FIELD,
    ERROR_INTERNAL_SERVER,
    SUCCESS_CREATED_ITEM
}