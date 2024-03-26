/*******************************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações,consistência e regra de negócio para os filmes.
 *  
 * Data: 30/01/24
 * Autora: Bianca
 * Versão: 1.0
 
*********************************************************************************************************/

// Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

const filmesDAO = require('../model/DAO/filmes.js')


// função para inserir novo filme
const setInserirNovoFilme = async function (dadosFilme, contentType) {

   try {

      if (String(contentType).toLowerCase() == 'application/json') {


         let statusValidated = false
         let novoFilmeJSON = {}

         if (dadosFilme.nome == '' || dadosFilme.nome == undefined || dadosFilme.nome == null || dadosFilme.nome.length > 80 ||
            dadosFilme.sinopse == '' || dadosFilme.sinopse == undefined || dadosFilme.sinopse == null || dadosFilme.sinopse.length > 6500 ||
            dadosFilme.duracao == '' || dadosFilme.duracao == undefined || dadosFilme.duracao == null || dadosFilme.duracao.length > 8 ||
            dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento == null || dadosFilme.data_lancamento.length != 10 ||
            dadosFilme.foto_capa == '' || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa == null || dadosFilme.foto_capa.length > 200 ||
            dadosFilme.valor_unitario.length > 8 || isNaN(dadosFilme.valor_unitario)
         ) {
            return message.ERROR_REQUIRED_FIELDS
         } else {

            if (dadosFilme.data_relancamento != '' &&
               dadosFilme.data_relancamento != null &&
               dadosFilme.data_relancamento != undefined) {
               if (dadosFilme.data_relancamento.length != 10) {
                  return message.ERROR_REQUIRED_FIELDS //400
               } else {
                  statusValidated = true
               }
            } else {
               statusValidated = true

            }

            if (statusValidated) {

               let novoFilme = await filmesDAO.insertFilme(dadosFilme)

               if (novoFilme) {

                  novoFilmeJSON.status = message.SUCCESS_CREATED_ITEM.status
                  novoFilmeJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                  novoFilmeJSON.message = message.SUCCESS_CREATED_ITEM.message
                  novoFilmeJSON.filme = dadosFilme

                  return novoFilmeJSON

               } else {
                  return message.ERROR_INTERNAL_SERVER_DB
               }
            }
         }
      } else {
         return message.ERROR_CONTENT_TYPE
      }
   } catch (error) {
      return message.ERROR_INTERNAL_SERVER
   }
}



// função para atualizar um filme existente
const setAtualizarFilme = async function (id, dadosFilme, contentType) {

   try {

      if (String(contentType).toLowerCase() == 'application/json') {


         let statusValidated = false
         let atualizarFilmeJSON = {}

         if (dadosFilme.nome == '' || dadosFilme.nome == undefined || dadosFilme.nome == null || dadosFilme.nome.length > 80 ||
            dadosFilme.sinopse == '' || dadosFilme.sinopse == undefined || dadosFilme.sinopse == null || dadosFilme.sinopse.length > 6500 ||
            dadosFilme.duracao == '' || dadosFilme.duracao == undefined || dadosFilme.duracao == null || dadosFilme.duracao.length > 8 ||
            dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento == null || dadosFilme.data_lancamento.length != 10 ||
            dadosFilme.foto_capa == '' || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa == null || dadosFilme.foto_capa.length > 200 ||
            dadosFilme.valor_unitario.length > 8 || isNaN(dadosFilme.valor_unitario)
         ) {
            return message.ERROR_REQUIRED_FIELDS
         } else {

            if (dadosFilme.data_relancamento != '' &&
               dadosFilme.data_relancamento != null &&
               dadosFilme.data_relancamento != undefined) {
               if (dadosFilme.data_relancamento.length != 10) {
                  return message.ERROR_REQUIRED_FIELDS 
               } else {
                  statusValidated = true
               }
            } else {
               statusValidated = true

            }

            if (statusValidated) {

               let filmeAtualizado = await filmesDAO.updateFilme(dadosFilme,id)

               if (filmeAtualizado) {

               

                  atualizarFilmeJSON.status = message.SUCCESS_CREATED_ITEM.status
                  atualizarFilmeJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                  atualizarFilmeJSON.message = message.SUCCESS_CREATED_ITEM.message
                  atualizarFilmeJSON.id = id
                  atualizarFilmeJSON.filme = dadosFilme

                  return atualizarFilmeJSON

               } else {
                  return message.ERROR_INTERNAL_SERVER_DB
               }
            }
         }
      } else {
         return message.ERROR_CONTENT_TYPE
      }
   } catch (error) {
      console.log(error)
      return message.ERROR_INTERNAL_SERVER
   }

}


const setExcluirFilme = async function () {

   try {

      let idFilme = id

      let validaFilme = await getBuscarFilme(idFilme)

      let dadosFilme = await filmesDAO.deleteFilme(idFilme)

      if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {

          return message.ERROR_INVALID_ID //400

      } else if(validaFilme.status == false){
          return message.ERROR_NOT_FOUND

      } else {
          
          if(dadosFilme)
              return message.SUCESS_DELETE_ITEM // 200
          else
              return message.ERROR_INTERNAL_SERVER_DB

      }


  } catch (error) {
      return message.ERROR_INTERNAL_SERVER
  }


}

// função para retornar todos os filmes do banco de dados
const getListarFilmes = async function () {

   // cria o objeto JSON
   let filmesJSON = {}

   // chama a função do DAO para retornar os dados do BD
   let dadosFilmes = await filmesDAO.selectAllFilmes()

   //validação para criar o JSON dos dados
   if (dadosFilmes) {
      // cria o JSON de retorno dos dados
      filmesJSON.filmes = dadosFilmes
      filmesJSON.quatidade = dadosFilmes.length
      filmesJSON.status_code = 200

      return filmesJSON
   } else {
      return false
   }

}

// função para retornar o filtro de um filtro de um filme pelo ID
const getBuscarFilme = async function (id) {
   let idFilme = id

   let filmeJSON = {}

   if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
      return message.ERROR_INVALID_ID
   } else {

      let dadosFilme = await filmesDAO.selectByIdFilme(idFilme)

      if (dadosFilme) {

         if (dadosFilme.length > 0) {
            filmeJSON.filme = dadosFilme
            filmeJSON.status_code = 200

            return filmeJSON
         } else {
            return message.ERROR_NOT_FOUND
         }
      } else {
         return message.ERROR_INTERNAL_SERVER_DB
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