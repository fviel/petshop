const TableModel = require('../routes/providers/ProviderModel')

//retorna uma promessa
TableModel
.sync()
.then(() => console.log('Tabela criada com sucesso'))
.catch(console.log)
