const routesProgram = {
  path: "programs",
  name: "programs",
  component: () => import("./Module.vue"),
  children: [
    {
      path: "",
      name: "my-programs",
      component: () => import("./views/Home.vue"),
    },
    {
      path:"add-program",
      name:"add-program",
      component:()=> import("./views/AddProgram.vue")
    },
    {
      path:"edit-program/:id",
      name:"edit-program",
      component:()=> import("./views/EditProgram.vue")
    },
    {
      path:"all-programs",
      name:"all-programs",
      component:()=> import("./views/AllPrograms.vue")
    },
    {
      path:"program-detail/:id",
      name:"program-detail",
      component:()=> import("./views/ProgramDetail.vue"),
      props:true
    }
  ],
};

export default routesProgram;
