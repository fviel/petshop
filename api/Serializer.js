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
        console.log('Serializer.serialize() - Dados lidos: ' + data)
        console.log('Serializer.serialize() - Content-type lido: ' + this.contentType)
        if (this.contentType === 'application/json') {
            console.log('Content-Type de resposta definido como application/json')
            return this.answerAsJson(
                //this.filterTheObject(data)
                this.filter(data)
            )
        }

        if (this.contentType === 'application/xml') {
            console.log('Serializer.serialize() - Content-Type de resposta definido como application/xml')
            console.log('Serializer.serialize() - application/xml')
            return this.answeAsXml(data)
        }

        console.log('Serializer.serialize() - O contentType lido: ' + this.contentType + ' não é suportado')
        //emitir erro dizendo que não suporta o tipo
        throw new ContentTypeNotSupported(this.contentType)

    }

    /**
     * Retorna um único objeto somente com as variáveis definidas como públicas
     * ou seja, que podem ser respondidas
     * @param data 
     * @returns 
     */
    filterTheObject(data) {
        //objeto genérico (que gambeta...)
        const newObject = {}
        console.log('Serializer.filterTheObject() -  1')
        this.publicFields.forEach((field) => {
            if (data.hasOwnProperty(field)) {
                //adiciona uma variável para o novo objeto genérico, coisa de javascript
                newObject[field] = data[field]
                console.log('Serializer.filterTheObject() -  2')
            }
        })
        console.log('Serializer.filterTheObject() -  3')
        return newObject
    }

    /**
     * Edita os dados se forem um array, utilizado na requisição do findall e 
     * @param {*} data 
     */
    filter(data) {
        if (Array.isArray(data)) {
            //se for um array, mapear para cada objeto do array, chamar a filterObject
            data = data.map(item => {
                this.filterTheObject(item)
            })
        } else {
            data = this.filterTheObject(data)
        }
    }
}

//-------------------------

/**
 * ProviderSerializer é um serializador especializado no objeto Provider
 */
class ProviderSerializer extends Serializer {
    constructor(contentType) {
        super()
        //o comando abaixo está criando uma var pública, estilo js (que gambiarra...)
        this.contentType = contentType
        console.log('ProviderSerializer.cosntructor() - Content-Type definido: ' + this.contentType)
        //o comando abaixo cria mais var usando essa gambiarra de js
        //este array abaixo define quais são as vars públicas, que poderão ser respondidas
        this.publicFields = [
            'id',
            'empresa',
            'categoria'
        ]

    }
}

//esse é o modelo de export que eu havia aprendido, exportando somente o objeto
//module.exports = Serializer

//este é um novo modo, que exporta mais que somente a classe, exporta um vetor dizendo os types aceitos
module.exports = {
    Serializer: Serializer,
    ProviderSerializer: ProviderSerializer,
    acceptedContentTypes: ['application/json', 'application/xml']
}