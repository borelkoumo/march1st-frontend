import { boot } from "quasar/wrappers";
import axios from "axios";
// const { CONFIG } = require("../../appConfig");

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
//const api = axios.create({ baseURL: 'https://api.example.com' })
// const api = axios.create({
//   baseURL: "https://6lnymbzvpa.execute-api.us-east-1.amazonaws.com/v1",
// });
const webAuthnServer = axios.create({
  /* baseURL: `${CONFIG.PROTOCOL}://${CONFIG.RPID}:${CONFIG.WEBAUTHN_PORT}/rpbackend`, */
<<<<<<< HEAD
  baseURL: "https://backend.march1st.com/rpbackend",
=======
  baseURL:process.env.VUE_APP_RP_BACKEND
>>>>>>> 5f5aeb49148a884c23bf08b1d129919c124b769f
});

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  // app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  app.config.globalProperties.$server = webAuthnServer;
});

export { webAuthnServer };
