/*
ARQUIVO QUE DEFINE AS ROTAS DA API
*/

//usa o roteador do express
const router = require('express').Router()
const ProviderTable = require('./ProviderTable')
const ProviderEntity = require('./ProviderEntity')
const Provider = require('./ProviderEntity')
const ProviderSerializer = require('../../Serializer').ProviderSerializer
const ProviderSerializerExtended = require('../../Serializer').ProviderSerializerExtended

//Exemplo de um método chamando nada...
// router.get('/', async(request, response) => {    
//     response.send("olá!")
// })

//Forma 1 de fazer o get de todos os elementos, sem chamar nenhum arquivo a mais
// router.get('/', async(request, response) => {
//     const results = await ProviderModel.findAll()  
//     response.send(
//         "Lista de todos os fornecedores:" +
//         JSON.stringify(results)
//     )
// })

//Forma 2 de fazer o get de todos os elementos - chamando função de arquivo externo
router.get('/', async (request, response, next) => {
    try {
        const results = await ProviderTable.listEverything()
        response.status(200)
        const serializer = new ProviderSerializerExtended(response.getHeader('Content-Type'))
        response.send(
            //JSON.stringify(results)
            serializer.serialize(results)
        )
    } catch (error) {
        next(error)
    }
})

//adiciona um provider no BD
router.post('/', async (request, response, next) => {
    try {
        const receivedData = request.body
        const provider = new ProviderEntity(receivedData)
        await provider.create()
        response.status(201)
        const providerSerializer = new ProviderSerializer(response.getHeader('Content-Type'))
        response.send(
            //JSON.stringify(provider)
            providerSerializer.serialize(provider)
        )
    } catch (error) {
        next(error)
    }
})

router.get('/:idProvider', async (request, response, next) => {
    try {
        const id = request.params.idProvider
        const provider = new ProviderEntity({ id: id })
        await provider.load()
        response.status(200)
        console.log('router/index.js - get() - Content-Type definido na resposta: ' + response.getHeader('Content-Type'))
        const providerSerializer = new ProviderSerializer(response.getHeader('Content-Type'))
        response.send(
            //JSON.stringify(provider)
            providerSerializer.serialize(provider)
        )
    } catch (error) {
        // response.status(404).send(
        //     JSON.stringify({
        //         message: error.message
        //     })
        // )
        next(error)
    }

})

router.put('/:idProvider', async (request, response, next) => {
    try {
        const id = request.params.idProvider
        const receivedData = request.body
        //mesclar objetos
        const data = Object.assign({}, receivedData, { id: id })
        const provider = new ProviderEntity(data)

        await provider.update()
        response.status(204)
        response.end()
    } catch (error) {
        next(error)
    }
})



router.delete('/:idProvider', async (request, response, next) => {
    try {
        const id = request.params.idProvider;
        const provider = new Provider({ id: id })
        await provider.load()
        await provider.remove()
        response.status(204)
        response.end()
    } catch (error) {
        // response.status(404).send(
        //     JSON.stringify({
        //         message: error.message
        //     })
        // )
        next(error)
    }
})

module.exports = router