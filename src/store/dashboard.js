import { _postQueryServer, _getQueryServer } from "./utils/helper";
import { users } from "./utils/fakedata";
import {
  _getHackers,
  _loginUser,
  _getCompanies,
  _getUsers,
  _getMyRole,
  _getCompany,
  _getHacker,
  _getCompanyUsers,
} from "../services/users";

const state = {
  // pour la simulation
  token: null,
  user: {
    name: "",
    typeUser: "client",
    company: null,
  },
  cards: [
    {
      label: "CASH EARNED",
      data: "$24,000",
      icon: "",
      percentage: "12%",
      time: "since last month",
    },
    {
      label: "SUBMISSIONS",
      data: "24000",
      icon: "",
      percentage: "12%",
      time: "since last month",
    },
    {
      label: "ACCEPTANCE RATE",
      data: "75,5%",
      progress: 0.755,
      icon: "",
    },
    {
      label: "POINTS",
      data: "2000",
      icon: "",
      percentage: "12%",
      time: "since last month",
    },
  ],
  columnChart: {
    series: [
      {
        name: "Net Profit",
        data: [44, 55, 57, 56, 61, 58],
      },
      {
        name: "Revenue",
        data: [76, 85, 101, 98, 87, 105],
      },
    ],
    chartOptions: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "25%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
        ],
      },
      fill: {
        opacity: 1,
        colors: ["#1665D8", "#EDF0F2"],
      },
      legend: {
        show: false,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          },
        },
      },
    },
  },
  pieData: [
    {
      title: "Submissions",
      series: [44, 55, 41],
      chartOptions: {
        chart: {
          type: "donut",
        },
        labels: [
          "Accepted submissions",
          "Pending for verifications",
          "Rejected submissions",
        ],
        legend: {
          position: "bottom",
          horizontalAlign: "left",
        },
        dataLabels: {
          enabled: false,
        },
      },
    },
    {
      title: "Vulnerability Severity",
      series: [44, 55, 41, 65],
      chartOptions: {
        chart: {
          type: "donut",
        },
        labels: [
          "Critical vulnerability - P1",
          "Severe vulnerability - P2",
          "Medium vulnerability - P3",
          "Low vulnerability - P4",
        ],
        legend: {
          position: "bottom",
          horizontalAlign: "left",
        },
        dataLabels: {
          enabled: false,
        },
      },
    },
    {
      title: "Submissions",
      series: [44, 55, 41],
      chartOptions: {
        chart: {
          type: "donut",
        },
        labels: [
          "Accepted submissions",
          "Pending for verifications",
          "Rejected submissions",
        ],
        legend: {
          position: "bottom",
          horizontalAlign: "left",
        },
        dataLabels: {
          enabled: false,
        },
      },
    },
    {
      title: "Submissions",
      series: [44, 55, 41],
      chartOptions: {
        chart: {
          type: "donut",
        },
        labels: [
          "Accepted submissions",
          "Pending for verifications",
          "Rejected submissions",
        ],
        legend: {
          position: "bottom",
          horizontalAlign: "left",
        },
        dataLabels: {
          enabled: false,
        },
      },
    },
  ],
  users: [],
  hackers: [],
  compagines: [],
  managers: [],
};

