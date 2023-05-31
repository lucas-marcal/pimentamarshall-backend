const express = require("express");
const cors = require("cors");
const { createNewPix } = require("./pixCreateImmediateCharge");
const { pixUpdateOrderStatus } = require("./prismaFunctions");
const createOneStepLink = require("./createOneStepLink");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ ok: true });
});

app.post("/create-order", async (req, res) => {
  const { qrcode, imagemQrcode, txid } = await createNewPix(req.body);
  res.send({ ok: 1, qrcode, imagemQrcode, txid });
});

app.post("/create-one-step-link", async (req, res) => {
  const result = await createOneStepLink(req.body);
  res.send({ status: result.code, payment_url: result.data.payment_url, charge_id: result.data.charge_id });
});

app.post("/recebimento", async (req, res) => {
  console.log("Card or Billet received.");
  console.log(req.body);
  res.send({ ok: 1 });
});

app.post("/webhook*", async (req, res) => {
  console.log("webhook received.");
  const { pix } = req.body;
  if (!req.client.authorized) {
    return res.status(401).send("Invalid client certificate.");
  }

  if (pix) {
    console.log(pix)
    await pixUpdateOrderStatus(pix[0].txid)
  }
  res.send({ ok: 1 });
});

// {
//   pix: [
//     {
//       endToEndId: "E00416968202305241352lsYWO1u5oPw",
//       txid: "e571c7ed915d45de92a35257f8b48c13",
//       chave: "f6518e9e-a21b-426f-9596-b000c7dbf9ab",
//       valor: "0.03",
//       horario: "2023-05-24T13:52:36.000Z",
//     },
//   ];
// }

module.exports = app;
