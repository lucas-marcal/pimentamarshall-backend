const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send({ ok: true })
})
app.post("/create-order", async(req, res) => {
    const {qrcode, imagemQrcode} = await createNewPix(req.body)
    res.send({ ok: 1, qrcode, imagemQrcode })
})

app.post("/webhook", (req, res) => {
    console.log("webhook received.")
    console.log(req.body)
    if (!req.client.authorized){
        return res.status(401).send("Invalid client certificate.")
    }
    res.send({ ok: 1 })
})

module.exports = app