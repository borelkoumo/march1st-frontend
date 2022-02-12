<template>
  <q-page
    class="flex flex-center bg-container q-mt-lg"
    v-if="$route.name == 'login'"
  >
    <div>
      <sign-in />
    </div>
  </q-page>
  <q-page class="flex flex-center bg-container q-mt-lg" v-else>
    <div>
      <sign-up />
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { useMeta } from "quasar";
import SignIn from "src/components/sign-in.vue";
import SignUp from "src/components/sign-up.vue";
import { printLog } from "src/store/utils/base64";

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
    return {};
  },
  watch: {
    "$route.params.type": function (val) {},
  },
  computed: {
    ...mapGetters("global", []),
  },
  methods: {
    ...mapActions("global", [
      "onSubmitLoginForm",
      "onSubmitSignUpForm",
      "onSubmitValidationCode",
      "callAuthenticator",
      "getCredentialInNavigator",
      "setTypeUser",
      "getTypeUser",
    ]),
  },
  async beforeMount() {
    if (this.$route.params.type) {
      // If parameter is available, then set new value in state and storage
      await this.setTypeUser(this.$route.params.type);
    } else {
      console.log(`pageAuth -- beforeMount -- this.typeUser = ${this.typeUser}`);
    }
  },
  async mounted() {},
};
</script>

<style scoped></style>
