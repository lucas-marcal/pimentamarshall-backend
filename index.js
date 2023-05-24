const express = require("express")
const cors = require("cors")
const { createNewPix } = require("./pixCreateImmediateCharge")
const app = require('./app')

const https = require("https")
const fs = require("fs")

const options = {
    key: fs.readFileSync("/etc/letsencrypt/live/api-pagamentos.pimentamarshall.com.br/fullchain.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/api-pagamentos.pimentamarshall.com.br/privkey.pem"),
    ca: fs.readFileSync("./ca-gerencianet.crt"),
    minVersion: "TLSv1.2",
    requestCert: true,
    rejectUnauthorized: false
}

const server = https.createServer(options, app)
server.listen(443)