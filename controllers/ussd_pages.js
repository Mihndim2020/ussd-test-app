require('dotenv').config();
const axios = require("axios");

module.exports.check_bill = async (req, res) => {
    let message = "";
    const userEntry = req.headers["user-entry"];
    try {
       const response = await axios.get(`https://core.diool.com/core/onlinepayment/v1/payment/${userEntry}`, {
        headers: {
            "Authorization": `${process.env.checkBillToken}`,
            "Content-Type": "application/json",
            "X-Beversion": "4.0.0"
        }
    });
       const data = await response.data;

       if (data.code === 404) {
        message = "Oups, the bill/tax number entered can not be found, please check the number and try again";
       }

        if (data.code === 0 && data.result.status === "PENDING_PAYMENT") {
        message = `M./Ms ${data.result.sender.recipient.lastName}, your bill ${data.result.referenceId} of amount: ${data.result.amount} is pending payment. Please you have ${data.result.expire} ${data.result.expire} left to settle your bill`
       } 

       if (data.code === 0 && data.result.status !== "PENDING_PAYMENT" ) {
        message = `M./Ms ${data.result.sender.recipient.lastName}, your bill ${data.result.referenceId} of amount: ${data.result.amount} is has been paid. Thank you for using Diool`  
       }
        
        res.json({
        "title":"Mairie de Douala 5ème",
      "name": "Diool Bill payments",
        "message":`${message}`,
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
    } catch (error) {
        res.json({
            "page":{
                "session_end":"true"
            },
            "message": `${error.message}, ${userEntry}`
            //"message": `We faced with an error while processing your request, please try again later`
        }) 
    }
} 

