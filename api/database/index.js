const Sequelize = require('sequelize')
const config = require('config')

//configurando usando o npm config
const instance = new Sequelize(
    config.get('mysql.database'),
    config.get('mysql.user'),
    config.get('mysql.password'),
    {
        host:config.get('mysql.host'),
        dialect: 'mysql'
    }
)


/*/config do BD manualmente, sem o npm config
const instance = new Sequelize(
'petshop', //nome database
'root', //user mysql
'123456', // pwd de user
{
    host:'127.0.0.1',
    dialect: 'mysql'
}
)*/

module.exports = instance