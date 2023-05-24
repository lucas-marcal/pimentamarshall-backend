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

module.exports = app