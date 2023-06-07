const Gerencianet = require('gn-api-sdk-node')
const options = require('./credentials')

function getDayAfterTomorrow() {
    const currentDate = new Date();
  
    currentDate.setDate(currentDate.getDate() + 2);
  
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
  
    return year + '-' + month + '-' + day;
  }

const createOneStepLink = async (order) => {
	let params = {
		id: order.id,
	}
	
	let body = {
		settings: {
			message: 'Realize o pagamento das suas Pimentas Marshall.',
			expire_at: getDayAfterTomorrow(),
			request_delivery_address: false,
			payment_method: 'all',
		},
		items: order.items,
		shippings: [{
			name: order.shipping.type,
			value: order.shipping.price,
		}],
		metadata: {
			custom_id: order.id,
			notification_url: "https://api-pagamentos.pimentamarshall.com.br/recebimento"
		},
	}
	
	const gerencianet = new Gerencianet(options)
	
	const data = await gerencianet.createOneStepLink(params, body)
		.then((resposta) => {
			return resposta
		})
		.catch((error) => {
			console.log(error)
			return error
		})
	
	return data
}

module.exports = createOneStepLink