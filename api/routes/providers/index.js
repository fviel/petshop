/*
ARQUIVO QUE DEFINE AS ROTAS DA API
*/

//usa o roteador do express
const router = require('express').Router()
const ProviderModel = require('./ProviderModel')
const ProviderTable = require('./ProviderTable')
const ProviderEntity = require('./ProviderEntity')


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
router.get('/', async (request, response) => {
    const results = await ProviderTable.listEverything()
    response.status(200).send(
        JSON.stringify(results)
    )
})

//adiciona um provider no BD
router.post('/', async (request, response) => {
    try {
        const receivedData = request.body
        const provider = new ProviderEntity(receivedData)
        await provider.create()
        response.status(201).send(
            JSON.stringify(provider)
        )
    } catch (error) {
        response.status(400).send(
            JSON.stringify({
                message: error.message
            })
        )
    }
})

router.get('/:idProvider', async (request, response) => {
    try {
        const id = request.params.idProvider
        const provider = new ProviderEntity({ id: id })
        await provider.load()
        response.status(200).send(
            JSON.stringify(provider)
        )
    } catch (error) {
        response.status(404).send(
            JSON.stringify({
                message: error.message
            })
        )
    }

})

module.exports = router