const getters = {
  getAllCompanies() {
    let companies = [];
    users.forEach((user) => {
      if (user.typeUser == "client") {
        user.label = user.company_name;
        user.value = user.id;
        companies.push(JSON.parse(JSON.stringify(user)));
      }
    });
    return companies;
  },
  getAllHacker() {
    let hackers = [];
    users.forEach((user) => {
      if (user.typeUser == "hacker") {
        hackers.push(JSON.parse(JSON.stringify(user)));
      }
    });
    return hackers;
  },
  getMenus(state) {
    if (state.user.typeUser == "hacker") {
      let menus = [
        {
          label: "",
          hasLabel: false,
          id: 1,
          children: [
            {
              icon: "dashboard",
              name: "Dashboard",
              slug: "dashboard",
              link: "/dashboard",
            },
          ],
        },
        {
          label: "Personnal Menu",
          hasLabel: true,
          id: 2,
          children: [
            {
              icon: "people",
              name: "My Account",
              slug: "my-account",
              link: "/main/my-account",
            },
            {
              icon: "shopping_basket",
              name: "My Tasks",
              slug: "my-tasks",
              link: "/main/my-tasks",
            },
            {
              icon: "lock_open",
              name: "My Programs",
              slug: "my-programs",
              link: "/main/my-programs",
            },
            {
              icon: "dashboard",
              name: "My Submissions",
              slug: "my-submissions",
              link: "/main/my-submissions",
            },
            {
              icon: "format_size",
              name: "Payments",
              slug: "payments",
              link: "/main/payments",
            },
          ],
        },
        {
          label: "General Menu",
          hasLabel: true,
          id: 3,
          children: [
            {
              icon: "people",
              name: "Leader Board",
              slug: "leader-board",
              link: "/main/leader-board",
            },
            {
              icon: "shopping_basket",
              name: "All Programs",
              slug: "all-programs",
              link: "/main/all-programs",
            },
          ],
        },
      ];
      return menus;
    } else if (state.user.typeUser == "client") {
      let menus = [
        {
          label: "",
          hasLabel: false,
          id: 1,
          children: [
            {
              icon: "dashboard",
              name: "Dashboard",
              slug: "dashboard",
              link: "/dashboard",
            },
          ],
        },
        {
          label: "Personnal Menu",
          hasLabel: true,
          id: 2,
          children: [
            {
              icon: "people",
              name: "My Account",
              slug: "my-account",
              link: "/main/my-account",
            },
            {
              icon: "shopping_basket",
              name: "My Tasks",
              slug: "my-tasks",
              link: "/main/my-tasks",
            },
            {
              icon: "lock_open",
              name: "My Programs",
              slug: "programs",
              link: "/main/programs",
            },
            {
              icon: "dashboard",
              name: "My Submissions",
              slug: "my-submissions",
              link: "/main/my-submissions",
            },
            {
              icon: "format_size",
              name: "Payments",
              slug: "payments",
              link: "/main/payments",
            },
          ],
        },
        {
          label: "General Menu",
          hasLabel: true,
          id: 3,
          children: [
            {
              icon: "people",
              name: "Leader Board",
              slug: "leader-board",
              link: "/main/leader-board",
            },
            {
              icon: "shopping_basket",
              name: "All Programs",
              slug: "all-programs",
              link: "/main/all-programs",
            },
          ],
        },
      ];
      return menus;
    } else if (state.user.typeUser == "admin") {
      let menus = [
        {
          label: "",
          hasLabel: false,
          id: 1,
          children: [
            {
              icon: "dashboard",
              name: "Dashboard",
              slug: "dashboard",
              link: "/dashboard",
            },
          ],
        },
        {
          label: "Personnal Menu",
          hasLabel: true,
          id: 2,
          children: [
            {
              icon: "people",
              name: "My Account",
              slug: "my-account",
              link: "/main/my-account",
            },
            {
              icon: "shopping_basket",
              name: "My Tasks",
              slug: "my-tasks",
              link: "/main/my-tasks",
            },
            {
              icon: "lock_open",
              name: "My Programs",
              slug: "programs",
              link: "/main/programs",
            },
            {
              icon: "dashboard",
              name: "My Submissions",
              slug: "my-submissions",
              link: "/main/my-submissions",
            },
            {
              icon: "format_size",
              name: "Payments",
              slug: "payments",
              link: "/main/payments",
            },
          ],
        },
        {
          label: "General Menu",
          hasLabel: true,
          id: 3,
          children: [
            {
              icon: "people",
              name: "Leader Board",
              slug: "leader-board",
              link: "/main/leader-board",
            },
            {
              icon: "shopping_basket",
              name: "All Programs",
              slug: "all-programs",
              link: "/main/all-programs",
            },
          ],
        },
      ];
      return menus;
    }
  },
  getUser(state) {
    return (id) => {
      let user = state.users.filter((u) => u.id == id);
      if (user.length > 0) return user[0];
      return {};
    };
  },

  //pour simulation
  getUsers() {
    return JSON.parse(JSON.stringify(state.users));
  },
  getManagers() {
    return JSON.parse(JSON.stringify(state.managers));
  },
};

const mutations = {
  setUser(state, payload) {
    let user = {
      email: payload.user.email,
      typeUser: payload.typeUser,
      id: payload.user.id,
      username: payload.user.username,
    };
    if (payload.company) {
      user.company = payload.company;
      user.role=payload.role;
      user.company_user=payload.company_user;
    }
    if (payload.hacker) {
      user.hacker = payload.hacker;
    }
    state.user = user;
    console.log(state.user)
    state.token = payload.token;
    localStorage.setItem("token", payload.token);
  },
  setUsers(state, payload) {
    state.users = payload;
  },
  setManagers(state, payload) {
    state.managers = payload;
  },
};

const actions = {
  async createUser({ commit }, payload) {
    try {
      const credentials = await _loginUser({
        identifier: payload.email,
        password: payload.password,
      });
      console.log("Credential in createUser ", credentials);

      const url = "/custom/userdata?id=" + credentials.user.id;
      const data = await _getQueryServer(url, null, credentials.token);
      console.log(data.user);
      let type = data.user.role.type;
      let role = "public";
      let company = null;
      let hacker = null;
      let dataObject = {
        user: credentials.user,
        token: credentials.token,
      };
      if (type === "m1_account_manager") {
        //company=result.data.march1stUser.data.attributes.company;
        type = "admin";
      } else if (type === "hacker") {
        hacker = await _getHacker({
          id: credentials.user.id,
          token: credentials.token,
        });
        (dataObject.typeUser = type), (dataObject.hacker = hacker);
      } else if (type === "program_manager" || type === "program_super_admin") {
        let company_user = data.user.company_user;

        company = await _getCompany({
          id: company_user.id,
          token: credentials.token,
        });
        if (type == "program_manager") role = "manager";
        else role = "super_manager";
        type = "client";
        (dataObject.typeUser = type), (dataObject.company = company);
        dataObject.role = role; dataObject.company_user=company_user;
      } else {
        throw new Error(type + " not pris en charge");
      }
      //console.log(credentials.user)

      //console.log(dataObject)
      commit("setUser", dataObject);

      /*console.log(data);*/
      return Promise.resolve(dataObject);
    } catch (error) {
      payload.token = null;
      payload.user = {};
      console.log("Error in createUser", error.message);
      commit("setUser", payload);
      return Promise.reject(0);
    }
  },

  async allUsers({ commit }) {
    try {
      const users = await _getUsers();
      let userList = users.map(function (user) {
        user.label = user.username;
        user.value = user.email;
        return user;
      });
      commit("setUsers", userList);
    } catch (error) {
      console.log("erro in action dashboard " + `${error}`);
    }
  },

  async getAllManagers({ commit, state }) {
    try {
      const data = await _getCompanyUsers(state.user.company.id);
      //commit("setManagers", data);
      return Promise.resolve(data);
    } catch (error) {
      console.log("erro in action dashboard " + `${error}`);
    }
  },

  async getAllHackers({ commit, state }) {
    try {
      const data = await _getHackers();
      return Promise.resolve(data);
    } catch (error) {
      console.log("erro in action dashboard " + `${error}`);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
