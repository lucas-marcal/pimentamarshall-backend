const Gerencianet = require("gn-api-sdk-node");
const options = require("./credentials");

const gerencianet = new Gerencianet(options);

const pixCreateImmediateCharge = async (order) => {
  let body = {
    calendario: {
      expiracao: 3600,
    },
    valor: {
      original: order.orderTotal,
    },
    chave: process.env.CHAVE_PIX,
    infoAdicionais: [
      {
        nome: "Pagamento em",
        valor: "Pimenta Marshall",
      },
    ],
  };

  const data = await gerencianet
    .pixCreateImmediateCharge([], body)
    .then((resposta) => {
	  return resposta
    })
    .catch((error) => {
      console.log(error);
    });

  return data;
};

const pixGenerateQRCode = async (loc) => {
  let params = {
    id: loc,
  };

  const qrCode = gerencianet
    .pixGenerateQRCode(params)
    .then((resposta) => {
	  return resposta
    })
    .catch((error) => {
      console.log(error);
    });

	return qrCode
};

const createNewPix = async(order) => {
	const newPixData = await pixCreateImmediateCharge(order);
	const newPixQRCode = await pixGenerateQRCode(newPixData.loc.id);

  const data = {...newPixQRCode, txid: newPixData.txid};

	return data
}

module.exports = {
  createNewPix,
}