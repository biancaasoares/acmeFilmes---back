/*******************************************************************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD no Banco de dados MySQL
 *  
 * Data: 30/01/24
 * Autora: Bianca
 * Versão: 1.0
 
*********************************************************************************************************/

// Import da biblioteca do prisma client
const{ PrismaClient } = require ('@prisma/client')

// Instanciando a classe do PrismaClient
const prisma = new PrismaClient();

// Função para inserir um filme no banco de dados
const insertFilme = async function(){

}

// Função para atualizar um filme no banco de dados
const updateFilme = async function(){

}

// Função para deletar um filme no banco de dados
const deleteFilme = async function(){

}

// Função para retornar TODOS os filmes no banco de dados
const selectAllFilmes = async function(){
   let sql = 'select * from tbl_filme'


   /*
         $queryRawUnsafe(sql) ------- Encaminha uma variavel
         $queryRaw ('select * from tbl_filme' )  -------- encaminha direto o script
   */
   let rsFilmes = await prisma.$queryRawUnsafe(sql);

   if (rsFilmes.length > 0 )
            return rsFilmes;
        else
            return false;
}

// Função para buscar um filme no banco de dados pelo seu ID
const selectByIdFilme = async function(){

}

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme
}