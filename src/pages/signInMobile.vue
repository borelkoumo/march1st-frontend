<template>
  <q-page class="flex flex-center">
    <div class="wrap-auth">
      <!-- {{ params }} -->
      <q-card
        class="my-card bg-container"
        flat
        bordered
        style="min-width: 320px; border-radius: 3px"
      >
        <q-card-section>
          <div class="title-header q-pb-md q-pt-md">
            <p class="text-center" style="font-size: 18px">
              Sign in With Mobile
            </p>
          </div>
          <div>
            <q-form
              @submit="signIn"
              class="q-col-gutter-lg q-pb-sm"
              v-if="step == 1"
            >
              <div class="form-control">
                <div>Your email address</div>
                <div class="q-pt-sm">
                  <q-input
                    dense
                    disable
                    placeholder="johndoe@mycompany.com"
                    v-model="params.email"
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
                  label="Continue"
                  class="bg-secondary col text-white"
                  no-caps
                  type="submit"
                  style="width: 100%; border-radius: 3px"
                />
              </div>
            </q-form>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";

import WebSocketClient from "src/store/utils/WebSocketClient";
let wssClient = null;

export default {
  name: "signin",
  components: {},

  data() {
    return {
      step: 1,
      credentialOptions: null,
      params: null,
      cognitoUser: null,
      customChallengeAnswer: {},
      signInOptions: null,
    };
  },
  watch: {},
  methods: {
    ...mapActions("global", ["onSubmitLoginForm", "getCredentialInNavigator"]),

    setProgressMsg(message) {
      console.log(message);
      this.$q.loading.show({
        message: message,
      });
    },

    signIn(event) {
      event.preventDefault();
      console.log("In function signIn");

      /******************************************************
       * WebSocket events callbacks
       *******************************************************/
      const onOpenCallback = () => {
        this.setProgressMsg("Websocket connection openned...");
      };

      const onConnectionIdCallback = (connectionId) => {
        console.log(`My Connection ID : ${connectionId}`);

        // Send message to ask cognitoUser
        this.setProgressMsg(
          `Connection established. Waiting for cognitoUser...`
        );
        if (wssClient) {
          wssClient.sendMessage({
            to: this.params.connectionId,
            message: { nextAction: "getSignInOptions", data: {} },
          });
        } else {
          throw new Error("Websocket client is null");
        }
      };

      const onCloseCallback = () => {
        this.setProgressMsg(`Websocket connection closed !`);
        this.$q.loading.hide();
        wssClient = null;
      };

      const onReceiveSignInOptions = async (signInOptions) => {
        this.setProgressMsg(
          `SignIn options available. Getting attestation ...`
        );
        console.log(signInOptions);
        return true;
      };
      // Show message
      this.setProgressMsg("Openning websocket connection...");

      wssClient = new WebSocketClient(
        onOpenCallback,
        onConnectionIdCallback,
        onCloseCallback,
        /**
         *  Callbacks pour le signUp
         * */
        () => {}, // onGetCredentialOptions
        () => {}, // onReceiveCredentialOptions
        () => {}, // onsignUpAttestationAvailable
        /**
         *  Callbacks pour le signIn
         * */
        () => {}, // onGetSignInOptions
        onReceiveSignInOptions,
        () => {} // onSignInAttestationAvailable
      );
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
