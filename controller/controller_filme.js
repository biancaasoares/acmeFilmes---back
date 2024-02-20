/*******************************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações,consistência e regra de negócio para os filmes.
 *  
 * Data: 30/01/24
 * Autora: Bianca
 * Versão: 1.0
 
*********************************************************************************************************/

// Import do arquivo de configuração do projeto
const message = require('../modulo/config.js');

const filmesDAO = require('../model/DAO/filmes.js')


// função para inserir novo filme
const setInserirNovoFilme = async function(){

}

// função para atualizar um filme existente
 const setAtualizarFilme = async function(){

 }

 // função para excluir um filme existente
 const setExcluirFilme = async function(){

 }

 // função para retornar todos os filmes do banco de dados
 const getListarFilmes = async function(){

   // cria o objeto JSON
   let filmesJSON = {};

   // chama a função do DAO para retornar os dados do BD
   let dadosFilmes = await filmesDAO.selectAllFilmes();

   //validação para criar o JSON dos dados
   if(dadosFilmes){
      // cria o JSON de retorno dos dados
      filmesJSON.filmes = dadosFilmes;
      filmesJSON.quatidade = dadosFilmes.length
      filmesJSON.status_code = 200;

      return filmesJSON;
   } else {
      return false;
   }

 }

 // função para retornar o filtro de um filtro de um filme pelo ID
 const getBuscarFilme = async function(id){
         let idFilme = id;

         let filmeJSON = {};

         if(idFilme == '' || idFilme == undefined || isNaN(idFilme)){
            return message.ERROR_INVALID_ID
         } else{

            let dadosFilme = await filmesDAO.selectByIdFilme(idFilme);

            if(dadosFilme){

            if(dadosFilme.length > 0 ){
                 filmeJSON.filme = dadosFilme;
                 filmeJSON.status_code = 200;

                 return filmeJSON;
            }else {
               return message.ERROR_NOT_FOUND;
            }
      }else{
               return message.ERROR_INTERNAL_SERVER_DB;
         }
       }
     
      }

 

 module.exports = {
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme
 }