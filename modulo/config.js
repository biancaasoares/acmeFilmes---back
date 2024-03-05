/*************************************************
 * Objetivo: arquivo responsável pelas variaveis globais do projeto,onde haverão mensgagens,
 * status_code e outros conteúdos para o projeto
 * data: 20/02/2024
 * autor: Bianca
 * versão: 1.0
 ******************************************************************************************/

                   /* MENSAGENS DE ERRO DO PROJETO */

const ERROR_INVALID_ID = {status : false, status_code:400, message: 'O id encaminhado na requisição não é válido'}
const ERROR_REQUIRED_FIELDS = {status: false, status_code: 400, message: 'Existem campos obrigatórios que não foram preenchidos ou ultrapassaram o limite de caracteres!!'}
const ERROR_NOT_FOUND = {status : false, status_code:404, message: 'nenhum item encontrado na requisição'}
const ERROR_INTERNAL_SERVER_DB = {status : false, status_code:500, message: 'Ocorreram erros no processamento do banco de dados'}

/**************************************************************/
                 /*  MENSAGENS DE SUCESSO DO PROJETO */

const SUCCESS_CREATED_ITEM = {status:true, status_code: 201, message: 'Item criado com sucesso no banco de dados'}
 

module.exports = {
    ERROR_INVALID_ID,
    ERROR_REQUIRED_FIELDS,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB,
    SUCCESS_CREATED_ITEM
}