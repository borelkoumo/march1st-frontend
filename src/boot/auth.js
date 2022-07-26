import { Auth } from "@aws-amplify/auth";
import { printLog, getAuthConfig } from "../../src/store/utils/base64";

Auth.configure(getAuthConfig());

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
          printLog(`In router.beforeEach : currentAuthenticatedUser`, user);
          next();
        })
        .catch((err) => {
          printLog(`Unable to retrieve currentAuthenticatedUser`, err.message);
          goToSignUp(next);
        });
    } else {
      next();
    }
  });
};
