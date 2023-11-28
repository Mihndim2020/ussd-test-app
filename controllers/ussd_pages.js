require('dotenv').config();
const axios = require("axios");
//const Cache = require("node-cache");
const refCache = require("../cache");
//const Cache = require("../cache");
//const refCache = new Cache({ stdTTL: 120, deleteOnExpire: true, checkperiod: 120 });

module.exports.check_bill = async (req, res) => {
   // let userMsisdn = req.headers["user-msisdn"]; // We will add a default value here for test in case the value is not provided by Myriad in the request headers.

    const userEntry = req.headers["user-entry"];

       // Set the value in cache. 
    refCache.set("uniqueReference", userEntry, 120); // We have to look for a way to make this unique... 

    console.log("The uniqueReferenece is like: ", refCache.get("uniqueReference"));

    let message = "";

    try {
       const response = await axios.get(`${process.env.paymentUrl}/${userEntry}`, {
        headers: {
            "Authorization": `${process.env.checkBillToken}`,
            "Content-Type": "application/json",
            "X-Beversion": "4.0.0"
        }
    });
       const data = await response.data;

       if (data.code === 404) {
        message = "Oops, the bill number entered is incorrect. Please check the bill number and try again";
        return res.json({
            "title":`${process.env.pageTitle}`,
            "name": "Diool Bill payments",
            "message":`${message}`,
            "form": {
               "url": `${process.env.baseUrl}/payorexit`,
               //"url": "https://cad5-ussd.onrender.com/payorexit",
                "type": "text",
                "method": "get"
            },
            "page":{
                "menu":"true",
                "history":"true",
                "navigation_keywords":"true"
            }
        })
       }

       if (data.code === 0 && data.result.status === "PENDING_PAYMENT" && data.result.amount > 1000000 ) {
            message = `Amount is not authorized by this payment method. Please call 650 774 040 for instructions on how to pay`;

            return res.json({
                "page":{
                    "session_end":"true"
                },
                "message": `${message}`
            });
       }

        if (data.code === 0 && data.result.status === "PENDING_PAYMENT") {
        message = `Bill From: ${data.result.sender.businessName}, \n Bill To: ${data.result.recipient.firstName}, \n Amount: ${data.result.amount}, \n For: ${data.result.paymentFor}, \n Pay before: ${new Date(data.result.expiresOn).toLocaleDateString()}`;

        res.json({
          "title":`${process.env.pageTitle}`,
          "name": "Diool Bill payments",
            "message":`${message}`,
            "links": [
                {
                "content":" Pay my Bill",
                "url":`${process.env.baseUrl}/choosetelco`
                //"url":"https://cad5-ussd.onrender.com/choosetelco"
                },
                {
                "content":" To Quit",
                "url":`${process.env.baseUrl}/quit` 
                //"url":"https://cad5-ussd.onrender.com/quit" 
                }
            ],
            "page":{
                "menu":"true",
                "history":"true",
                "navigation_keywords":"true"
            }
        })

       } 

       if (data.code === 0 && (data.result.status === "PAID" || data.result.status === "EXPIRED" || data.result.status === "CANCELLED" || data.result.status === "DRAFT") ) {
        message = `The bill with reference: ${data.result.referenceId} of amount: ${data.result.amount} XAF is ${data.result.status}. Thank you for using Diool Bills Payment`;

        res.json({
            "page":{
                "session_end":"true"
            },
            "message":`${message}`, // customize messages will be useful here. 
        })  
       }
        
  
    } catch (error) {
        res.json({
            "page":{
                "session_end":"true"
            },
            "message": `${error.message}`
            //"message": `We faced with an error while processing your request, please try again later`
        }) 
    }
} 

