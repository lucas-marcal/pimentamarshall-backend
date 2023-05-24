const app = require('./app')
const pixConfigWebhook = require("./pixConfigWebhook")

const https = require("https")
const fs = require("fs")

const options = {
    key: fs.readFileSync("/etc/letsencrypt/live/api-pagamentos.pimentamarshall.com.br/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/api-pagamentos.pimentamarshall.com.br/fullchain.pem"),
    ca: fs.readFileSync("./chain-pix-prod.crt"),
    minVersion: "TLSv1.2",
    requestCert: true,
    rejectUnauthorized: false
}

const server = https.createServer(options, app)
server.listen(443, () => {
    console.log("server running...")
    console.log("creating webhook for pix...")
    pixConfigWebhook().then(() => {
        console.log("webhook created.")
    })
})