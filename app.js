require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const router = require('./routes/router');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.set({
        'Content-Type': 'application/json',
        'sid': 'f614e8bf-aecf-31b9-854c-a143ca774ca6',
        'auth': 'H+WKgGwd6C37yjiMrTPzWG0i29LQyNWkc5EgwhMdjPB7fRZ4IqZ8AjJMQOfAEm5q/PjPN31HlA4RV/t1AmsUXidB5mP0AR6E3VCXEWw9T9n43oWldAFGSDoxn1IBtf/DE0icyrvD+j043ZVc8Ha3PHytZ3mEwMypQHDrM706hMtdJuBA1W3OosEEkC+J7orHKibD2PW36nLd8CLWW8+VEalfmNNwhbeBHHUW7WjcYYfoL60d9OBGxbnr6zrhb54NMUEnMPC3anUnua3q/46o1uA5FyTCTm46OUHUfiSLRnDduTsAUQERZYnPvd7M36kd37if4Uf6Cqi2V7E44CDfRQ==',
      })
    next();
});

app.use("/", router)

app.listen(PORT, () => {
    console.log(`The server is listening on Port: ${PORT}`);
})