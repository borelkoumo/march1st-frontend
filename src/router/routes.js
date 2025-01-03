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
  /*{
    path: "/dashboard",
    component: () => import("layouts/DashboardLayout.vue"),
    children: [
      {
        path: "",
        name: "dashboard",
        component: () => import("pages/dashboard/homePage.vue"),
      }
    ]
  },*/
  {
    path: "/new-dashboard",
    name:"dashboard",
    component: () => import("layouts/PanelLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("pages/dashboard/homePage.vue"),
      }
    ]
  },
  /*{
    path: "/main",
    component: () => import("layouts/SecondLayout.vue"),
    children: [
      {
        path: "my-account",
        name:"my-account",
        component: () => import("pages/dashboard/myaccount.vue"),
      },
      {
        path: "my-submissions",
        name:"my-submissions",
        component: () => import("pages/dashboard/submissionPage.vue"),
      },
      {
        path: "add-submission/:id",
        name:"add-submission",
        component: () => import("pages/dashboard/addSubmission.vue"),
        props:true
      },
      {
        path: "submission-detail/:id",
        name:"submission-detail",
        component: () => import("pages/dashboard/submission-detail.vue"),
        props:true
      },

      {
        path: "program-detail/:id",
        name:"program-detail",
        component: () => import("pages/dashboard/program-detail.vue"),
        props:true
      },
      {
        path: "add-program",
        name:"add-program",
        component: () => import("pages/dashboard/addProgram.vue"),
      },
      {
        path: "edit-program/:id",
        name:"edit-program",
        component: () => import("pages/dashboard/editProgram.vue"),
        props:true
      },
      {
        path: "programs",
        name:"programs",
        component: () => import("pages/dashboard/programPage.vue"),
      },
      {
        path: "my-programs",
        name:"my-programs",
        component: () => import("pages/dashboard/myprogramPage.vue"),
      },
      {
        path: "all-programs",
        name:"all-programs",
        component: () => import("pages/dashboard/allprogramPage.vue"),
      },
      {
        path: "my-tasks",
        name:"my-tasks",
        component: () => import("pages/dashboard/pageTasks.vue"),
      },
      {
        path: "task-item",
        name:"task-item",
        component: () => import("pages/dashboard/taskItem.vue"),
      },
      {
        path: "add-client",
        name:"add-client",
        component: () => import("pages/dashboard/addClient.vue"),
      },
      {
        path: "all-clients",
        name:"all-clients",
        component: () => import("pages/dashboard/pageClients.vue"),
      },
      {
        path: "manage-client",
        name:"manage-client",
        component: () => import("pages/dashboard/manageClient.vue"),
      },
      {
        path: "add-user",
        name:"add-user",
        component: () => import("pages/dashboard/addUser.vue"),
      },
      {
        path: "payment",
        name:"payment",
        component: () => import("pages/dashboard/payment.vue"),
      },
      {
        path: "payment-type",
        name:"payment-type",
        component: () => import("pages/dashboard/payment2.vue"),
      },
      {
        path: "payment-admin",
        name:"payment-admin",
        component: () => import("pages/dashboard/payment-admin.vue"),
      },
      {
        path: "notifications",
        name:"notifications",
        component: () => import("pages/dashboard/notifications.vue"),
      },
      {
        path: "vulnerability",
        name:"vulnerability",
        component: () => import("pages/dashboard/vulnerability.vue"),
      },
    ]
  },*/

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
