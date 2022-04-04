/*
ESTE ARQUIVO DEFINE O FORMATO DA TABELA NO BANCO DE DADOS
*/

const Sequelize = require('sequelize')
const instance = require('../../database')
const columns={
    empresa:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    categoria:{
        type: Sequelize.ENUM('ração', 'brinquedos'),
        allowNull: false
    }
}
//No exemplo abaixo, renomeei nome de colunas padrões
// const options ={
//     freezeTableName: true,
//     tableName: 'providers',
//     timestaps: true,
//     createdAt: 'dataCriacao', //traduzindo nome de coluna, que brega
//     updatedAt: 'dataAtualizacao',
//     version: 'versao'
// }

const options ={
    freezeTableName: true,
    tableName: 'providers',
    timestaps: true, 
    version: 'versao'
}

module.exports = instance.define('provider',columns, options);