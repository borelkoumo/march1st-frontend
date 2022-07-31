const routesCompany = {
  path: "company",
  name: "company",
  component: () => import("./Module.vue"),
  children: [
    {
      path: "",
      name: "my-company",
      component: () => import("./views/Home.vue"),
    },
    {
      path:"add-company",
      name:"add-company",
      component:()=> import("./views/AddCompany.vue")
    },
    {
      path:"add-manager",
      name:"add-manager",
      component:()=> import("./views/AddManager.vue")
    }
  ],
};

export default routesCompany;
