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
            v-if="formData.typeUser == 1"
          >
            Sign up for hacker
          </p>
          <p class="text-center" style="font-size: 18px" v-else>
            Sign up for client
          </p>
        </div>
        <q-form
          @submit="submitSignupForm()"
          class="q-col-gutter-sm q-pb-sm"
          v-if="step == 1"
        >
          <div class="form-control" v-if="formData.typeUser == 2">
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
          <div class="form-control" v-if="formData.typeUser == 2">
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
          <div class="form-control" v-if="formData.typeUser == 2">
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
          <div class="form-control" v-if="formData.typeUser == 1">
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
          <!-- <div class="form-control">
                        <div>Code verification</div>
                        <div class="q-pt-sm">
                            <q-input dense placeholder="Enter the code" v-model="code" color="grey-3" bg-color="white" outlined />
                        </div>
                    </div> -->
          <div class="form-control q-mb-md">
            <q-btn
              outlined
              flat
              label="Generate public key with desktop"
              class="bg-secondary col text-white"
              no-caps
              type="submit"
              style="width: 100%; border-radius: 3px"
            />
          </div>
          <div
            class="q-mt-lg form-control divider relative-position"
            style="border-bottom: 1px solid #163053"
          >
            <div
              class="absolute"
              style="width: 100%; top: -10px; text-align: center"
            >
              <div
                class="text-primary text-bold q-pl-sm q-pr-sm bg-container"
                style="max-width: max-content; margin: auto"
              >
                OR
              </div>
            </div>
          </div>
          <div class="q-pt-lg text-center">
            <span>Use mobile to generate public key</span>
          </div>
          <div class="form-control q-pt-md" v-if="showQrCode == false">
            <q-btn
              outlined
              flat
              label="Generate public key with mobile"
              class="bg-secondary col text-white"
              no-caps
              @click="signUpWithPhone"
              style="width: 100%; border-radius: 3px"
            />
          </div>
          <div
            class="q-pt-md"
            style="text-align: center; margin: auto"
            v-if="showQrCode"
          >
            <qrcode-vue :value="assertionUrl"></qrcode-vue>
          </div>
        </q-form>
        <div class="" v-if="step == 4">
          <div>good</div>
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
import { mapActions } from "vuex";

import WebSocketClient from "src/store/utils/WebSocketClient";
let wssClient = null;

