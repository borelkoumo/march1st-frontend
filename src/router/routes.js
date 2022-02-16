const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/pageHome.vue") },
      {
        path: "getassertion",
        component: () => import("pages/signUpMobile.vue"),
        name: "assertion",
        props: true,
      },
      {
        path: "getattestation",
        component: () => import("pages/signInMobile.vue"),
        name: "attestation",
        props: true,
      },
    ],
    /* meta: {
          requiresAuth: true,
          requiresSettings:true
      } */
  },

  {
    path: "/auth",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("pages/pageAuth.vue"),
      },
      {
        path: "register/:type",
        name: "register",
        component: () => import("pages/pageAuth.vue"),
      },
    ],
    meta: {
      requiresSettings: true,
    },
  },
  {
    path: "/dashboard",
    component: () => import("layouts/DashboardLayout.vue"),
    children: [
      {
        path: "client",
        name: "client",
        component: () => import("pages/client/homePage.vue"),
      },
    ],
    meta: {
      requiresSettings: true,
    },
  },

  {
    path: "/error",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "navigator",
        component: () => import("pages/pageSetSettings.vue"),
        name: "navigator",
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
