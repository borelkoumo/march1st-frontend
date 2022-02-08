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

export { base64UrlEncode, base64UrlDecode, printLog, getSignInOptions };
