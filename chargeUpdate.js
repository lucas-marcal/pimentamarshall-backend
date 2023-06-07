const Gerencianet = require("gn-api-sdk-node");
const options = require("./credentials");
const {
  paymentLinkUpdateOrderStatus,
  getOrderById,
} = require("./prismaFunctions");
const { sendPixConfirmation } = require("./sendOrderReceipt");

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

  return resposta;
}

async function updateOrderStatusByToken(notification) {
  const resposta = await getChargeUpdate(notification);
  resposta.data.map(async (item) => {
    if (item.status.current === "paid") {
      try {
        await paymentLinkUpdateOrderStatus(item.custom_id);
        const { clientEmail } = await getOrderById(item.custom_id);
        await sendPixConfirmation(clientEmail);
      } catch (error) {
        console.log(error);
      }
    }
  });
}

module.exports = {
  getChargeUpdate,
  updateOrderStatusByToken,
};
