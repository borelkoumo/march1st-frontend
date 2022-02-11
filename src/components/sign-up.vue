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
          <p
            class="text-center"
            style="font-size: 18px"
            v-if="typeUser == 'hacker'"
          >
            Sign up for hacker
          </p>
          <p class="text-center" style="font-size: 18px" v-else>
            Sign up for client
          </p>
        </div>
        <q-form
          @submit="submitSignUpForm()"
          class="q-col-gutter-sm q-pb-sm"
          v-if="step == 1"
        >
          <div class="form-control" v-if="typeUser == 'client'">
            <div>Company Name</div>
            <div class="q-pt-sm">
              <q-input
                dense
                placeholder="Enter your company name"
                v-model="formData.companyName"
                color="grey-3"
                bg-color="white"
                outlined
              />
            </div>
          </div>
          <div class="form-control" v-if="typeUser == 'client'">
            <div>Full Name</div>
            <div class="q-pt-sm">
              <q-input
                dense
                placeholder="Enter your full name"
                v-model="formData.fullName"
                color="grey-3"
                bg-color="white"
                outlined
              />
            </div>
          </div>
          <div class="form-control" v-if="typeUser == 'client'">
            <div>Title</div>
            <div class="q-pt-sm">
              <q-input
                dense
                placeholder="Enter your title"
                v-model="formData.title"
                color="grey-3"
                bg-color="white"
                outlined
              />
            </div>
          </div>
          <div class="form-control" v-if="typeUser == 'hacker'">
            <div>Username/Pseudonym</div>
            <div class="q-pt-sm">
              <q-input
                dense
                placeholder="Enter your username"
                v-model="formData.username"
                color="grey-3"
                bg-color="white"
                outlined
              />
            </div>
          </div>
          <div class="form-control">
            <div>Email</div>
            <div class="q-pt-sm">
              <q-input
                dense
                placeholder="Enter your email"
                v-model="formData.email"
                color="grey-3"
                bg-color="white"
                outlined
              />
            </div>
          </div>
          <div class="form-control">
            <q-btn
              outlined
              flat
              label="Check my email"
              class="bg-secondary col text-white"
              no-caps
              type="submit"
              style="width: 100%; border-radius: 3px"
            />
          </div>
        </q-form>
        <q-form
          @submit="submitValidationCode()"
          class="q-col-gutter-lg q-pb-sm"
          v-if="step == 2"
        >
          <div class="form-control">
            <div>Enter validation code</div>
            <div class="q-pt-sm">
              <q-input
                dense
                placeholder="Enter the code"
                v-model="code"
                color="grey-3"
                bg-color="white"
                outlined
                autofocus
              />
            </div>
          </div>
          <div class="form-control">
            <q-btn
              outlined
              flat
              label="Check the code"
              class="bg-secondary col text-white"
              no-caps
              type="submit"
              style="width: 100%; border-radius: 3px"
            />
          </div>
        </q-form>
        <q-form @submit="generatePublicKey()" class="q-pb-sm" v-if="step == 3">
          <div style="max-width: 320px; margin: auto">
            <p class="text-center">
              Unable to signup using desktop, please use your mobile phone to
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
            <qrcode-vue :value="assertionUrl" :size="sizeQRCODE"></qrcode-vue>
          </div>
        </q-form>
        <div class="" v-if="step == 4">
          <div>Step 4</div>
        </div>
        <div class="q-pt-xs" v-if="step != 4">
          <q-toolbar class="">
            <span>Already have an account?</span>
            <div class="q-pl-sm">
              <q-btn
                flat
                label="Sign in"
                class="text-secondary"
                no-caps
                to="/auth/login"
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
import { mapActions, mapGetters } from "vuex";

import WebSocketClient from "src/store/utils/WebSocketClient";
import { isPlatformAuthenticatorAvailable } from "src/store/utils/WebAuthnUtils";
import { printLog } from "src/store/utils/base64";
let wssClient = null;

