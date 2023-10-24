require('dotenv').config();
const express = require("express");
// set the routes as environmental variables... 

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        "title":"DIOOL CAMEROON",
      "name": "Diool Bill payments",
        "message":"Welcome to CAD 5, please enter: ",
        "links": [
            {
            "content":"To Pay your tax",
           // "url":`${process.env.baseUrl}/enterbilltocheck`
            "url":"https://cad5-ussd.onrender.com/enterbilltocheck"
            },
            {
            "content":"To Check your tax status",
           // "url":`${process.env.baseUrl}/enterbilltocheck`
            "url":"https://cad5-ussd.onrender.com/enterbilltocheck"
            }
        ],
        "page":{
            "menu":"true",
            "history":"true",
            "navigation_keywords":"true"
        }
    })
})

router.get("/enterbilltocheck", (req, res) => {
    res.json({
        "title":"DIOOL CAMEROON",
      "name": "Diool Bill payments",
        "message":"Please enter your tax number: ",
        "form": {
           // "url": `${process.env.baseUrl}/payorexit`,
            "url": "https://cad5-ussd.onrender.com/payorexit",
            "type": "text",
            "method": "get"
        },
        "page":{
            "menu":"true",
            "history":"true",
            "navigation_keywords":"true"
        }
    })
})

router.get("/payorexit", (req, res) => {
    res.json({
        "title":"DIOOL CAMEROON",
      "name": "Diool Bill payments",
        "message":"Your tax number DIOOL237 is of amount 8999 XAF  is available for payment: ",
        "links": [
            {
            "content":"Pay my tax",
           // "url":`${process.env.baseUrl}/enterphonetopay`
            "url":"https://cad5-ussd.onrender.com/enterphonetopay"
            },
            {
            "content":"To Quit",
           // "url":`${process.env.baseUrl}/quit` 
            "url":"https://cad5-ussd.onrender.com/quit" 
            }
        ],
        "page":{
            "menu":"true",
            "history":"true",
            "navigation_keywords":"true"
        }
    })
})

router.get("/enterbilltopay", (req, res) => {
 // Paying a bill, entails checking the bill if is it available... 
})

router.get("/enterphonetopay", (req, res) => {
    res.json({
    "title":"DIOOL CAMEROON",
       "name": "Diool Bill payments",
        "message":"Please enter the phone number you want to pay with: ",
        "form": {
           // "url": `${process.env.baseUrl}/paymentrequest`,
            "url": "https://cad5-ussd.onrender.com/paymentrequest",
            "type": "text",
            "method": "get"
        },
        "page":{
            "menu":"true",
            "history":"true",
            "navigation_keywords":"true"
        }
    })
});

router.get("/paymentrequest", (req, res) => {
    res.json({
        "page":{
            "session_end":"true"
        },
        "message":"Please validate the payment request from your mobile money operator, to complete the payment" // customize messages will be useful here. 
    })
});

router.get("/quit", (req, res) => {
    res.json({
        "page":{
            "session_end":"true"
        },
        "message":"Thanks for using our service"
    })
});



module.exports = router;