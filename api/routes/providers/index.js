//usa o roteador do express
const router = require('express').Router()
const TableModel = require('./ProviderModel')

//isntancia de Provider que receberá o post
ProviderEntity provider = require('./ProviderEntity')



//roteador  do express para agrupar rotas
router.get('/', async(request, response) => {
    const results = await TableModel.findAll()    

    //respondendo string
    //response.send("olá!")

    //respondendo o findall do BD
    response.send(
        "Lista de todos os fornecedores:" +
        JSON.stringify(results)
    )
})

router.post('/', async(request, response) => {
    const receivedData = request.body

})

module.exports = router