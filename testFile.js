const demoData = {
    "code": 0,
    "message": "done",
    "developerMessage": null,
    "moreInfo": "www.diool.com",
    "resultType": "SUCCESS",
    "result": {
        "id": 339,
        "referenceId": "JJJEE9BP",
        "requestType": "SINGLE_CHARGE",
        "categoryId": 18,
        "category": "Autre",
        "sender": {
            "id": 340,
            "userId": "auth0|602f937da80792006a009f29",
            "parentId": "auth0|602f937da80792006a009f29",
            "firstName": "PHILIPPE HERVE",
            "lastName": "BOUPDA",
            "email": "finance.cmr@diool.com",
            "businessName": "DIOOL CAMEROON SAS",
            "businessAddress": {
                "city": {
                    "id": 16634,
                    "name": "Douala",
                    "stateId": 2662,
                    "stateCode": "LT",
                    "country": {
                        "id": 38,
                        "name": "Cameroon",
                        "iso2": "CM",
                        "iso3": "CMR",
                        "phoneCode": "+237",
                        "capital": "Yaounde",
                        "currency": "XAF"
                    },
                    "latitude": 4.04827,
                    "longitude": 9.70428
                },
                "address": "Rue 1.239 Bonapriso",
                "latitude": "4.023243907527441",
                "longitude": "9.701070789197827",
                "plusCode": null
            },
            "businessRegistration": "RC/DLA/2015/B/2195",
            "taxRegistration": "M031914539708T"
        },
        "recipient": {
            "id": 340,
            "recipientType": "EXTERNAL",
            "userId": null,
            "parentId": null,
            "notifyViaEmail": true,
            "notifyViaSms": false,
            "firstName": "Philippe",
            "lastName": "BOUPDA",
            "email": "philippe.boupda@gmail.com",
            "phoneCode": "237",
            "phoneNumber": "656560711",
            "addedToAddressBook": false,
            "addressBookId": 1953,
            "relationship": "OTHER"
        },
        "approver": null,
        "paymentFor": "Test d'un lien de paiement - RFP ou DDP",
        "status": "PENDING_PAYMENT",
        "amount": 10000000.00,
        "payDetails": [],
        "createdBy": {
            "userId": "auth0|602f937da80792006a009f29",
            "firstName": "PHILIPPE HERVE",
            "lastName": "BOUPDA",
            "email": "finance.cmr@diool.com"
        },
        "createdOn": "2023-10-18T15:48:54.243Z",
        "expiresOn": "2025-03-12T15:48:53.243Z",
        "expire": 365,
        "expireUnit": "DAYS",
        "paymentLink": "https://paywith.diool.com/pay/?token=auuffQfdaEE0O8lMW54RGyVb+sB/yx4x76Rnp9CrXgE="
    }
}

console.log(demoData.result.referenceId)