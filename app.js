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
        'auth': 'e9DaRGHiRVLfHTCkyhBe4yrIcfmXXblaz1MZW5E3fH9+lhWKHmhJezKy/O6wQqCJfn95LmeuPpE9F4ZkbsDtDkwxdg36w0K3et2gc5coV6KQP2Swif51hoSaE1Bmd1V+jUK2RtmkIkBQjHjlmAdMgBEFuYUZtQfjDlxnuGd/keVl4KF3rpB1Pq8bwewiAXx6yLfC+2knHC1wGlC2auhZEoZwoHAR3wq5g4i8XLo446FH5MWC8lIWFuruEIUchgktINr+srsjpnatqNtP/ykAyGbUsIv/r/W9cQa89iR73tZCPue0V8d23eAzyGIjTLbDfcMlrJ9d2Z3H9S0tNmmi5Q==',
      })
    next();
});

app.use("/", router)

app.listen(PORT, () => {
    console.log(`The server is listening on Port: ${PORT}`);
})