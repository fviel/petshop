class DataNotProvided extends Error {
    constructor() {
        super('Não foram fornecidos dados para atualizar')
        this.name = 'DataNotProvided'
        this.idError = 2
    }
}
module.exports = DataNotProvided