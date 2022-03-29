import { apolloClient } from "./utils/apollo";
import gql from "graphql-tag";
import {users} from "./utils/fakedata";

/* import {
    allMenu
} from './graphql/menu' */

const state = {
  // pour la simulation
  user:{
    name:"",
    typeUser:'client',
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
};

const getters = {
  getMenus(state){
    if(state.user.typeUser=="hacker"){
      let menus= [
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
              slug: "my-task",
              link: "/main/my-task",
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
    }
    else if(state.user.typeUser=="client"){
      let menus= [
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
              slug: "my-task",
              link: "/main/my-task",
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

  //pour simulation
  getUsers(){
    return JSON.parse(JSON.stringify(users));
  }
};

const mutations = {
  setUser(state,payload){
    state.user = payload;
  }
};

const actions = {
  createUser({commit},payload){
    commit('setUser',payload);
  }
  /* async getMenus({commit}){
        try {
            const result = await apolloClient.query(allMenu);
            commit("setMenus",result.data.menus.data);
        } catch (error) {
            
        }
    }, */
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
