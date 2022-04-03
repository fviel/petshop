const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')

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

//lança o app
app.listen(config.get('api.port'), () => console.log('API funcionando'))