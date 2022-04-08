/*
ESTE ARQUIVO EQUIVALE À ENTIDADE PROVIDER
CONTÉM MÉTODOS DE OPERAÇÃO NA ENTIDADE
*/

const ProviderTable = require('./ProviderTable.js')

class Provider {
    constructor({ id, empresa, email, categoria, createdAt, updatedAt, version }) {

        this.id = id
        this.empresa = empresa
        this.email = email
        this.categoria = categoria
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.version = version
    }

    //método que adiciona registro no BD
    async create() {
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

    //retorna um objeto PRovider carregado do BD
    async load() {
        const providerFound = await ProviderTable.findById(this.id)
        this.id = providerFound.id
        this.empresa = providerFound.empresa
        this.email = providerFound.email
        this.categoria = providerFound.categoria
        this.createdAt = providerFound.createdAt
        this.updatedAt = providerFound.updatedAt
        this.version = providerFound.version
    }

    async update() {
        await ProviderTable.findById(this.id)
        const fields = ['empresa', 'email', 'categoria']
        const dataForUpdate = {}

        fields.forEach((field) => {
            const value = this[field]
            if (typeof value === 'string' && value.length > 0) {
                dataForUpdate[field] = value
            }
        })

        //Object.keys retorna uma lista
        if (Object.keys(dataForUpdate).length === 0) {
            throw new Error('Não foram fornecidos dados para atualizar')
        }

        await ProviderTable.updateProvider(this.id, dataForUpdate)
    }

    async remove() {
        return ProviderTable.delete(this.id)
    }


}

module.exports = Provider