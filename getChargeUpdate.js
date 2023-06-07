const Gerencianet = require('gn-api-sdk-node');
const options = require('./credentials')

/*
* Este token será recebido em sua variável que representa os parâmetros do POST
* Ex.: req.body['notification']
*/
const token = 'token_da_notificacao';
 
const params = {
  token: token
}
 
const gerencianet = new Gerencianet(options);
 
gerencianet
  .getNotification(params)
  .then(console.log)
  .catch(console.log)
  .done();