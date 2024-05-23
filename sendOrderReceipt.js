// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
require("dotenv").config({ path: "./.env.producao" });

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendPurchaseConfirmation() {
  const msg_store = {
    to: "contato@pimentamarshall.com.br",
    from: {
      email: "vendas@pimentamarshall.com.br",
      name: "Vendas Marshall",
    },
    templateId: "d-acce61474fd94d6e8edfd5edcf4e06dd",
    dynamicTemplateData: {},
  };

  sgMail
    .send(msg_store)
    .then(() => {
      console.log("Email sent to store.");
    })
    .catch((error) => {
      console.error(error);
    });
}

async function sendPixConfirmation(clientEmail) {
  const msg_client = {
    to: clientEmail,
    from: {
      email: "vendas@pimentamarshall.com.br",
      name: "Pimenta Marshall",
    },
    templateId: "d-6a99e27c1fd24fed878772c8c49d8998",
    dynamicTemplateData: {},
  };

  const msg_store = {
    to: "contato@pimentamarshall.com.br",
    from: {
      email: "vendas@pimentamarshall.com.br",
      name: "Vendas Marshall",
    },
    templateId: "d-acce61474fd94d6e8edfd5edcf4e06dd",
    dynamicTemplateData: {},
  };

  sgMail
    .send(msg_client)
    .then(() => {
      console.log("Email sent to client");
    })
    .catch((error) => {
      console.error(error);
    });

  sgMail
    .send(msg_store)
    .then(() => {
      console.log("Email sent to store.");
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = {
  sendPixConfirmation,
  sendPurchaseConfirmation,
};
