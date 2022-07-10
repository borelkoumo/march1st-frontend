const routesSubmission = {
  path: "submissions",
  name: "submissions",
  component: () => import("./Module.vue"),
  children: [
    {
      path: "",
      name: "my-submissions",
      component: () => import("./views/Home.vue"),
    },
    {
      path:"add-submission/:programId",
      name:"add-submission",
      component:()=> import("./views/AddSubmission.vue"),
      props:true
    },
    {
      path:"submission-detail/:id",
      name:"submission-detail",
      component:()=> import("./views/SubmissionDetail.vue"),
      props:true
    }
  ],
};

export default routesSubmission;
