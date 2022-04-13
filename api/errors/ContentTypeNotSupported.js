class ContentTypeNotSupported extends Error{
    constructor(type){
        super(`O content type ' ${type} ' não é suportado pela API `)
        this.name = 'ContentTypeNotSupported'
        this.idError = 3
    }
}
module.exports = ContentTypeNotSupported