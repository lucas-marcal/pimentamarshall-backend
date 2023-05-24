const Gerencianet = require('gn-api-sdk-node')
let options = require('./credentials')

options['validateMtls'] = false

let body = {
	webhookUrl: 'https://api-pagamentos.pimentamarshall.com.br/webhook',
}

let params = {
	chave: 'f6518e9e-a21b-426f-9596-b000c7dbf9ab',
}

const gerencianet = new Gerencianet(options)

const pixConfigWebhook = gerencianet.pixConfigWebhook(params, body)
	.then((resposta) => {
		return resposta
	})
	.catch((error) => {
		console.log(error)
	})

module.exports = pixConfigWebhook