export default {
  name: "login",
  components: { QrcodeVue },
  data() {
    return {
      formData: {
        companyName: "My Company",
        fullName: "Steve William",
        title: "Developer",
        email: "borelkoumo@mailinator.com",
        username: "",
      },
      showQrCode: false,
      sizeQRCODE: 200,
      code: null,
      credentialOptions: null,
      step: 1,
      assertionUrl: "example.com",
      webSocketMsg: "Scan QR Code to start process",
      showSpinner: false,
      typeUser:""
    };
  },
  watch: {
     typeUser: function (val) {
       this.setTypeUser(val);
     },
    assertionUrl: function (val) {
      // Hide spinner
      this.showSpinner = false;
      // Show QR Code
      this.showQrCode = true;
    },
    webSocketMsg: function (val) {
      this.webSocketMsg = val;
    },
  },
  computed:{
    ...mapGetters("global",["getTypeUser"])
  },
  methods: {
    ...mapActions("global", [
      "onSubmitSignUpForm",
      "onSubmitSignUpFormHacker",
      "onSubmitValidationCode",
      "getCredentialOptions",
      "callAuthenticator",
      "sendAttestationResult",
      "setTypeUser"
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

    async submitSignUpForm() {
      if (this.typeUser == "client") {
        try {
          this.setLoadingMsg("Submitting sign up form ...");
          const codeDeliveryDetails = await this.onSubmitSignUpForm(
            this.formData
          );
          const { AttributeName, Destination } = codeDeliveryDetails;
          this.notifyPositive(
            `An ${AttributeName} has been sent to ${Destination}`
          );
          this.step = 2;
        } catch (error) {
          this.notifyNegative(error.message);
        }
      } else if (this.typeUser == "hacker") {
        try {
          this.setLoadingMsg("Submitting sign up form ...");
          const codeDeliveryDetails = await this.onSubmitSignUpFormHacker(
            this.formData
          );
          const { AttributeName, Destination } = codeDeliveryDetails;
          this.notifyPositive(
            `An ${AttributeName} has been sent to ${Destination}`
          );
          this.step = 2;
        } catch (error) {
          this.notifyNegative(error.message);
        }
      } else {
        this.notifyNegative(`Unknown user type : ${this.typeUser}`);
        throw new Error(`Unknown user type : ${this.typeUser}`);
      }
    },

    async submitValidationCode() {
      try {
        // Check if validation code is ok
        this.setLoadingMsg("Checking validation code ...");
        const message = await this.onSubmitValidationCode(this.code);
        printLog(`onSubmitValidationCode result = ${message}`);

        // Get attestation options
        this.setLoadingMsg("Getting credential options ...");
        this.credentialOptions = await this.getCredentialOptions();
        printLog(`getCredentialOptions result = ${this.credentialOptions}`);

        // Show messages
        this.notifyPositive(message);
        if (
          !isPlatformAuthenticatorAvailable() &&
          !this.$q.platform.is.mobile
        ) {
          await this.signUpWithPhone();
        } else {
          //on lance une fois le processus
          await this.generatePublicKey();
        }
      } catch (error) {
        this.step = 2;
        this.notifyNegative(error.message);
      }
    },

    async generatePublicKey() {
      try {
        this.setLoadingMsg("Getting credential options ...");

        // Generate public key
        const attestation = await this.callAuthenticator(
          this.credentialOptions
        );
        this.setLoadingMsg(
          "Public keys generated. Sending attestation to authentication server ..."
        );
        // Send attestation result to authentication server
        const userData = await this.sendAttestationResult(attestation);
        this.notifyPositive(
          `Account  created for user ${userData.email}. You can now sign in`
        );
        this.$router.push("/auth/login");
      } catch (error) {
        this.notifyNegative(error.message);
        // signup with phone
        this.step = 3;
        await this.signUpWithPhone();
      }
    },

    async signUpWithPhone() {
      this.setWebSocketMsg("In function handleSignUpWithPhone");

      /******************************************************
       * WebSocket events callbacks
       *******************************************************/
      const getAssertionUrl = (connectionId, email, fullName) => {
        // Verify if this env var exists
        if (process.env.MOBILE_URL) {
          const mobileUrl = new URL(process.env.MOBILE_URL);
          printLog("siteUrl = ", mobileUrl.origin);

          // Create params
          const params = {
            connectionId,
            email,
            fullName,
          };
          printLog("Params", params);

          // Create query string
          const queryString = new URLSearchParams(params);

          // create Assertion URL
          const assertionUrl = new URL(
            `/getassertion?${queryString}`,
            mobileUrl
          );
          printLog("Assertion URL", assertionUrl);

          return assertionUrl.toString();
        } else {
          throw new Error("process.env.MOBILE_URL is null");
        }
      };

      const onOpenCallback = () => {
        this.setWebSocketMsg("Websocket connection openned...");
      };

      const onConnectionIdCallback = (connectionId) => {
        this.setWebSocketMsg(`Please scan QR (ID : ${connectionId})`);
        // Get site URL
        const url = getAssertionUrl(
          connectionId,
          this.formData.email,
          this.formData.fullName
        );
        this.assertionUrl = url;
        this.$q.loading.hide();
      };

      const onCloseCallback = () => {
        this.setWebSocketMsg(`Websocket connection closed...`);
        this.$q.loading.hide();
        wssClient = null;
        this.assertionUrl = null;
      };

      const onGetCredentialOptions = (to) => {
        printLog(`wssClient = ${wssClient}`);
        // Send back credentialOptions
        if (wssClient) {
          this.setWebSocketMsg(`Sending credential options to phone...`);
          wssClient.sendMessage({
            to: to,
            message: {
              nextAction: "receiveCredentialOptions",
              credentialOptions: this.credentialOptions,
            },
          });
          this.setWebSocketMsg(`Credential options sent to phone...`);
        } else {
          this.$q.loading.hide();
          throw new Error("websocket client is null or is not openned");
        }
      };

      const onSignUpAttestationAvailable = async (attestation) => {
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
          // Send attestation result to authentication server
          const userData = await this.sendAttestationResult(attestation);
          this.notifyPositive(
            `Account created for user ${userData.email}. You can now sign in`
          );
          //on ouvre le login
          this.$router.push("/auth/login");
        } catch (error) {
          this.setWebSocketMsg(error.message);
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
        onGetCredentialOptions,
        () => {}, // onReceiveCredentialOptions
        onSignUpAttestationAvailable,
        /**
         *  Callbacks pour le signIn
         * */
        () => {}, // onGetSignInOptions
        () => {}, // onReceiveSignInOptions
        () => {} // onSignInAttestationAvailable
      );

      // Set state value
      wssClient = client;
    },
  },
  beforeMount(){
    this.typeUser=this.getTypeUser;
  },
  mounted() {
    
  },
};
</script>

<style scoped>
.wrap-auth {
  font-family: "nunito";
  color: #333333;
}
</style>
