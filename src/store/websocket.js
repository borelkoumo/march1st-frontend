import WebSocketClient from "./utils/WebSocketClient";
import * as WebAuthnUtils from "./utils/WebAuthnUtils";
const IS_PF_AUTH_AVAIL = WebAuthnUtils.isPlatformAuthenticatorAvailable();
let wssClient = null;
let assertionUrl = null;
/******************************************************
 * WebSocket functions
 */

 const handleSignUpWithPhone = (event) => {
    event.preventDefault();
    console.log("In function handleSignUpWithPhone");

    if (!wssClient) {
      // Loading button
      //setIsLoading(true);

      // Show message
      setProgressMsg("Openning websocket connection...");

      const client = new WebSocketClient(
        onOpenCallback,
        onConnectionIdCallback,
        onCloseCallback
      );
      // Set state value
      wssClient = client;
      //setWssClient(client);
    } else {
      console.log("WssClient already is already in state");
    }
  };
 const getAssertionUrl = (connectionId) => {
    // const currentUrl = new URL(window.location.href);
    // console.log("siteUrl = ", currentUrl.origin);
  
    // Verify if this env var exists
    if (process.env.MOBILE_URL) {
      const mobileUrl = new URL(process.env.MOBILE_URL);
      console.log("siteUrl = ", mobileUrl.origin);
  
      // Create params
      const params = {
        connectionId: connectionId,
        username: username,
        fullname: fullname,
      };
  
      // Create query string
      const queryString = new URLSearchParams(params);
  
      // create Assertion URL
      const assertionUrl = new URL(`/getassertion?${queryString}`, mobileUrl);
      console.log("Assertion URL = " + assertionUrl);
  
      return assertionUrl.toString();
    } else {
      throw new Error("process.env.MOBILE_URL is null");
    }
  }

const setProgressMsg = (message)=>{
    console.log(message);
}
export {handleSignUpWithPhone}