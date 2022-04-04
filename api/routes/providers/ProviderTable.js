/*
ESTE ARQUIVO DEFINE AS OPERAÇOES DE BD NA ENTIDADE
EQUIVALE A UMA DAO
*/

const ProviderModel = require('./ProviderModel')

module.exports = {
    listEverything() {
        return ProviderModel.findAll()
    },

    addProvider(provider){
        //usa o create do sequelize
        return ProviderModel.create(provider)

    }
}



