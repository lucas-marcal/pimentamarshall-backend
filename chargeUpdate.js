const Gerencianet = require("gn-api-sdk-node");
const options = require("./credentials");
const { paymentLinkUpdateOrderStatus } = require("./prismaFunctions");

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

  return resposta
}

async function updateOrderStatusByToken(notification) {
  const resposta = await getChargeUpdate(notification);
  resposta.data.map(async (item) => {
    if (item.status.current === "link") {
      try {
        await paymentLinkUpdateOrderStatus(item.custom_id)
      } catch (error) {
        console.log(error)
      }
    }
  })
}

module.exports = {
  getChargeUpdate,
  updateOrderStatusByToken,
}
