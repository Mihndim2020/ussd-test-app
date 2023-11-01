require('dotenv').config();
const axios = require("axios");

module.exports.check_bill = async (req, res) => {
    const userEntry = req.headers["user-entry"];
    try {
       const response = await axios.post(`https://core.diool.com/core/onlinepayment/v1/payment/${userEntry}`, {
        headers: {
            Authorization: `${process.env.checkBillToken}`,
        }
    });
       const data = await response.data;
       console.log(data);
        
    } catch (error) {
        
    }
} 

