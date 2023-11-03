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
        'auth': `${process.env.auth}`,
      })
    next();
});

app.use("/", router)

app.listen(PORT, () => {
    console.log(`The server is listening on Port: ${PORT}`);
});