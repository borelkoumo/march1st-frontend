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
            Sign up for HACKERS
          </p>
          <p class="text-center" style="font-size: 18px" v-else>
            Sign up for CLIENTS
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
          <div class="form-control" >
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
          <!--<div class="form-control" v-if="typeUser == 'hacker'">
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
          </div>-->
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
            <div>Password</div>
            <div class="q-pt-sm">
              <q-input
                dense
                placeholder="Enter your password"
                v-model="formData.password"
                color="grey-3"
                bg-color="white"
                type="password"
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
  import { mapActions, mapGetters, mapState } from "vuex";
  import { printLog } from "src/store/utils/base64";

  export default {
    name: "login",
    components: {  },
    data() {
      return {
        formData: {
          companyName: "My Company",
          fullName: "Steve William",
          title: "Developer",
          email: "borelkoumo@mailinator.com",
          username: "",
          password:"March1st@2022",
          role:null
        },

        code: null,
        step: 1,

        showSpinner: false,
      };
    },
    watch: {

    },
    computed: {
      ...mapState("global", ["typeUser"]),
      ...mapGetters("global", []),
    },
    methods: {
      ...mapActions("global", [
        "setTypeUser",
        "getTypeUser",
        "strapiClientSignUp"
      ]),
      ...mapActions('auth',[
        "onSubmitSignUpForm",
        "onSubmitValidationCode",
      ]),

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
        this.formData.role=this.typeUser;
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
            console.log("Error in submitSignup", error);
            this.notifyNegative(error.message);
          }

        /*if (this.typeUser == "client") {

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
        }*/
      },

      async submitValidationCode() {
        try {
          // Check if validation code is ok
          this.setLoadingMsg("Checking validation code ...");
          const message = await this.onSubmitValidationCode(this.code);
          printLog(`onSubmitValidationCode result = ${message}`);
          //On le redirige vers le login
          this.$router.push("/auth/login");
          this.$q.loading.hide();
        } catch (error) {
          this.step = 2;
          this.notifyNegative(error.message);
        }
      },
    },
    async beforeMount() {},
    async mounted() {},
  };
</script>

<style scoped>
  .wrap-auth {
    font-family: "nunito";
    color: #333333;
  }
</style>
