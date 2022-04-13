class InvalidField extends Error{   
    constructor(field){
        const mensagem = `Campo '${field}' inválido`
        super(mensagem)
        this.name = 'InvalidField'
        this.idError = 1
    }
}

module.exports = InvalidField