const Gerencianet = require("gn-api-sdk-node");
let options = require("./credentials");

options["validateMtls"] = true;

const gerencianet = new Gerencianet(options);

const pixConfigWebhook = async () => {
  let body = {
    webhookUrl: "https://api-pagamentos.pimentamarshall.com.br/webhook",
  };

  let params = {
    chave: "f6518e9e-a21b-426f-9596-b000c7dbf9ab",
  };

  gerencianet
    .pixConfigWebhook(params, body)
    .then((resposta) => {
      return resposta;
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = pixConfigWebhook;
