<template>
  <q-page
    class="flex flex-center bg-container q-mt-lg"
    v-if="$route.name == 'login'"
  >
    <div>
      <sign-in/>
    </div>
  </q-page>
  <q-page class="flex flex-center bg-container q-mt-lg" v-else>
    <div>
      <sign-up/>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { useMeta } from "quasar";
import SignIn from "src/components/sign-in.vue";
import SignUp from "src/components/sign-up.vue";

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
  components: { SignIn, SignUp },
  name: "pageAuth",
  setup() {
    useMeta(metaData), (metaData.title = "Login");
  },
  data() {
    return {
      
    };
  },
  watch: {
    "$route.params.type": function (val) {
      console.log("dans Watch de pageAuth : typeUser="+val);
      this.setTypeUser(val);
      /*if (["client", "hacker"].includes(val)) {
        this.type = val;
      } else {
        // verify if we have a valid typeUser in storage
        if (["client", "hacker"].includes(localStorage.getItem("typeUser"))) {
          this.type = localStorage.getItem("typeUser");
        } else {
          this.type = "client";
          console.log(`Valeur par defaut set dans watch ${this.type}`);
        }
      }
      console.log(`Valeur de this.type set dans watch ${this.type}`);
      console.log(
        `Valeur de this.$route.params.type set dans watch ${val}`
      );  //localStorage.setItem("typeUser", this.type);*/
    },
  },
  computed:{
    ...mapGetters("global",[])
  },
  methods: {
    ...mapActions("global", [
      "onSubmitLoginForm",
      "onSubmitSignUpForm",
      "onSubmitValidationCode",
      "callAuthenticator",
      "getCredentialInNavigator",
      "setTypeUser",
      "getTypeUser"
    ]),
  },
  beforeMount(){
    
  },
  mounted() {
    console.log("mounted with typeUser = "+this.getTypeUser())
    this.setTypeUser(this.$route.params.type);
  },
};
</script>

<style scoped></style>
