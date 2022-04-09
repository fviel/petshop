class NotFound extends Error{
    constructor(){
        super('Fornecedor não encontrado')
        this.name = 'NotFound'
        this.idError = 0
    }
}

module.exports = NotFound