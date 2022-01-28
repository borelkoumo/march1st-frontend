<template>
  <q-page class="flex flex-center">
    <div class="wrap-auth">
      {{ params }}
      <q-card
        class="my-card bg-container"
        flat
        bordered
        style="min-width: 320px; border-radius: 3px"
      >
        <q-card-section>
          <div class="title-header q-pb-md q-pt-md">
            <p class="text-center" style="font-size: 18px">
              Sign up With Mobile
            </p>
          </div>
          <div>
            <div class="form-control">
              <div>Full Name</div>
              <div class="q-pt-sm">
                <q-input
                  dense
                  placeholder="Enter your full name"
                  v-model="formData.fullName"
                  color="grey-3"
                  bg-color="white"
                  outlined
                  disable
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
                  disable
                />
              </div>
            </div>
          </div>

          <q-form
            @submit="generatePublicKey"
            class="q-pb-sm q-pt-md"
            v-if="step == 1"
          >
            <div class="form-control q-mb-md">
              <q-btn
                outlined
                flat
                label="Generate public key"
                class="bg-secondary col text-white"
                no-caps
                type="submit"
                style="width: 100%; border-radius: 3px"
              />
            </div>
          </q-form>
          <div class="" v-if="step == 2">
            <div>good</div>
          </div>
          <div class="q-pt-xs" v-if="step != 2">
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
  </q-page>
</template>

<script>
import { mapActions } from "vuex";

import WebSocketClient from "src/store/utils/WebSocketClient";
import * as WebAuthnUtils from "src/store/utils/WebAuthnUtils";
const PF_AUTH_AVAIL = WebAuthnUtils.isPlatformAuthenticatorAvailable();
let wssClient = null;

const setProgressMsg = (message) => {
  console.log(message);
};

export default {
  name: "signup",
  components: {},

  data() {
    return {
      formData: {
        companyName: "Test",
        fullName: "Steve william",
        title: "Test title",
        email: "williamsteve216@gmail.com",
        typeUser: 1,
        username: "",
      },
      step: 1,
      credentialOptions: null,
      params: null,
    };
  },
  watch: {},
  methods: {
    ...mapActions("global", [
      "onSubmitSignUpForm",
      "onSubmitValidationCode",
      "callAuthenticator",
    ]),

    generatePublicKey(event) {
      /******************************************************
       * WebSocket events callbacks
       */
      const onOpenCallback = () => {
        setProgressMsg("Websocket connection openned...");
      };

      const onConnectionIdCallback = (connectionId) => {
        setProgressMsg(`My Connection ID : ${connectionId}`);
        setProgressMsg(`Connection ID received : ${this.params.connectionId}`);
        setProgressMsg(`Waiting for credentialOptions`);

        // Send message to ask credentialOptions
        if (wssClient && wssClient.isWebSocketOpenned()) {
          console.log(`Send message to ask credentialOptions`);
          wssClient.sendMessage({
            to: this.params.connectionId,
            message: { listener: "getCredentialOptions", data: {} },
          });
        }
      };

      const onCloseCallback = () => {
        setProgressMsg(`Websocket connection closed...`);
        wssClient = null;
      };

      const onReceiveCredentialOptions = (credentialOptions) => {
        setProgressMsg(
          `Credential options available : ${JSON.stringify(credentialOptions)}`
        );
      };

      event.preventDefault();
      console.log("In function handleSignUpWithPhone");

      if (!wssClient) {
        // Show message
        setProgressMsg("Openning websocket connection...");

        const client = new WebSocketClient(
          onOpenCallback,
          onConnectionIdCallback,
          onCloseCallback,
          () => {}, // onGetCredentialOptions
          onReceiveCredentialOptions
        );

        // Set state value
        wssClient = client;
      } else {
        console.log("WssClient already is already in state");
      }
    },
  },
  mounted() {
    this.params = this.$route.query;
  },
};
</script>

<style scoped>
.wrap-auth {
  font-family: "nunito";
  color: #333333;
}
</style>
