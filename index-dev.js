require("dotenv").config({path: "./.env.producao"})
const app = require('./app')

app.listen(3001, (err) => {
    if(err){
        console.log("Servidor não iniciado.")
        console.log(err)
    } else {
        console.log("Servidor backend Pimenta Marshall rodando na porta: 3001")
    }
})