require('dotenv').config();
const express = require("express");
// set the routes as environmental variables... 

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        "title":"Mairie de Douala 5ème",
      "name": "Diool Bill payments",
        "message":"Welcome to CAD 5, please enter: ",
        "links": [
            {
            "content":" To Pay your tax",
           // "url":`${process.env.baseUrl}/enterbilltocheck`
            "url":"https://cad5-ussd.onrender.com/enterbilltocheck"
            },
            {
            "content":" To Check your tax status",
           // "url":`${process.env.baseUrl}/enterbilltocheck`
            "url":"https://cad5-ussd.onrender.com/enterpaidbill"
            }
        ],
        "page":{
            "menu":"true",
            "history":"true",
            "navigation_keywords":"true"
        }
    })
})

router.get("/enterpaidbill", (req, res) => {
    res.json({
        "title":"Mairie de Douala 5ème",
      "name": "Diool Bill payments",
        "message":"Please enter your tax number: ",
        "form": {
           // "url": `${process.env.baseUrl}/payorexit`,
            "url": "https://cad5-ussd.onrender.com/billpaid",
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

router.get("/enterbilltocheck", (req, res) => {
    res.json({
        "title":"Mairie de Douala 5ème",
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
        "title":"Mairie de Douala 5ème",
      "name": "Diool Bill payments",
        "message":`M. XYZ, your tax number ${Math.floor(100000000 + Math.random() * 900000000)} of amount ${Math.floor(100000 + Math.random() * 900000)} XAF  is available for payment: `,
        "links": [
            {
            "content":" Pay my tax",
           // "url":`${process.env.baseUrl}/enterphonetopay`
            "url":"https://cad5-ussd.onrender.com/choosetelco"
            },
            {
            "content":" To Quit",
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

router.get("/choosetelco", (req, res) => {
    res.json({
        "title":"Mairie de Douala 5ème",
      "name": "Diool Bill payments",
        "message":"Choose your mobile money operator: ",
        "links": [
            {
            "content":" Orange Money",
           // "url":`${process.env.baseUrl}/enterphonetopay`
            "url":"https://cad5-ussd.onrender.com/enterphonetopay"
            },
            {
            "content":" MTN Mobile Money",
           // "url":`${process.env.baseUrl}/enterphonetopay`
            "url":"https://cad5-ussd.onrender.com/enterphonetopay"
            },
            {
            "content":" Express Union Mobile Money",
           // "url":`${process.env.baseUrl}/enterphonetopay`
            "url":"https://cad5-ussd.onrender.com/enterphonetopay"
            }
        ],
        "page":{
            "menu":"true",
            "history":"true",
            "navigation_keywords":"true"
        }
    })
})

router.get("/enterphonetopay", (req, res) => {
    res.json({
    "title":"Mairie de Douala 5ème",
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

router.get("/billpaid", (req, res) => {
    res.json({
        "page":{
            "session_end":"true"
        },
        "message":`Your tax number ${Math.floor(100000000 + Math.random() * 900000000)} of amount ${Math.floor(100000 + Math.random() * 900000)} XAF has been paid. Thank you for using our services ` // customize messages will be useful here. 
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