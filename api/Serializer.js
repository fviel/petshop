//classe responsável por transformar o tipo da resposta conforme o contentType
// informado no cabeçalho da a requisição

const ContentTypeNotSupported = require("./errors/ContentTypeNotSupported")
const jsontoxml = require('jsontoxml')


//centraliza todas as respostas da api, com base no content type
class Serializer {
    //centraliza todas as respostas em json
    answerAsJson(data) {
        const answer = JSON.stringify(data)
        console.log('Serializer.answerAsJson() - ' + answer)
        return answer
    }

    answerAsXml(data) {
        //return jsontoxml({[this.tag]: data})

        let tag = this.tagSingular
        if (Array.isArray(data)) {
            tag = this.tagPlural
            data = data.map((item) => {
                return {
                    [this.tagSingular]: item
                }
            })
        }
        return jsontoxml({ [tag]: data })
    }

    serialize(data) {
        //filtra os campos a serem respondidos
        data = this.filter(data)
        if (this.contentType === 'application/json') {
            console.log('Content-Type de resposta definido como application/json')
            return this.answerAsJson(data)
        }

        if (this.contentType === 'application/xml') {            
            return this.answerAsXml(data)
        }
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
        console.log('Serializer.filterTheObject() -  1 ' + JSON.stringify(data))
        this.publicFields.forEach((field) => {
            if (data.hasOwnProperty(field)) {
                //adiciona uma variável para o novo objeto genérico, coisa de javascript
                newObject[field] = data[field]
                console.log('Serializer.filterTheObject() -  2') 
            }
        })
        console.log('Serializer.filterTheObject() -  3 ' + JSON.stringify(newObject))
        return newObject
    }

    /**
     * Edita os dados se forem um array, utilizado na requisição do findall e 
     * @param {*} data 
     */
    filter(data) {
        if (Array.isArray(data)) {
            console.log('Serializer.filter - É um array')
            //se for um array, mapear para cada objeto do array, chamar a filterObject
            data = data.map(item => this.filterTheObject(item))            
        } else {
            console.log('Serializer.filter - Não é um array')
            data = this.filterTheObject(data)
        }
        return data
    }
}

//-------------------------

/**
 * ProviderSerializer é um serializador especializado no objeto Provider
 */
class ProviderSerializer extends Serializer {
    constructor(contentType, extraFields) {
        super()
        //o comando abaixo está criando uma var pública, estilo js (que gambiarra...)
        this.contentType = contentType
        console.log('ProviderSerializer.constructor() - Content-Type definido: ' + this.contentType)
        //o comando abaixo cria mais var usando essa gambiarra de js
        //este array abaixo define quais são as vars públicas, que poderão ser respondidas
        this.publicFields = [
            'id',
            'empresa',
            'categoria'
        ].concat(extraFields || []) //[] é pra evitar erro de undefined
        //define a tag principal se pedido o contentType xml
        this.tagSingular = 'provider'
        this.tagPlural = 'providers'
    }
}

class ProviderSerializerExtended extends Serializer {
    constructor(contentType) {
        super()
        //o comando abaixo está criando uma var pública, estilo js (que gambiarra...)
        this.contentType = contentType
        console.log('ProviderSerializerExtended.constructor() - Content-Type definido: ' + this.contentType)
        //o comando abaixo cria mais var usando essa gambiarra de js
        //este array abaixo define quais são as vars públicas, que poderão ser respondidas
        this.publicFields = [
            'id',
            'empresa',
            'categoria',
            'version',
            'email',
        ]
        //define a tag principal se pedido o contentType xml
        this.tagSingular = 'provider'
        this.tagPlural = 'providers'
    }
}

class ErrorSerializer extends Serializer{
    constructor(contentType, extraFields){
        super()
        this.contentType = contentType
        console.log('ProviderSerializerExtended.constructor() - Content-Type definido: ' + this.contentType)
        this.publicFields = [
            'id',
            'message'
        ].concat(extraFields || []) //[] é pra evitar erro de undefined
        //define a tag principal se pedido o contentType xml
        this.tagSingular = 'error'
        this.tagPlural = 'errors'
    }
}

//esse é o modelo de export que eu havia aprendido, exportando somente o objeto
//module.exports = Serializer

//este é um novo modo, que exporta mais que somente a classe, exporta um vetor dizendo os types aceitos
module.exports = {
    Serializer: Serializer,
    ProviderSerializer: ProviderSerializer,
    ProviderSerializerExtended: ProviderSerializerExtended,
    ErrorSerializer: ErrorSerializer,
    acceptedContentTypes: ['application/json', 'application/xml']
}