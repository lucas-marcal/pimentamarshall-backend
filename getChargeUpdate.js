const Gerencianet = require('gn-api-sdk-node');
const options = require('./credentials')

/*
* Este token será recebido em sua variável que representa os parâmetros do POST
* Ex.: req.body['notification']
*/
const token = 'fb1ad6de-c528-4398-9121-fcb5d537849e';
 
const params = {
  token: token
}
 
const gerencianet = new Gerencianet(options);
 
gerencianet
  .getNotification(params)
  .then((res) => console.log(res))
  .catch(console.log)
  .done();