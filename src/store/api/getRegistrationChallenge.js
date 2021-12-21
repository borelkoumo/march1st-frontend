export default function getRegistrationChallenge(params) {
  const response = {
    "status": "ok",
    "errorMessage": "",
    "sessionId": "",
    "rp": {
        "name": "March 1st",
        "icon": "",
        "id": "app.march1st-beta.com"
    },
    "user": {
        "name": "borelkoumo",
        "icon": "",
        "id": "qPSdGnefIRkJDAobvZE7NKKjDDU8ffqffvXkiPlMSis",
        "displayName": "Borel"
    },
    "challenge": "gx2HzepVXKnynja7Dxd7-9EYr81EWYmU9Ktd5EQxkqNQgspTtdqVxfpl8J73MN68-7V-YluXRfp9pA0SRec_Gg",
    "pubKeyCredParams": [
        {
            "type": "public-key",
            "alg": -65535
        },
        {
            "type": "public-key",
            "alg": -257
        },
        {
            "type": "public-key",
            "alg": -258
        },
        {
            "type": "public-key",
            "alg": -259
        },
        {
            "type": "public-key",
            "alg": -37
        },
        {
            "type": "public-key",
            "alg": -38
        },
        {
            "type": "public-key",
            "alg": -39
        },
        {
            "type": "public-key",
            "alg": -7
        },
        {
            "type": "public-key",
            "alg": -35
        },
        {
            "type": "public-key",
            "alg": -36
        },
        {
            "type": "public-key",
            "alg": -8
        },
        {
            "type": "public-key",
            "alg": -43
        }
    ],
    "timeout": 180000,
    "excludeCredentials": [
        {
            "type": "public-key",
            "id": "aZRu8lTRaCQFy3hzL8UP8doFPIGV4vKbdRda4wS7yNM",
            "transports": [
                "usb"
            ]
        },
        {
            "type": "public-key",
            "id": "dkycNrgAMX47O7S_B0A8OyTbuy8aCE0-B8mdba5HZIQ",
            "transports": [
                "usb"
            ]
        }
    ],
    "authenticatorSelection": {
        "requireResidentKey": false,
        "userVerification": "required"
    },
    "attestation": "direct",
    "extensions": {
        "credProps": true
    }
}
return response;
}