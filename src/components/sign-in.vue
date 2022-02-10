<template>
  <div class="wrap-auth">
    <q-card
      class="my-card bg-container"
      flat
      bordered
      style="min-width: 320px; border-radius: 3px"
    >
      <q-card-section>
        <div class="title-header q-pb-md q-pt-md">
          <p class="text-center" style="font-size: 18px">Welcome Back!</p>
        </div>
        <q-form
          @submit="submitLoginForm()"
          class="q-col-gutter-lg q-pb-sm"
          v-if="step == 1"
        >
          <div class="form-control">
            <div>Enter your email address</div>
            <div class="q-pt-sm">
              <q-input
                dense
                placeholder="johndoe@mycompany.com"
                v-model="formData.email"
                color="grey-3"
                bg-color="white"
                outlined
                autofocus
              />
            </div>
          </div>
          <div class="form-control">
            <q-btn
              flat
              outlined
              label="Passwordless Login"
              class="bg-secondary col text-white"
              no-caps
              type="submit"
              style="width: 100%; border-radius: 3px"
            />
          </div>
        </q-form>
        <q-form class="q-pb-sm" v-if="step == 2">
          <div style="max-width: 320px; margin: auto">
            <p class="text-center">
              Unable to sign in using desktop, please use your mobile phone to
              continue
            </p>
          </div>
          <div class="q-pt-lg text-center">
            <span>{{ webSocketMsg }}</span>
          </div>

          <div
            class="q-pt-md"
            style="text-align: center; margin: auto"
            v-if="showSpinner"
          >
            <q-spinner color="primary" :size="sizeQRCODE" :thickness="2" />
          </div>
          <div
            class="q-pt-md"
            style="text-align: center; margin: auto"
            v-if="showQrCode"
          >
            <qrcode-vue :value="attestationUrl" :size="sizeQRCODE"></qrcode-vue>
          </div>
        </q-form>
        <div class="q-pt-xs">
          <q-toolbar class="">
            <span>Don't have an account?</span>
            <div class="q-pl-sm">
              <q-btn
                flat
                label="Create account"
                class="text-secondary"
                no-caps
                :to="'/auth/register/' + typeUser"
              />
            </div>
          </q-toolbar>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";

import { mapActions, mapState } from "vuex";
import { getSignInOptions, printLog } from "../store/utils/base64";
import WebSocketClient from "src/store/utils/WebSocketClient";

