<template>
  <q-page class="bg-login flex" v-if="$route.name == 'login'">
    <div class="content">
      <div
        class="item"
        style="
          padding-right: 10px;
          padding-left: 10px;
          max-width: 500px;
          margin: auto;
          min-width: 310px;
        "
      >
        <div
          class="q-pt-md q-pb-lg q-pl-sm q-pr-sm flex flex-center title-item"
          style=""
        >
          Authenticate Yourself
        </div>
        <div
          class="flex flex-center"
          style="border-radius: 15px; border: 2px solid #26a69a"
        >
          <div class="border-content flex flex-center q-pa-lg bg-white">
            <div class="gabarit-login top-avatar flex flex-center">
              <q-avatar
                size="100px"
                font-size="52px"
                text-color="secondary"
                icon="person"
                class="absolute-avatar"
              />
            </div>
            <div
              class="gabarit-login toolbar-input-container row no-wrap"
              style=""
            >
              <q-btn
                class="toolbar-input-btn"
                text-color="secondary"
                icon="person"
                unelevated
              />
              <q-input
                dense
                outlined
                v-model="username"
                placeholder="Your username"
                class="bg-white col input-container"
                color="secondary"
                autofocus
              />
            </div>
            <div
              class="gabarit-login toolbar-input-container row no-wrap"
              style="margin-top: 20px"
            >
              <q-btn
                class="toolbar-input-btn"
                text-color="secondary"
                icon="fingerprint"
                unelevated
              />
              <q-btn
                dense
                outlined
                label="Passwordless Login"
                class="bg-secondary col text-white"
                color="secondary"
                no-caps
                style="border: 1px solid #eee"
                @click="login()"
              />
            </div>
            <div class="gabarit-login q-pt-md bottom-login">
              <q-toolbar class="text-secondary">
                <span>Are you a new user ?</span>
                <div class="q-pl-sm">
                  <q-btn flat label="Sign up" no-caps to="/auth/register" />
                </div>
              </q-toolbar>
            </div>
          </div>
        </div>
      </div>
      <div class="description flex flex-center item" style="text-align: center">
        <q-img src="plan-de-travail-2.png" />
      </div>
    </div>
  </q-page>
  <q-page class="bg-login flex flex-center q-pb-lg" v-else>
    <div class="content">
      <div class="q-pl-sm q-pr-sm">
        <div
          class="q-pt-md q-pb-lg flex flex-center title-item q-pl-sm q-pr-sm"
          style=""
        >
          Create an account
        </div>
        <div
          class="flex flex-center"
          style="
            max-width: 500px;
            min-width: 310px;
            margin: auto;
            border-radius: 15px;
            border: 2px solid #26a69a;
          "
          v-if="step != 4"
        >
          <div
            class="border-content flex flex-center item bg-white"
            style="width: 100%"
          >
            <q-stepper
              v-model="step"
              animated
              class=""
              :contracted="contractStep"
              flat
              style="width: 100%; border-radius: 10px"
              alternative-labels
              color="secondary"
              done-color="positive"
              active-color="secondary"
              inactive-color="grey"
            >
              <q-step
                :name="1"
                title="Identification"
                icon="person"
                :done="step > 1"
              >
                <div class="gabarit-login top-avatar flex flex-center">
                  <q-avatar
                    size="100px"
                    font-size="52px"
                    text-color="secondary"
                    icon="person"
                    class="absolute-avatar"
                  />
                </div>
                <div
                  class="gabarit-login toolbar-input-container row no-wrap"
                  style=""
                >
                  <q-btn
                    class="toolbar-input-btn"
                    text-color="secondary"
                    icon="person"
                    unelevated
                  />
                  <q-input
                    dense
                    outlined
                    v-model="username"
                    placeholder="Your username"
                    class="bg-white col input-container"
                    color="secondary"
                    autofocus
                  />
                </div>
                <div
                  class="gabarit-login toolbar-input-container row no-wrap"
                  style="margin-top: 20px"
                >
                  <q-btn
                    class="toolbar-input-btn"
                    text-color="secondary"
                    icon="person"
                    unelevated
                  />
                  <q-input
                    dense
                    outlined
                    v-model="fullName"
                    placeholder="Your Fullname"
                    class="bg-white col input-container"
                    color="secondary"
                  />
                </div>
                <div
                  class="gabarit-login toolbar-input-container row no-wrap"
                  style="margin-top: 20px"
                >
                  <q-btn
                    class="toolbar-input-btn"
                    text-color="secondary"
                    icon="mail"
                    unelevated
                  />
                  <q-input
                    dense
                    outlined
                    v-model="email"
                    placeholder="Your email"
                    class="bg-white col input-container"
                    color="secondary"
                  />
                </div>
                <div
                  class="gabarit-login toolbar-input-container row no-wrap"
                  style="margin-top: 20px"
                >
                  <q-btn
                    class="toolbar-input-btn"
                    text-color="secondary"
                    icon="fingerprint"
                    unelevated
                  />
                  <q-btn
                    dense
                    outlined
                    label="Check my email"
                    class="bg-secondary col text-white"
                    color="secondary"
                    no-caps
                    style="border: 1px solid #eee"
                    @click="register()"
                  />
                </div>
                <div class="gabarit-login q-pt-md bottom-login">
                  <q-toolbar class="text-secondary">
                    <span>Do you already have an account?</span>
                    <div class="q-pl-sm">
                      <q-btn flat label="Signin" no-caps to="/auth/login" />
                    </div>
                  </q-toolbar>
                </div>
              </q-step>

              <q-step
                :name="2"
                title="Verification"
                icon="mail"
                :done="step > 2"
              >
                <div class="gabarit-login top-avatar flex flex-center">
                  <q-avatar
                    size="100px"
                    font-size="52px"
                    text-color="secondary"
                    icon="mail"
                    class="absolute-avatar"
                  />
                </div>
                <div
                  class="gabarit-login toolbar-input-container row no-wrap"
                  style=""
                >
                  <q-btn
                    class="toolbar-input-btn"
                    text-color="secondary"
                    icon="pin"
                    unelevated
                  />
                  <q-input
                    dense
                    outlined
                    ref="code"
                    v-model="code"
                    label="Enter the 6-digit code"
                    class="bg-white col input-container"
                    color="secondary"
                    autofocus
                  />
                </div>
                <div
                  class="gabarit-login toolbar-input-container row no-wrap"
                  style="margin-top: 20px"
                >
                  <q-btn
                    class="toolbar-input-btn"
                    text-color="secondary"
                    icon="mark_email_read"
                    unelevated
                  />
                  <q-btn
                    dense
                    outlined
                    label="Verify Code"
                    class="bg-secondary col text-white"
                    color="secondary"
                    no-caps
                    style="border: 1px solid #eee"
                    @click="verifyCode()"
                  />
                </div>
                <div class="gabarit-login q-pt-md bottom-login">
                  <q-toolbar class="text-secondary">
                    <span>didn't received code?</span>
                    <div class="q-pl-sm">
                      <q-btn flat label="Resend" no-caps to="/" />
                    </div>
                  </q-toolbar>
                </div>
                <!--<q-stepper-navigation>-->
                <!--<q-btn @click="step = 4" color="primary" label="Continue" />-->
                <!--<q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />-->
                <!--</q-stepper-navigation>-->
              </q-step>

              <q-step :name="3" title="MFA" icon="vpn_key">
                <div class="gabarit-login top-avatar flex flex-center">
                  <q-avatar
                    size="100px"
                    font-size="52px"
                    text-color="secondary"
                    icon="vpn_key"
                    class="absolute-avatar"
                  />
                </div>
                <div class="bg-white q-pa-md" style="border-radius: 10px">
                  <div
                    class="gabarit-login toolbar-input-container row no-wrap"
                    style="margin-top: 20px"
                  >
                    <q-btn
                      class="toolbar-input-btn"
                      text-color="secondary"
                      icon="fingerprint"
                      unelevated
                    />
                    <q-btn
                      dense
                      outlined
                      label="Generate public key"
                      class="bg-secondary col text-white"
                      color="secondary"
                      no-caps
                      style="border: 1px solid #eee"
                      @click="generatePublicKey()"
                    />
                  </div>
                </div>
                <!--<q-stepper-navigation>-->
                <!--<q-btn color="primary" label="Finish" />-->
                <!--<q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />-->
                <!--</q-stepper-navigation>-->
              </q-step>
            </q-stepper>
          </div>
        </div>
        <div
          v-else
          class="flex flex-center"
          style="
            max-width: 500px;
            min-width: 310px;
            margin: auto;
            border-radius: 15px;
            border: 2px solid #26a69a;
          "
        >
          <q-card
            class="my-card q-pa-lg"
            flat
            style="width: 100%; border-radius: 10px"
          >
            <q-card-section class="text-center">
              <div class="emoticon q-pb-sm">
                <q-icon class="mood" name="mood" size="50px" color="positive" />
              </div>
              <div class="text-h5">Successful account creation</div>
              <div class="text-subtitle2">by March1st</div>
            </q-card-section>

            <q-card-section class="q-pt-none text-center">
              Your account has been created. You can now Sign in
            </q-card-section>
            <q-card-actions align="center">
              <q-btn
                class="bg-secondary text-white"
                icon="fingerprint"
                flat
                label="Sign in now"
                to="/auth/login"
              ></q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
      <div class="description item flex flex-center" style="text-align: center">
        <q-img src="plan-de-travail-2.png" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";
