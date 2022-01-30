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
                  v-model="params.fullName"
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
                  v-model="params.email"
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
let wssClient = null;

export default {
  name: "signup",
  components: {},

  data() {
    return {
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

    setProgressMsg(message) {
      console.log(message);
      this.$q.loading.show({
        message: message,
      });
    },

    generatePublicKey(event) {
      event.preventDefault();
      console.log("In function generatePublicKey");

      /******************************************************
       * WebSocket events callbacks
       *******************************************************/
      const onOpenCallback = () => {
        setProgressMsg("Websocket connection openned...");
      };

      const onConnectionIdCallback = (connectionId) => {
        console.log(`My Connection ID : ${connectionId}`);

        // Send message to ask credentialOptions
        if (wssClient) {
          setProgressMsg(
            `Connection established. Waiting for credentialOptions...`
          );
          wssClient.sendMessage({
            to: this.params.connectionId,
            message: { nextAction: "getCredentialOptions", data: {} },
          });
        } else {
          this.$q.loading.hide();
          throw new Error("websocket client is null or is not openned");
        }
      };

      const onCloseCallback = () => {
        setProgressMsg(`Websocket connection closed !`);
        this.$q.loading.hide();
        wssClient = null;
      };

      const onReceiveCredentialOptions = async (credentialOptions) => {
        setProgressMsg(
          `Credential options available. Public key generation...`
        );
        this.credentialOptions = credentialOptions;

        try {
          // Generate public key with available credential options
          const attestation = await this.callAuthenticator(
            this.credentialOptions
          );

          // Send back info to desktop view
          if (wssClient) {
            setProgressMsg("Sending back public keys to caller ...");
            wssClient.sendMessage({
              to: this.params.connectionId,
              message: {
                nextAction: "onAttestationAvailable",
                attestation: { ...attestation },
              },
            });
            this.$q.loading.hide();
            this.$q.notify({
              message: `Public key generated for user ${this.params.email}. Thank you`,
              type: "positive",
              position: "top",
            });
            // Do the correct action here
            console.error(
              `William stp corrige this.step=3 avec la bonne action a faire`
            );
            this.step = 3;
            setTimeout(() => {
              window.close();
            }, 5000);
          } else {
            this.$q.loading.hide();
            throw new Error("Websocket client is null");
          }
        } catch (error) {
          this.$q.loading.hide();
          this.$q.notify({
            message: error.message,
            type: "negative",
            position: "top",
          });
          throw new Error(error);
        }
      };

      if (!wssClient) {
        // Show message
        setProgressMsg("Openning websocket connection...");
        wssClient = new WebSocketClient(
          onOpenCallback,
          onConnectionIdCallback,
          onCloseCallback,
          () => {}, // onGetCredentialOptions
          onReceiveCredentialOptions,
          () => {} // onAttestationAvailable
        );
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
