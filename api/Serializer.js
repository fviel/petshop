//classe responsável por transformar o tipo da resposta conforme o contentType
// informado no cabeçalho da a requisição

const ContentTypeNotSupported = require("./errors/ContentTypeNotSupported")


//centraliza todas as respostas da api, com base no content type
class Serializer {
    //centraliza todas as respostas em json
    answerAsJson(data) {
        return JSON.stringify(data)
    }

    answeAsXml(data) {
        return XMLDocument.stringify(data)
    }

    serialize(data) {
        if (this.contentType === 'application/json') {
            console.log('application/json')
            return this.answerAsJson(data)
        }

        if (this.contentType === 'application/xml') {
            console.log('application/xml')
            return this.answeAsXml(data)
        }

        console.log('contentType lido: ' + this.contentType)
        //emitir erro dizendo que não suporta o tipo
        throw new ContentTypeNotSupported(this.contentType)

    }

    //objectFilter
}

class ProviderSerializer extends Serializer {
    constructor(contentType) {
        super()
        this.contentType = this.contentType

    }
}


//module.exports = Serializer

//exporta mais que somente a classe, exporta um vetor dizendo os types aceitos
module.exports = {
    Serializer: Serializer,
    ProviderSerializer: ProviderSerializer,
    acceptedContentTypes: ['application/json', 'application/xml']
}