import { useMeta } from "quasar";

const metaData = {
  // sets document title
  title: "Index Page",
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title) => `${title} - March1st`,

  // meta tags
  meta: {
    description: { name: "description", content: "Page 1" },
    keywords: { name: "keywords", content: "Quasar website" },
    equiv: {
      "http-equiv": "Content-Type",
      content: "text/html; charset=UTF-8",
    },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    ogTitle: {
      property: "og:title",
      // optional; similar to titleTemplate, but allows templating with other meta properties
      template(ogTitle) {
        return `${ogTitle} - My Website`;
      },
    },
  },
};
export default {
  name: "pageAuth",
  setup() {
    useMeta(metaData), (metaData.title = "Login");
  },
  data() {
    return {
      email: "",
      username: "",
      code: null,
      fullName: "",
      step: 1,
      contractStep: false,
    };
  },
  watch: {
    "$q.screen.width": function (val) {
      if (val <= 679) {
        this.contractStep = true;
      } else {
        this.contractStep = false;
      }
    },
    "$route.name": function (val) {
      if (val == "login") {
        metaData.title = "Login";
      } else {
        metaData.title = "Register";
      }
      useMeta(metaData);
    },
    step: function (val) {
      if (val == 2) {
        //this.$refs.code.focus();
      }
    },
  },
  methods: {
    ...mapActions("global", [
      "onSubmitLoginForm",
      "onSubmitSignUpForm",
      "onSubmitValidationCode",
      "callAuthenticator",
      "getCredentialInNavigator",
    ]),
    login() {
      let data = {
        email: this.email,
        username: this.username,
        fullName: this.fullName,
      };
      //debugger;
      this.$q.loading.show({
        message: "Getting sign in authentication challenge ...",
      });
      //debugger;
      this.onSubmitLoginForm(data)
        .then((user) => {
          console.log(`result 1`);
          this.$q.loading.show({
            message: `Sign in authentication challenge available ...`,
          });
          this.getCredentialInNavigator(user)
            .then((result) => {
              console.log(`result 2`);
              this.$q.loading.hide();
              this.$q.notify({
                message: `User is logged in`,
                type: "positive",
                position: "top",
              });
              this.$router.push("/");
            })
            .catch((err) => {
              console.log(`err 2 ${err}`);
              this.$q.loading.hide();
              this.$q.notify({
                message: err,
                type: "negative",
                position: "top",
                icon: "error",
              });
              // return Promise.reject(err);
            });
          return Promise.resolve(1);
        })
        .catch((err) => {
          console.log(`err 1`);
          this.$q.loading.hide();
          this.$q.notify({
            message: err,
            type: "negative",
            position: "top",
            icon: "error",
          });
        });
    },
    register() {
      let data = {
        email: this.email,
        username: this.username,
        fullName: this.fullName,
      };
      this.$q.loading.show({
        message: "Sending Verification Code ...",
      });
      this.onSubmitSignUpForm(data)
        .then((codeDeliveryDetails) => {
          this.$q.loading.hide();
          this.$q.notify({
            message: `Verification code sent by ${codeDeliveryDetails.DeliveryMedium} to ${codeDeliveryDetails.Destination}`,
            type: "positive",
            position: "top",
          });
          this.step = 2;
        })
        .catch((err) => {
          this.$q.loading.hide();
          this.$q.notify({
            message: err,
            type: "negative",
            position: "top",
            icon: "error",
          });
        });
    },
    resendCode() {},
    verifyCode() {
      this.$q.loading.show({
        message: "Checking code ...",
      });
      this.onSubmitValidationCode(this.code)
        .then((res) => {
          this.$q.loading.hide();
          console.log(`Resustat = ${res}`);
          this.$q.notify({
            message: res,
            type: "positive",
            position: "top",
          });
          this.step = 3;
        })
        .catch((err) => {
          this.$q.loading.hide();
          this.$q.notify({
            message: err,
            type: "negative",
            position: "top",
            icon: "error",
          });
          this.step = 2;
        });
    },
    generatePublicKey() {
      this.$q.loading.show({
        message: "Public keys generation ...",
      });
      this.callAuthenticator()
        .then((userData) => {
          this.$q.loading.hide();
          this.$q.notify({
            message: `Account created for ${userData.username}. You can Login`,
            type: "positive",
            position: "top",
          });
          this.step = 4;
        })
        .catch((err) => {
          this.$q.notify({
            message: err,
            type: "negative",
            position: "top",
          });
          this.$q.loading.hide();
        });
    },
  },
  mounted() {
    if (this.$q.screen.width <= 679) {
      this.contractStep = true;
    } else {
      this.contractStep = false;
    }
  },
};
</script>

