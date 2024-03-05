/*******************************************************************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD no Banco de dados MySQL
 *  
 * Data: 30/01/24
 * Autora: Bianca
 * Versão: 1.0
 
*********************************************************************************************************/

// Import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// Instanciando a classe do PrismaClient
const prisma = new PrismaClient();


// Função para inserir um filme no banco de dados
const insertFilme = async function (dadosFilme) {

    try {
        let sql;

        if (dadosFilme.data_relancamento == nul ||
            dadosFilme.data_relancamento == undefined ||
            dadosFilme.data_relancamento == ''
        ) {

            sql = `insert into tbl_filme( nome,
                                      sinopse,
                                      duracao,
                                      data_lancamento,
                                      data_relancamento,
                                      foto_capa,
                                      valor_unitario
                                    ) values (
                                        '${dadosFilme.nome}',
                                        '${dadosFilme.sinopse}',
                                        '${dadosFilme.duracao}',
                                        '${dadosFilme.data_lancamento}',
                                         null,
                                        '${dadosFilme.foto_capa}',
                                        '${dadosFilme.valor_unitario}'
                                    )`


        } else {
            sql = `insert into tbl_filme( nome,
                                            sinopse,
                                            duracao,
                                            data_lancamento,
                                            data_relancamento,
                                            foto_capa,
                                            valor_unitario
                                          ) values (
                                              '${dadosFilme.nome}',
                                              '${dadosFilme.sinopse}',
                                              '${dadosFilme.duracao}',
                                              '${dadosFilme.data_lancamento}',
                                               null,
                                              '${dadosFilme.foto_capa}',
                                              '${dadosFilme.valor_unitario}'
                                          )`
        }

        let result = await prisma.$executeRawUnsafe(sql);

        if (result)
            return true;
        else
            return false;
    } catch (error) {
        return false;
    }
}

// Função para atualizar um filme no banco de dados
const updateFilme = async function () {

}

// Função para deletar um filme no banco de dados
const deleteFilme = async function () {

}

// Função para retornar TODOS os filmes no banco de dados
const selectAllFilmes = async function () {
    let sql = 'select * from tbl_filme'


    /*
          $queryRawUnsafe(sql) ------- Encaminha uma variavel
          $queryRaw ('select * from tbl_filme' )  -------- encaminha direto o script
    */
    let rsFilmes = await prisma.$queryRawUnsafe(sql);

    if (rsFilmes.length > 0)
        return rsFilmes;
    else
        return false;
}

// Função para buscar um filme no banco de dados pelo seu ID
const selectByIdFilme = async function (id) {

    try {
        let rsFilme = await prisma.$queryRawUnsafe(sql);

        return rsFilme;

    } catch (error) {
        return false;
    }
}

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme
}