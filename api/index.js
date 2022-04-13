const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const NotFound = require('./errors/NotFound')

app.use(bodyParser.json())

// //eu podia passar a função manuamente aqui para a rota
// app.use('/api/providers', (request, response) => {
    //meu código
// })

//mas como criei um arquivo que recebe esta requisição, basta passar ele:
//carrega o meu arquivo de métodos
const router = require('./routes/providers')
const InvalidField = require('./errors/InvalidField')

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
app.listen(config.get('api.port'), () => console.log('API funcionando'))