let wssClient = null;
export default {
  name: "login",
  props: ["typeUser"], // hacker or client
  components: { QrcodeVue },
  data() {
    return {
      formData: {
        email: "borelkoumo@mailinator.com",
      },
      step: 1,
      showQrCode: false,
      sizeQRCODE: 200,
      attestationUrl: "http://example.com",
      cognitoUser: null,
      customChallengeAnswer: {},
      webSocketMsg: "Scan QR Code to start process",
      showSpinner: false,
    };
  },
  watch: {
    attestationUrl: function (val) {
      // Hide spinner
      this.showSpinner = false;
      // Show QRCode
      this.showQrCode = true;
    },
    webSocketMsg: function (val) {
      this.webSocketMsg = val;
    },
  },
  computed: {
    ...mapState("global", ["signInOptions"]),
  },
  methods: {
    ...mapActions("global", [
      "onSubmitLoginForm",
      "getCredentialInNavigator",
      "sendChallengeResult",
    ]),

    setWebSocketMsg(message) {
      printLog("WSS", message);
      this.webSocketMsg = message;
    },

    setLoadingMsg(message) {
      printLog(message);
      this.$q.loading.show({
        message: message,
      });
    },

    notifyPositive(message) {
      this.$q.loading.hide();
      this.$q.notify({
        message: message,
        type: "positive",
        position: "top",
      });
    },

    notifyNegative(message) {
      this.$q.loading.hide();
      this.$q.notify({
        message: message,
        type: "negative",
        position: "top",
        icon: "error",
      });
    },

    async submitLoginForm() {
      try {
        // Submit login form to cognito
        this.setLoadingMsg("Getting authentication challenge ...");
        this.cognitoUser = await this.onSubmitLoginForm(this.formData);
        await this.signIn();
      } catch (error) {
        this.notifyNegative(error.message);
      }
    },

    async signIn() {
      try {
        this.setLoadingMsg("Getting authentication options ...");
        const signInOptions = getSignInOptions(this.cognitoUser.challengeParam);
        const loggedUser = await this.callAuthenticator(signInOptions);
        this.notifyPositive(`Sucessfully logged in`);
        printLog("Logged user", loggedUser);
        this.$router.push("/");
      } catch (error) {
        this.notifyNegative(error.message);
        /**
         * If we are on desktop, show QR Code
         */
        if (!this.$q.platform.is.mobile) {
          // Sign in with phone
          this.step = 2;
          await this.signInWithPhone();
        } else {
          printLog("You can't use QR code because you are on mobile device");
        }
      }
    },

    async callAuthenticator(signInOptions) {
      try {
        this.setLoadingMsg("Getting credentials in browser ...");
        // Get credential from credential API
        this.customChallengeAnswer = await this.getCredentialInNavigator(
          signInOptions
        );
        this.setLoadingMsg("Sending attestation to authentication server ...");
        // Send attestation result to authentication server
        let payload = {
          user: this.cognitoUser,
          customChallengeAnswer: this.customChallengeAnswer,
        };
        const loggedUser = await this.sendChallengeResult(payload);
        printLog(`Logged user`, loggedUser);
        return loggedUser;
      } catch (error) {
        throw new Error(error);
      }
    },

    async signInWithPhone() {
      printLog("In function handleSignInWithPhone");

      /******************************************************
       * WebSocket events callbacks
       *******************************************************/
      const getAttestationUrl = (connectionId, email) => {
        // Verify if this env var exists
        if (process.env.MOBILE_URL) {
          const mobileUrl = new URL(process.env.MOBILE_URL);

          // Create params
          const params = {
            connectionId,
            email,
          };

          // Create query string
          const queryString = new URLSearchParams(params);

          // create Assertion URL
          const attestationUrl = new URL(
            `/getattestation?${queryString}`,
            mobileUrl
          );
          printLog("Attestation URL = ", attestationUrl.toString());
          return attestationUrl.toString();
        } else {
          throw new Error("process.env.MOBILE_URL is null");
        }
      };

      const onOpenCallback = () => {
        this.setWebSocketMsg("Websocket connection openned...");
      };

      const onConnectionIdCallback = (connectionId) => {
        this.setWebSocketMsg(`Connection id received : ${connectionId}`);
        // Get site URL
        const url = getAttestationUrl(connectionId, this.formData.email);
        this.attestationUrl = url;
      };

      const onCloseCallback = () => {
        this.setWebSocketMsg(`Websocket connection closed...`);
        wssClient = null;
        this.attestationUrl = null;
      };

      //change to onGetCustomChallenge
      const onGetSignInOptions = (to) => {
        printLog(`wssClient`, wssClient);
        // Send back Sign In Options
        if (wssClient) {
          this.setWebSocketMsg(`Sending signin options to phone ...`);
          wssClient.sendMessage({
            to: to,
            message: {
              nextAction: "receiveSignInOptions",
              signInOptions: this.cognitoUser.challengeParam,
            },
          });
        } else {
          throw new Error("Websocket client is null");
        }
      };

      const onSignInAttestationAvailable = async (attestation) => {
        try {
          this.setWebSocketMsg(
            `Attestation generated on phone is available ...`
          );
          this.setWebSocketMsg(
            "Sending attestation to authentication server ..."
          );
          this.setLoadingMsg(
            "Sending attestation to authentication server ..."
          );
          printLog(`Attestation`, attestation);
          /** Change this part */
          // Send attestation result to authentication server
          let payload = {
            user: this.cognitoUser,
            customChallengeAnswer: attestation,
          };
          printLog(`Custom challenge answer`, payload.customChallengeAnswer);
          const loggedUser = await this.sendChallengeResult(payload);
          //go to the home page
          this.notifyPositive(`Your are now logged in`);
          this.$router.push("/");
        } catch (error) {
          this.notifyNegative(error.message);
        }
      };

      // Show spinner
      this.showSpinner = true;
      // Show message
      this.setWebSocketMsg("Openning websocket connection...");
      const client = new WebSocketClient(
        onOpenCallback,
        onConnectionIdCallback,
        onCloseCallback,
        /**
         *  Callbacks pour le signUp
         * */
        () => {}, // onGetCredentialOptions
        () => {}, // onReceiveCredentialOptions
        () => {}, // onAttestationAvailable
        /**
         *  Callbacks pour le signIn
         * */
        onGetSignInOptions,
        () => {}, // onReceiveSignInOptions
        onSignInAttestationAvailable
      );

      // Set state value
      wssClient = client;
    },
  },

  beforeMount() {
    
  },
};
</script>

<style scoped>
.wrap-auth {
  font-family: "nunito";
  color: #333333;
}
</style>
