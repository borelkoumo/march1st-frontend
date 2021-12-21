import { boot } from "quasar/wrappers";
//
// // "async" is optional;
// // more info on params: https://v2.quasar.dev/quasar-cli/boot-files
// export default boot(async ({ app, router}) => {
//   // something to do
//     console.log(app)
// })
import { Auth } from "@aws-amplify/auth";
import { cognitoConfig } from "../../cognitoConfig";
Auth.configure(cognitoConfig);

function goToSignUp(next) {
  next("/auth/login");
}

export default async ({ app, router, store }) => {
  // More to come in here...
  const plugin = {
    install() {
      app.Auth = Auth;
    },
  };

  app.use(plugin);

  router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      Auth.currentAuthenticatedUser({
        bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      })
        .then((user) => {
          console.log(`currentAuthenticatedUser ${user}`);
          next();
        })
        .catch((err) => {
          console.log(`Unable to retrieve currentAuthenticatedUser ${err}`);
          goToSignUp(next);
        });
    } else {
      next();
    }
  });
};

