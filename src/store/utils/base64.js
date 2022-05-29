import { Auth } from "@aws-amplify/auth";

/**
 * Base64 url encodes an array buffer
 * @param {ArrayBuffer} arrayBuffer
 */
const base64UrlEncode = (arrayBuffer) => {
  if (!arrayBuffer || arrayBuffer.length == 0) {
    return undefined;
  }

  return btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

/**
 * Base64 url decode
 * @param {String} base64UrlString
 */
const base64UrlDecode = (base64UrlString) => {
  let input = base64UrlString.replace(/-/g, "+").replace(/_/g, "/");
  let diff = input.length % 4;
  if (!diff) {
    while (diff) {
      input += "=";
      diff--;
    }
  }
  let matob = atob(input);
  const val = Uint8Array.from(matob, (c) => c.charCodeAt(0));
  return val;
};

/**
 * Logs a object to console
 * @param {string} name object name
 * @param {string} object object
 */
function printLog(name, object) {
  if (isJSON(object)) {
    console.log(name + " --- " + JSON.stringify(object, null, 2));
  } else {
    console.log(name, object);
  }
}

function isJSON(obj) {
  return obj !== undefined && obj !== null && obj.constructor == Object;
}

function getSignInOptions(params) {
  // Copy challenge param
  const challengeParam = JSON.parse(JSON.stringify(params));
  // Extract challenge params
  const challenge = base64UrlDecode(challengeParam.challenge);
  const timeout = challengeParam.timeout;
  const rpId = challengeParam.rpId;
  // Allowed credentials is an Array
  const allowCredentials = JSON.parse(challengeParam.allowCredentials);
  printLog("allowCredentials=", allowCredentials);

  //Base64url decoding of id in allowCredentials
  if (allowCredentials instanceof Array) {
    for (let cred of allowCredentials) {
      if ("id" in cred) {
        cred.id = base64UrlDecode(cred.id);
      }
    }
  }
  const userVerification = challengeParam.userVerification;
  const extensions = JSON.parse(challengeParam.extensions);
  const sessionId = challengeParam.sessionId;
  // Create options object
  var signInOptions = {
    challenge: challenge, //challenge was generated and sent from CreateAuthChallenge lambda trigger
    rpId: rpId,
    allowCredentials: allowCredentials,
    timeout: timeout,
    userVerification: userVerification,
    extensions: extensions,
  };
  printLog("signInOptions", signInOptions);
  return signInOptions;
}

function formatFullName(string = "") {
  try {
    return string
      .trim()
      .split(" ")
      .map((e) => e[0].toUpperCase() + e.substring(1).toLowerCase())
      .join(" ");
  } catch (error) {
    return string;
  }
}

function getAuthConfig(typeUser) {
  //let typeUser = localStorage.getItem("typeUser");
  if (!typeUser) {
    throw new Error(
      "Type user cannot be null. Please provide type user in getAuthConfig()"
    );
  }
  if (typeUser === "client") {
    printLog(`in base64.js getAuthConfig: Using CLIENT user pool`);
    return {
      Auth: {
        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        // identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',

        // REQUIRED - Amazon Cognito Region
        region: process.env.VUE_APP_COGNITO_REGION,

        // OPTIONAL - Amazon Cognito Federated Identity Pool Region
        // Required only if it's different from Amazon Cognito Region
        // identityPoolRegion: 'XX-XXXX-X',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: process.env.VUE_APP_COGNITO_USER_POOL_ID,

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: process.env.VUE_APP_COGNITO_USER_POOL_CLIENT_ID,

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        // mandatorySignIn: false,

        // OPTIONAL - Configuration for cookie storage
        // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
        // cookieStorage: {
        //     // REQUIRED - Cookie domain (only required if cookieStorage is provided)
        //     domain: '.yourdomain.com',
        //     // OPTIONAL - Cookie path
        //     path: '/',
        //     // OPTIONAL - Cookie expiration in days
        //     expires: 365,
        //     // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
        //     sameSite: "strict" | "lax",
        //     // OPTIONAL - Cookie secure flag
        //     // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
        //     secure: true
        // },

        // OPTIONAL - customized storage object
        // storage: MyStorage,

        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        // authenticationFlowType: 'USER_PASSWORD_AUTH',
        authenticationFlowType: "CUSTOM_AUTH",

        // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
        // clientMetadata: { myCustomKey: 'myCustomValue' },

        // OPTIONAL - Hosted UI configuration
        // oauth: {
        //     domain: 'your_cognito_domain',
        //     scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
        //     redirectSignIn: 'http://localhost:3000/',
        //     redirectSignOut: 'http://localhost:3000/',
        //     responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
        // }
      },
    };
  } else if (typeUser === "hacker") {
    printLog(`in base64.js getAuthConfig: Using HACKER user pool`);
    return {
      Auth: {
        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        // identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',

        // REQUIRED - Amazon Cognito Region
        region: process.env.VUE_APP_COGNITO_REGION,

        // OPTIONAL - Amazon Cognito Federated Identity Pool Region
        // Required only if it's different from Amazon Cognito Region
        // identityPoolRegion: 'XX-XXXX-X',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: process.env.VUE_APP_COGNITO_HACKER_USER_POOL_ID,

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId:
          process.env.VUE_APP_COGNITO_HACKER_USER_POOL_CLIENT_ID,

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        // mandatorySignIn: false,

        // OPTIONAL - Configuration for cookie storage
        // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
        // cookieStorage: {
        //     // REQUIRED - Cookie domain (only required if cookieStorage is provided)
        //     domain: '.yourdomain.com',
        //     // OPTIONAL - Cookie path
        //     path: '/',
        //     // OPTIONAL - Cookie expiration in days
        //     expires: 365,
        //     // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
        //     sameSite: "strict" | "lax",
        //     // OPTIONAL - Cookie secure flag
        //     // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
        //     secure: true
        // },

        // OPTIONAL - customized storage object
        // storage: MyStorage,

        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        // authenticationFlowType: 'USER_PASSWORD_AUTH',
        authenticationFlowType: "CUSTOM_AUTH",

        // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
        // clientMetadata: { myCustomKey: 'myCustomValue' },

        // OPTIONAL - Hosted UI configuration
        // oauth: {
        //     domain: 'your_cognito_domain',
        //     scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
        //     redirectSignIn: 'http://localhost:3000/',
        //     redirectSignOut: 'http://localhost:3000/',
        //     responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
        // }
      },
    };
  } else {
    throw new Error(`in base64.js getAuthConfig: Invalid typeUser ${typeUser}`);
  }
}

export {
  base64UrlEncode,
  base64UrlDecode,
  printLog,
  getSignInOptions,
  formatFullName,
  getAuthConfig,
};
