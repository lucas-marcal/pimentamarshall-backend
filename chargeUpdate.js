const Gerencianet = require("gn-api-sdk-node");
const options = require("./credentials");

async function getChargeUpdate(notification) {
  let params = {
    token: notification,
  };

  const gerencianet = new Gerencianet(options);

  const resposta = await gerencianet
    .getNotification(params)
    .then((resposta) => {
      return resposta;
    })
    .catch((error) => {
      console.log(error);
    });

  console.log(resposta);
}

module.exports = {
  getChargeUpdate,
}
