<template>
  <q-page class="flex flex-center bg-container" v-if="$route.name == 'login'">
    <div>
      <login/>
      <!-- <qrcode-vue :value="value" v-if="IS_PF_AUTH_AVAIL==false"></qrcode-vue> -->
    </div>
  </q-page>
  <q-page class="flex flex-center bg-container" v-else>
    <div>
      <sign-up/>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";
import { useMeta } from "quasar";
import login from 'src/components/login.vue';
import SignUp from 'src/components/sign-up.vue';

//import WebSocketClient from 'src/utils/WebSocketClient.ts';
import * as WebAuthnUtils from "src/utils/WebAuthnUtils.ts";
const PF_AUTH_AVAIL = WebAuthnUtils.isPlatformAuthenticatorAvailable();
//const a = window.PublicKeyCredential ? true : false;

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
import QrcodeVue from 'qrcode.vue';
export default {
  components: { login, SignUp, QrcodeVue },
  name: "pageAuth",
  setup() {
    useMeta(metaData), (metaData.title = "Login");
  },
  data() {
    return {
      value:"https://example.com",
      IS_PF_AUTH_AVAIL:false
    };
  },
  watch: {
    
  },
  methods: {
    ...mapActions("global", [
      "onSubmitLoginForm",
      "onSubmitSignUpForm",
      "onSubmitValidationCode",
      "callAuthenticator",
      "getCredentialInNavigator",
    ]),
    
  },
  mounted() {
    PF_AUTH_AVAIL.then((res)=>{
      this.IS_PF_AUTH_AVAIL=res;
      //console.log(this.IS_PF_AUTH_AVAIL)
    })
  },
};
</script>

<style scoped>

</style>
