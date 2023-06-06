// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
require("dotenv").config({ path: "./.env.producao" });

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendPixConfirmation(clientEmail) {
  const msg = {
    to: clientEmail,
    from: {
      email: "contato@pimentamarshall.com.br",
      name: "Pimenta Marshall",
    },
    templateId: "d-6a99e27c1fd24fed878772c8c49d8998",
    dynamicTemplateData: {},
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = {
  sendPixConfirmation,
};
