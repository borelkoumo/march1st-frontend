const users = [
  {
    company_name: "Company 1",
    id: 1,
    location: "Location 1",
    company_logo: "",
    typeUser: "client",
    company_users:[
      {
        username:"userCompany1",
        role:"admin"
      }
    ]
  },
  {
    company_name: "Company 2",
    id: 2,
    location: "Location 2",
    company_logo: "",
    typeUser: "client",
  },
  {
    company_name: "Company 3",
    id: 3,
    location: "Location 3",
    company_logo: "",
    typeUser: "client",
  },
  {
    username: "hacker1",
    id: 4,
    first_name: "Hacker 1",
    last_name: "Hacker 1",
    email: "Hacker1@test.com",
    phone: "",
    adress: "Adress 1",
    profile_url: "",
    typeUser: "hacker",
  },
  {
    username: "hacker2",
    id: 5,
    first_name: "Hacker 2",
    last_name: "Hacker 2",
    email: "Hacker2@test.com",
    phone: "",
    adress: "Adress 2",
    profile_url: "",
    typeUser: "hacker",
  },
  {
    username: "hacker3",
    id: 6,
    first_name: "Hacker 3",
    last_name: "Hacker 3",
    email: "Hacker3@test.com",
    phone: "",
    adress: "Adress 3",
    profile_url: "",
    typeUser: "hacker",
  },
  {
    username: "Manager1",
    id: 7,
    first_name: "Manager1",
    last_name: "",
    email: "manager1@test.com",
    phone: "",
    adress: "Adress 3",
    profile_url: "",
    typeUser: "admin",
    designation:"Product manager",
    privilege:null
  },
  {
    username: "Manager2",
    id: 8,
    first_name: "Manager2",
    last_name: "",
    email: "manager2@test.com",
    phone: "",
    adress: "Adress 4",
    profile_url: "",
    typeUser: "admin",
    designation:"Product manager",
    privilege:null
  },
  {
    username: "Manager3",
    id: 9,
    first_name: "Manager3",
    last_name: "",
    email: "manager3@test.com",
    phone: "",
    adress: "Adress 5",
    profile_url: "",
    typeUser: "admin",
    designation:"Product manager",
    privilege:null
  },
];
const managers =[
  {
    id:1,
    name:"Manager 1",
    email:"manager1@email.com",
    designation:"Product manager",
    privilege:null
  },
  {
    id:2,
    name:"Manager 2",
    email:"manager2@email.com",
    designation:"Delivery manager",
    privilege:null
  },
  {
    id:3,
    name:"Manager 3",
    email:"manager3@email.com",
    designation:"Technical manager",
    privilege:null
  }
];
const programs = [
  {
    program_title:"Le titre du program",
    program_type:"private",
    safe_harbour_type:"full",
    reward_type:"points",
    reward_range:"",
    program_guidelines_1:"",
    program_guidelines_2:"",
    program_scope:5,
    legal_terms:"",
    program_picture_url:"",
    is_closed:true,
    closed_at:"",
    client_id:1,
    hackers:[],
    managers:[]
  }
];

export { users, programs,managers };
