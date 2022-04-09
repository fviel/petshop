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

//relaciona URL com uma função do meu arquivo
app.use('/api/providers', router)

//para centralizar o tratamento de erros, criei o middleware abaixo
app.use((error, request, response, next) => {
    if (error instanceof NotFound) {
        response.status(404)
    } else {
        response.status(400)
    }
    response.send(
        JSON.stringify({
            message: error.message,
            id: error.idError
        })
    )
})

//lança o app
app.listen(config.get('api.port'), () => console.log('API funcionando'))