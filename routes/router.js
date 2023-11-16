require('dotenv').config();
const express = require("express");
const ussdPages = require("../controllers/ussd_pages");
const Cache = require("node-cache");
const ussdCache = new Cache({ stdTTL: 100, deleteOnExpire: true, checkperiod: 120 });
// set the routes as environmental variables... 

const router = express.Router();

router.get("/", (req, res) => {
    console.log(req.headers.host);
    res.json({
        "title":`${process.env.pageTitle}`,
      "name": "Diool Bill payments",
        "message":"Please enter: ",
        "links": [
            {
            "content":" To Pay your Bill",
            "url":`${process.env.baseUrl}/enterbilltocheck`
           // "url":"https://cad5-ussd.onrender.com/enterbilltocheck"
            },
            {
            "content":" To Check the Status of your Bill",
            "url":`${process.env.baseUrl}/enterbilltocheck`
           //"url":"https://cad5-ussd.onrender.com/enterpaidbill"
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
        "title":`${process.env.pageTitle}`,
        "name": "Diool Bill payments",
        "message":"Please enter your Bill reference: ",
        "form": {
            "url": `${process.env.baseUrl}/payorexit`,
           // "url": "https://cad5-ussd.onrender.com/payorexit",
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

router.get("/payorexit", ussdPages.check_bill );

router.get("/choosetelco", (req, res) => {
    res.json({
      "title":`${process.env.pageTitle}`,
      "name": "Diool Bill payments",
        "message":"Choose your mobile money operator: ",
        "links": [
            {
            "content":" Orange Money",
            "url":`${process.env.baseUrl}/enterphonetopay`
            //"url":"https://cad5-ussd.onrender.com/enterphonetopay"
            },
            {
            "content":" MTN Mobile Money",
            "url":`${process.env.baseUrl}/enterphonetopay`
            //"url":"https://cad5-ussd.onrender.com/enterphonetopay"
            },
            {
            "content":" Express Union Mobile Money",
            "url":`${process.env.baseUrl}/enterphonetopay`
            //"url":"https://cad5-ussd.onrender.com/enterphonetopay"
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

    let paymentMethod = req.headers["user-entry"];

    console.log("Telco", paymentMethod);

    if (paymentMethod === 1) {
        paymentMethod = "62401"
    } else if (paymentMethod === 2) {
        paymentMethod = "62402"
    } else {
        paymentMethod = "EUMM"
    }

    ussdCache.set(paymentMethod, paymentMethod); // We have to link this to a session... We need unique keys, we don't know if there is a possibility of serveral copies existing at the same time. 

    console.log(ussdCache.get(paymentMethod));

    res.json({
       "title":`${process.env.pageTitle}`,
       "name": "Diool Bill payments",
        "message":"Please enter the phone number you want to pay with: ",
        "form": {
            "url": `${process.env.baseUrl}/paymentrequest`,
           //"url": "https://cad5-ussd.onrender.com/paymentrequest",
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

    const userMsisdn = req.headers["user-msisdn"]; // We need to look for way to uniquely identify a cache value if msisdn is not provided... 
    const phoneNumber = req.headers["user-entry"]; // Value to be used in later implementations, using aliases as unique identifiers.. 

    // if (!userMsisdn) {
    //     userMsisdn = "237677999999";
    // }

    const rfpReference = ussdCache.get(userMsisdn);
    console.log("The rfp referene is:",  ussdCache.get(userMsisdn));

    const sendPaymentRequest = async () => {

        const response = await axios.post(`https://core.diool.me/core/onlinepayment/v1/payRfp`, {
              "providerAccountID": `237${phoneNumber}`,
              "providerCode": `${ussdCache.get(paymentMethod)}`, // Checking the telco still to be implemented. 
              "requestPaymentReference": rfpReference 
          }, {
              headers: {
                  "Authorization": `${process.env.checkBillToken}`,
                  "Content-Type": "application/json",
                  "X-Beversion": "4.0.0"
              }
          });
  
          const data = await response.data;
          console.log(data);
      }

      try {

        setTimeout(() => {
            console.log("The sendPaymentRequest function was called ! ");
            sendPaymentRequest();
        }, 1000);

        return res.json({
            "page":{
                "session_end":"true"
            },
            "message": "Your request is being processed. To finalize your transaction, please dial *126# and enter your PIN code" // customize messages will be useful here. 
        }); // Message to be customized based on the Telco.... 
        
    } catch (error) {

        return res.json( {
            "page":{
                "session_end":"true"
            },
            //"message": `${error.message}`
            "message": `We were faced with an error while processing your request, please try again later`
        });

    }
});

router.get("/quit", (req, res) => {
    res.json({
        "page":{
            "session_end":"true"
        },
        "message":"Thanks for using Diool Bill Payments"
    })
});



module.exports = router;