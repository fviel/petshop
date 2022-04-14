//classe responsável por transformar o tipo da resposta conforme o contentType
// informado no cabeçalho da a requisição

const ContentTypeNotSupported = require("./errors/ContentTypeNotSupported")

class Serializer {
    json(data) {
        return JSON.stringify(data)
    }

    serialize(data) {
        if (this.contentType === 'application/json') {
            return this.json(data)
        } else {
            //emitir erro dizendo que não suporta o tipo
            throw new ContentTypeNotSupported(this.contentType)
        }
    }
}
//module.exports = Serializer
module.exports = {
    Serializer : Serializer,
    acceptedContentTypes: ['application/json']
}