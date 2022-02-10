<template>
  <q-page
    class="flex flex-center bg-container q-mt-lg"
    v-if="$route.name == 'login'"
  >
    <div>
      <sign-in :typeUser="type" />
    </div>
  </q-page>
  <q-page class="flex flex-center bg-container q-mt-lg" v-else>
    <div>
      <sign-up :typeUser="type" />
    </div>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";
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
      type: "",
    };
  },
  watch: {
    "$route.params.type": function (val) {
      this.type = ["client", "hacker"].includes(this.$route.params.type)
        ? val
        : "client";
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
  },
  mounted() {
    if (["client", "hacker"].includes(this.$route.params.type)) {
      this.type = this.$route.params.type;
    } else {
      // verify if we have a valid typeUser in storage
      if (["client", "hacker"].includes(localStorage.getItem("typeUser"))) {
        this.type = localStorage.getItem("typeUser");
      } else {
        this.type = "client";
        console.log(`Valeur par defaut set dans mounted ${this.type}`);
      }
    }
    localStorage.setItem("typeUser", this.type);
  },
};
</script>

<style scoped></style>
