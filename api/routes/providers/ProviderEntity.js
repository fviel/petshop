/*
ESTE ARQUIVO EQUIVALE À ENTIDADE PROVIDER
CONTÉM MÉTODOS DE OPERAÇÃO NA ENTIDADE
*/

const ProviderTable = require('./ProviderTable.js')
class Provider{
    constructor({id, empresa, email, categoria, createdAt, updatedAt, version }){

        this.id = id
        this.empresa = empresa
        this.email = email
        this.categoria = categoria
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.version = version
    }
    
    //método que adiciona registro no BD
    async create(){
        const results = await ProviderTable.addProvider({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categoria

        })
        //preenche na instancia atual os demais dados autogerados pelo BD
        this.id = results.id  
        this.createdAt = results.createdAt
        this.updatedAt = results.updatedAt
        this.version = results.version
    }
}

module.exports = Provider