const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const NotFound = require('./errors/NotFound')
const ContentTypeNotSupported = require('./errors/ContentTypeNotSupported')
const acceptedContentTypes = require('./Serializer').acceptedContentTypes


//pq usar const ou let?
//const - constante, não mais altera o valor da var
//let - permite alterar o valor da var

//Transforma os dados recebidos no body da requisição em json
app.use(bodyParser.json())

//middleware para verificar se o contentType da requisição é aceitável
app.use((request, response, next) =>{
    //obtenho do cabeçalho da requisição o contentType solicitado
    let requiredContentType = request.header('Accept')

    //tratamento para o contentType genérico
    if(requiredContentType === '*/*'){        
        requiredContentType = 'application/json'
    }

    console.log('Solicitado o content-type (' + requiredContentType + ') no accept ')

    //busco no array de formatos aceitos a posição do formato 
    //que me foi requisitado. Se retornar -1,
    // quer dizer que não achou o formato neste array
    if(acceptedContentTypes.indexOf(requiredContentType) === -1 ){
        console.log('index.js - Content type requerido ' + requiredContentType + ' não foi encontrado no array de aceitos.')
        response.status(406)        
        response.end()
        return
    }else{
        console.log('index.js - Content type requerido ' + requiredContentType + ' foi encontrado na posição ' + acceptedContentTypes.indexOf(requiredContentType) + ' do array de aceitos.')
    }
    // if(requiredContentType !== "application/json"){
    //     response.status(406)
    //     response.end()
    //     return
    // }

    //caso passe por este if, então já seta o contentType da response
    response.setHeader('Content-Type', requiredContentType)  
    next()  
})

// //eu podia passar a função manuamente aqui para a rota
// app.use('/api/providers', (request, response) => {
    //meu código
// })

//mas como criei um arquivo que recebe esta requisição, basta passar ele:
//carrega o meu arquivo de métodos
const router = require('./routes/providers')
const InvalidField = require('./errors/InvalidField')
const DataNotProvided = require('./errors/DataNotProvided')

//relaciona URL com uma função do meu arquivo
app.use('/api/providers', router)

//para centralizar o tratamento de erros, criei o middleware abaixo
app.use((error, request, response, next) => {

    //define que o status genérico de erro seria o 500
    let statusVar = 500 

    if (error instanceof NotFound) {
        statusVar = 404
    }
    if ((error instanceof InvalidField) || (error instanceof DataNotProvided)) {       
        statusVar = 400
    }   
    if(error instanceof ContentTypeNotSupported){
        statusVar = 406
    }

    response.status(statusVar)

    response.send(
        JSON.stringify({
            message: error.message,
            id: error.idError
        })
    )
})

//lança o app
app.listen(config.get('api.port'), () => {
    console.clear
    console.log('*** API funcionando ***')
})