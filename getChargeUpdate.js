const Gerencianet = require('gn-api-sdk-node');
const options = require('./credentials')
 
let params = {
	token: 'fb1ad6de-c528-4398-9121-fcb5d537849e',
}

const gerencianet = new Gerencianet(options)

gerencianet.getNotification(params)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})