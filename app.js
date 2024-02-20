/*******************************************************************************************************
 * Objetivo: Arquivo responsável por realizar as requisições de filmes
 *
 *  
 * Data: 30/01/24
 * Autora: Bianca
 * Versão: 1.0
 
*********************************************************************************************************/

/* para realizar a integração com Banco de dados precisamos de uma bibloteca
     - SEQUELIZE ORM (biblioteca mais antiga)
     - PRISMA ORM (biblioteca mais atual)
     - FASTFY ORM (biblioteca mais atual)


     instalação do PRISMA ORM
       npm install prisma --save (que realiza a conexão com o BD)
       npm install @prisma/client --save  (quem executa os scripts SQL no BD) 

     após as instalções devemos rodas o comando:
        npx prisma init (esse comando inicializa)


*/


const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
// const functions = require('./controller/functions.js')

const app = express()

app.use((request,response,next) => {
      response.header('Acces-Control-Allow-Origin', '*')
      response.header('Acces-Control-Allow-Methods', 'GET')
      app.use(cors)
      next()
})





/*********************************iMPORT DOS ARQUIVOS INTERNOS DO PROJETO***************************/
                const controllerFilmes = require ('./controller/controller_filme.js')


 


  // ENDPOINT: retorna os dados do arquivo JSON
app.get('v1/acmefilmes/filmes', cors(), async function (request,response,next){

})

 //  ENDPOINT: retorna os dados do Bando de dados
 app.get('/v2/acmefilmes/filmes', cors(), async function (request,response,next){
   
    // chama a função para retornar os dados de filme
      let dadosFilmes = await controllerFilmes.getListarFilmes();

      //validação para retornar os dados ou o erro quando não houver dados
      if(dadosFilmes){
      response.json(dadosFilmes);
      response.status(200);
      } else {
        response.json({message: 'Nenhum registro encontrado '});
        response.status(404);
      }
 })

 // ENDPOINT: retorna o filme filtrado pelo ID
 app.get('/v2/acmefilmes/filme/:id', cors(), async function(request,response,next){
  let idFilme = request.params.id;

  let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme);

  response.status(dadosFilme.status_code);
  response.json(dadosFilme);
})


app.listen('8080', function(){
    console.log('API funcionando')
})