<style scoped>
.content {
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 2fr;
}
.bg-login {
  background-image: url("../assets/header-bg.svg");
  background-repeat: no-repeat;
  background-position: top;
  /*background-image: linear-gradient(to bottom right, #fd5286, #11193e);*/
  /*background-image: linear-gradient(180deg, #fd5286, #11193e);*/
  /*background-image: linear-gradient(to bottom, #fd5286, #061335);*/

  /*background: #C2EC98;*/
  /*background-image: linear-gradient(-67deg, #8BC4E4 0%, rgba(134, 193, 226, 0.7) 15%, rgba(119, 183, 219, 0) 99%);*/

  /*background: #ea52fd;
        background-image: linear-gradient(-35deg, #40aae4 0%, rgba(60, 143, 228, 0.7) 10%, rgba(119, 183, 219, 0.2) 99%);
        /*background-image: linear-gradient(-25deg, #11193e 0%, rgba(17, 25, 62, 0.7) 35%, rgba(119, 183, 219, 0) 99%);*/
}
.border-content {
  border: 1px solid #eee;
  width: 100%;
  /* background-color: white; */
  border-radius: 15px;
}

.top-avatar {
  width: 100%;
  padding-top: 0px;
  padding-bottom: 20px;
}
.q-stepper--horizontal .q-stepper__step-inner {
  padding-top: 0px;
}
.absolute-avatar {
  /* top: -50px;
        left: 0;
        right: 0; */
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #26a69a;
  /*background-image: linear-gradient(to bottom, #d34778, #b94070);*/
  /*background: #ea52fd;*/
  /*background: #ea52fd;*/
  background-image: linear-gradient(
    -45deg,
    #40aae4 0%,
    rgba(60, 143, 228, 0) 10%,
    rgba(119, 183, 219, 0) 99%
  );
}
.toolbar-input-container {
  /*max-width: 400px;*/
  width: 100%;
  /*margin: auto;*/
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.toolbar-input-btn {
  border-radius: 0px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-style: solid;
  border-width: 1px 0px 1px 1px;
  /*border-color: rgba(0,0,0,.24);*/
  border-color: #eee;
  max-width: 50px;
  width: 100%;
  margin-right: -1px;
}
.input-container {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.step-number {
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  vertical-align: middle;
  background-color: grey;
  border: 3px solid white;
  border-radius: 50%;
  top: 25px;
  left: -20px;
  color: #656565;
}
.title-item {
  font-size: 35px;
  color: #212529;
  font-weight: 400;
  text-align: center;
}
.q-stepper--horizontal .q-stepper__step-inner {
  padding: 10px;
}
.item-box .title {
  font-size: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-weight: 400;
}
@media (max-width: 520px) {
  .content {
    padding-top: 15px;
    padding-bottom: 15px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
  }
  .content .item:nth-of-type(1) {
    grid-row: 2;
  }

  .content .item:nth-of-type(2) {
    grid-row: 1;
  }
  .title-item {
    font-size: 30px;
    color: #212529;
    font-weight: 400;
    text-align: center;
  }
}
</style>