export default {
  name: "login",
  props: ["typeUser"],
  components: { QrcodeVue },
  data() {
    return {
      formData: {
        companyName: "My Company",
        fullName: "Steve william",
        title: "Developer",
        email: "@mailinator.com",
        typeUser: 1,
        username: "",
      },
      showQrCode: false,
      code: null,
      credentialOptions: null,
      urlTest: null,
      step: 1,
      assertionUrl: null,
      IS_PF_AUTH_AVAIL: false,
    };
  },
  watch: {
    typeUser: function (val) {
      this.formData.typeUser = Number(val);
    },
    assertionUrl: function (val) {
      this.showQrCode = true;
    },
  },
  methods: {
    ...mapActions("global", [
      "onSubmitSignUpForm",
      "onSubmitValidationCode",
      "getCredentialOptions",
      "callAuthenticator",
      "sendAttestationResult",
    ]),

    setProgressMsg(message) {
      console.log(message);
      this.$q.loading.show({
        message: message,
      });
    },

    async submitSignupForm() {
      if (this.formData.typeUser == 2) {
        try {
          this.setProgressMsg("Submitting sign up form ...");
          const codeDeliveryDetails = await this.onSubmitSignUpForm(
            this.formData
          );
          this.$q.loading.hide();
          this.$q.notify({
            message: `An ${codeDeliveryDetails.AttributeName} has been sent to ${codeDeliveryDetails.Destination}`,
            type: "positive",
            position: "top",
          });
          this.step = 2;
        } catch (error) {
          this.$q.loading.hide();
          this.$q.notify({
            message: error.message,
            type: "negative",
            position: "top",
            icon: "error",
          });
        }
      } else {
        throw new Error(
          `Not yet implemented for this.formData.typeUser = ${this.formData.typeUser}`
        );
      }
    },

    async submitValidationCode() {
      try {
        // Check if validation code is ok
        this.setProgressMsg("Checking validation code ...");
        const message = await this.onSubmitValidationCode(this.code);
        console.log(`onSubmitValidationCode result = ${message}`);

        // Get attestation options
        this.setProgressMsg("Getting credential options ...");
        const credentialOptions = await this.getCredentialOptions();
        this.credentialOptions = credentialOptions;
        console.log(`onSubmitValidationCode result = ${message}`);

        // Show messages
        this.$q.loading.hide();
        this.$q.notify({
          message: message,
          type: "positive",
          position: "top",
        });
        this.step = 3;
      } catch (error) {
        this.$q.loading.hide();
        this.$q.notify({
          message: error.message,
          type: "negative",
          position: "top",
          icon: "error",
        });
        this.step = 2;
      }
    },

    async generatePublicKey() {
      try {
        this.setProgressMsg("Getting credential options ...");

        // Generate public key
        const attestation = await this.callAuthenticator(
          this.credentialOptions
        );
        this.setProgressMsg(
          "Public keys generated. Sending attestation to authentication server ..."
        );
        // Send attestation result to authentication server
        const userData = await this.sendAttestationResult(attestation);

        this.$q.loading.hide();
        this.$q.notify({
          message: `Account  created for user ${userData.email}. You can now sign in`,
          type: "positive",
          position: "top",
        });
        this.step = 4;
      } catch (error) {
        this.$q.loading.hide();
        this.$q.notify({
          message: error.message,
          type: "negative",
          position: "top",
        });
      }
    },

    signUpWithPhone(event) {
      event.preventDefault();
      console.log("In function handleSignUpWithPhone");

      /******************************************************
       * WebSocket events callbacks
       *******************************************************/
      const getAssertionUrl = (connectionId, email, fullName) => {
        // Verify if this env var exists
        if (process.env.MOBILE_URL) {
          const mobileUrl = new URL(process.env.MOBILE_URL);
          console.log("siteUrl = ", mobileUrl.origin);

          // Create params
          const params = {
            connectionId,
            email,
            fullName,
          };
          console.log(params);

          // Create query string
          const queryString = new URLSearchParams(params);

          // create Assertion URL
          const assertionUrl = new URL(
            `/getassertion?${queryString}`,
            mobileUrl
          );
          console.log("Assertion URL = " + assertionUrl);

          return assertionUrl.toString();
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
        const url = getAssertionUrl(
          connectionId,
          this.formData.email,
          this.formData.fullName
        );
        this.assertionUrl = url;
        this.$q.loading.hide();
      };

      const onCloseCallback = () => {
        this.setProgressMsg(`Websocket connection closed...`);
        this.$q.loading.hide();
        wssClient = null;
        this.assertionUrl = null;
      };

      const onGetCredentialOptions = (to) => {
        console.log(`wssClient = ${wssClient}`);
        // Send back credentialOptions
        if (wssClient) {
          this.setProgressMsg(`Sending credential options to phone...`);
          wssClient.sendMessage({
            to: to,
            message: {
              nextAction: "receiveCredentialOptions",
              credentialOptions: this.credentialOptions,
            },
          });
        } else {
          this.$q.loading.hide();
          throw new Error("websocket client is null or is not openned");
        }
      };

      const onAttestationAvailable = async (attestation) => {
        try {
          this.setProgressMsg(`Attestation generated on phone is available ...`);
          this.setProgressMsg("Sending attestation to authentication server ...");
          this.$q.loading.show({
            message: "Sending attestation to authentication server ...",
          });

          // Send attestation result to authentication server
          const userData = await this.sendAttestationResult(attestation);
          this.$q.loading.hide();
          this.$q.notify({
            message: `Account created for user ${userData.email}. You can now sign in`,
            type: "positive",
            position: "top",
          });
          this.step = 4;
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
          onGetCredentialOptions,
          () => {}, // onReceiveCredentialOptions
          onAttestationAvailable
        );

        // Set state value
        wssClient = client;
      } else {
        console.log("WssClient already is already in state");
      }
    },
  },

  mounted() {
    this.formData.typeUser = Number(this.typeUser);
  },
};
</script>

<style scoped>
.wrap-auth {
  font-family: "nunito";
  color: #333333;
}
</style>
