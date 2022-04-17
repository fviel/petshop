/*
ESTE ARQUIVO DEFINE AS OPERAÇOES DE BD NA ENTIDADE
EQUIVALE A UMA DAO
*/

const ProviderModel = require('./ProviderModel')
const NotFound = require('../../errors/NotFound')

module.exports = {
    listEverything() {
        //retorna uma lista de objetos do Sequelize (instâncias do Sequelize), não os objetos. Para mudar isto, comentei este comendo e mudei o return
        //return ProviderModel.findAll()
        //ao usar a propriedade raw:true, ele retorna o objeto cru, não o objeto do sequelize
        return ProviderModel.findAll({ raw: true })
    },

    addProvider(provider){
        //usa o create do sequelize
        return ProviderModel.create(provider)

    },

    async findById(id){
        const providerFound = await ProviderModel.findOne({
            where:{
                id: id
            }
        })
        if(!providerFound){
            //ao invés de emitir um Error genérico do js, emite a minha classe NotFound
            throw new NotFound()
        }
        return providerFound
    },

    async updateProvider(id, data){
        return ProviderModel.update(
            data,
            {
                where:{ 
                    id:id
                }
            }
        )
    },
    async delete(id){
        return ProviderModel.destroy({
            where:{
                id: id
            }
        })
    },

}



