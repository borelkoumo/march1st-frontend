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

export { base64UrlEncode, base64UrlDecode, printLog };
