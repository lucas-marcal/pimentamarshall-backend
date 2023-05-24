require("dotenv").config({path: "./.env.producao"})

module.exports = {
	// PRODUÇÃO = false
	// HOMOLOGAÇÃO = true
	sandbox: false,
	client_id: process.env.GN_CLIENT_ID,
	client_secret: process.env.GN_CLIENT_SECRET,
	certificate: process.env.CAMINHO_CERTIFICADO,
}