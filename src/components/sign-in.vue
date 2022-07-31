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
          <p class="text-center" style="font-size: 18px">
            Welcome back, {{ formatTypeUser() }} !
          </p>
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
            <div>Enter your password</div>
            <div class="q-pt-sm">
              <q-input
                dense
                type="password"
                v-model="formData.password"
                color="grey-3"
                bg-color="white"
                outlined
              />
            </div>
          </div>
          <div class="form-control">
            <q-btn
              flat
              outlined
              label="Connexion"
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

import { mapActions, mapGetters, mapState } from "vuex";
import { getSignInOptions, printLog } from "../store/utils/base64";
import WebSocketClient from "src/store/utils/WebSocketClient";

let wssClient = null;
export default {
  name: "login",
  components: { QrcodeVue },
  data() {
    return {
      formData: {
        email: "fb_program_manager1@gmail.com",
        password:"March1st@2022"
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
    typeUser: async function (val) {
      // this.setTypeUser(val);
    },
    attestationUrl: function (val) {
      // Hide spinner and Show QRCode
      this.showSpinner = false;
      this.showQrCode = true;
    },
    webSocketMsg: function (val) {
      this.webSocketMsg = val;
    },
  },
  computed: {
    ...mapState("global", ["typeUser"]),
    ...mapGetters("global", []),
  },
  methods: {
    ...mapActions("global", [
      "setTypeUser",
      "getTypeUser",
    ]),
    ...mapActions('auth',[
      "onSubmitLoginForm",
      "strapiSignIn2"
    ]),
    ...mapActions("dashboard",[
      'createUser'
    ]),

    formatTypeUser() {
      return this.typeUser.toUpperCase();
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

        //direct submission with strapi
        //await this.strapiSignIn2(this.formData);

        console.log("CognitoUser dans submitLoginForm: ",this.cognitoUser);
        //let jwtToken = this.cognitoUser.signInUserSession.idToken.jwtToken;
        //await this.createUser(jwtToken);
        this.notifyPositive(`Sucessfully logged in`);
        //printLog("Logged user", loggedUser);

        this.$router.push('/');
        this.$q.loading.hide();
      } catch (error) {
        this.notifyNegative(error.message);
      }
    },
  },

  async beforeMount() {
    console.log(`signin -- beforeMount -- this.typeUser = ${this.typeUser}`);
  },

  async mounted() {},

  unmounted() {},
};
</script>

<style scoped>
.wrap-auth {
  font-family: "nunito";
  color: #333333;
}
</style>
