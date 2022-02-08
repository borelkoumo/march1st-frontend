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
          @submit="login()"
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
            <span>Use mobile to continue</span>
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
                to="/auth/register/2"
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
import { mapActions, mapGetters, mapState } from "vuex";
import { base64UrlDecode, printLog } from "../store/utils/base64";
import WebSocketClient from "src/store/utils/WebSocketClient";
let wssClient = null;
export default {
  name: "login",
  components: { QrcodeVue },
  data() {
    return {
      formData: {
        email: "william46@mailinator.com",
      },
      step: 1,
      showQrCode: false,
      sizeQRCODE: 200,
      attestationUrl: "http://example.com",
      cognitoUser: null,
      customChallengeAnswer: {},
    };
  },
  watch: {
    attestationUrl: function (val) {
      this.showQrCode = true;
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
    setProgressMsg(message) {
      console.log(message);
      /*this.$q.loading.show({
        message: message,
      });*/
    },

    async login() {
      this.$q.loading.show({
        message: "Getting sign in authentication challenge ...",
      });
      try {
        // Submit login form to cognito
        this.cognitoUser = await this.onSubmitLoginForm(this.formData);
        this.$q.loading.show({
          message: `Sign in authentication challenge available ...`,
        });
        const signInOptions = this.getSignInOptions(
          this.cognitoUser.challengeParam
        );
        await this.signIn(signInOptions);
        this.$q.loading.hide();
        this.$router.push("/");
      } catch (error) {
        this.$q.loading.hide();
        this.$q.notify({
          message: error.message,
          type: "negative",
          position: "top",
          icon: "error",
        });
        console.log("Ici");
        // signin with phone
        await this.signInWithPhone();
        this.showQrCode = true;
        this.step = 2;
      }
    },

    async signIn(signInOptions) {
      try {
        this.setProgressMsg("Getting credentials ...");
        // Get credential from credential API
        this.customChallengeAnswer = await this.getCredentialInNavigator(
          signInOptions
        );
        this.setProgressMsg(
          "We have Challenge. Sending attestation to authentication server ..."
        );
        // Send attestation result to authentication server
        let payload = {
          user: this.cognitoUser,
          customChallengeAnswer: this.customChallengeAnswer,
        };
        const loggedUser = await this.sendChallengeResult(payload);
        return loggedUser;
      } catch (error) {
        throw new Error(error);
      }
    },

    getSignInOptions(params) {
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
      // allowCredentials.id = base64UrlDecode(allowCredentials.id);
      const userVerification = challengeParam.userVerification;
      const extensions = JSON.parse(challengeParam.extensions);
      const sessionId = challengeParam.sessionId;
      // Call navigator.credential.create
      var signInOptions = {
        challenge: challenge, //challenge was generated and sent from CreateAuthChallenge lambda trigger
        rpId: rpId,
        allowCredentials: allowCredentials,
        timeout: timeout,
        userVerification: userVerification,
        extensions: extensions,
      };
      printLog("signInOptions", signInOptions);
      printLog(`End in 'onSubmitLoginForm'`);
      return signInOptions;
    },

    async signInWithPhone() {
      console.log("In function handleSignInWithPhone");

      /******************************************************
       * WebSocket events callbacks
       *******************************************************/
      const getAttestationUrl = (connectionId, email) => {
        // Verify if this env var exists
        if (process.env.MOBILE_URL) {
          const mobileUrl = new URL(process.env.MOBILE_URL);
          console.log("siteUrl = ", mobileUrl.origin);

          // Create params
          const params = {
            connectionId,
            email,
          };
          console.log(params);

          // Create query string
          const queryString = new URLSearchParams(params);

          // create Assertion URL
          const attestationUrl = new URL(
            `/getattestation?${queryString}`,
            mobileUrl
          );
          console.log("Attestation URL = " + attestationUrl);

          return attestationUrl.toString();
        } else {
          throw new Error("process.env.MOBILE_URL is null");
        }
      };

      const onOpenCallback = () => {
        this.setProgressMsg("Websocket connection openned...");
      };

      const onConnectionIdCallback = (connectionId) => {
        this.setProgressMsg(`Connection id received : ${connectionId}`);
        // Get site URL
        const url = getAttestationUrl(connectionId, this.formData.email);
        this.attestationUrl = url;
        this.$q.loading.hide();
      };

      const onCloseCallback = () => {
        this.setProgressMsg(`Websocket connection closed...`);
        this.$q.loading.hide();
        wssClient = null;
        this.attestationUrl = null;
      };

      //change to onGetCustomChallenge
      const onGetSignInOptions = (to) => {
        console.log(`wssClient = ${wssClient}`);
        // Send back Sign In Options
        if (wssClient) {
          this.setProgressMsg(`Sending challenge parameters to phone ...`);
          wssClient.sendMessage({
            to: to,
            message: {
              nextAction: "receiveSignInOptions",
              signInOptions: this.getSignInOptions(
                this.cognitoUser.challengeParam
              ),
            },
          });
        } else {
          throw new Error("Websocket client is null");
        }
      };

      const onSignInAttestationAvailable = async (attestation) => {
        try {
          this.setProgressMsg(
            `Attestation generated on phone is available ...`
          );
          this.setProgressMsg(
            "Sending attestation to authentication server ..."
          );
          this.$q.loading.show({
            message: "Sending attestation to authentication server ...",
          });
          console.log(attestation);
          /** Change this part */
          // Send attestation result to authentication server
          let payload = {
            user: this.cognitoUser,
            customChallengeAnswer: attestation,
          };
          console.log("je suis ici");
          console.log(`La valeur du payload: ${payload.customChallengeAnswer}`);
          const loggedUser = await this.sendChallengeResult(payload);
          //go to the home page
          this.$router.push("/");
          this.$q.loading.hide();
          this.$q.notify({
            //message: `Your are now logged in`,
            message: loggedUser,
            type: "positive",
            position: "top",
          });
        } catch (error) {
          this.$q.loading.hide();
          this.$q.notify({
            message: error.message,
            type: "negative",
            position: "top",
          });
        }
      };

      if (!wssClient) {
        // Show message
        this.setProgressMsg("Openning websocket connection...");
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
      } else {
        console.log("WssClient already is already in state");
      }
    },
  },
};
</script>

<style scoped>
.wrap-auth {
  font-family: "nunito";
  color: #333333;
}
</style>
