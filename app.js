const express = require("express");
const cors = require("cors");
const { createNewPix } = require("./pixCreateImmediateCharge");
const { pixUpdateOrderStatus, getOrderByTxid } = require("./prismaFunctions");
const createOneStepLink = require("./createOneStepLink");
const {
  sendPixConfirmation,
  sendPurchaseConfirmation,
} = require("./sendOrderReceipt");
const { updateOrderStatusByToken } = require("./chargeUpdate");
const { dbtestFunc } = require("./dbtest");

const app = express();

const corsOptions = {
  origin: "https://pimentamarshall.com.br",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

app.get("/", (req, res) => {
  res.send({ ok: true });
});

app.post("/create-order", async (req, res) => {
  const { qrcode, imagemQrcode, txid } = await createNewPix(req.body);
  res.send({ ok: 1, qrcode, imagemQrcode, txid });
});

app.post("/create-one-step-link", async (req, res) => {
  const result = await createOneStepLink(req.body);
  const payment_url = result.data.payment_url;
  const charge_id = result.data.charge_id;
  res.send({ ok: 1, payment_url, charge_id });
});

app.post("/recebimento", async (req, res) => {
  console.log("Card or Billet update received.");
  const { notification } = req.body;
  await updateOrderStatusByToken(notification);
  res.send({ ok: 1 });
});

app.post("/webhook*", async (req, res) => {
  console.log("webhook received.");
  const { pix } = req.body;
  if (!req.socket.authorized) {
    return res.status(401).send("Invalid client certificate.");
  }

  if (pix) {
    console.log(pix);
    await sendPurchaseConfirmation();
    await pixUpdateOrderStatus(pix[0].txid);
    const { clientEmail, clientName } = await getOrderByTxid(pix[0].txid);
    await sendPixConfirmation(clientEmail);
  }
  res.send({ ok: 1 });
});

module.exports = app;
