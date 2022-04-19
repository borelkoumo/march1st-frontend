import { apolloClient } from "./utils/apollo";
import dasboard from "./dashboard";
//import submission from "./submission";

import gql from "graphql-tag";

const state = {
  myPrograms: [
    {
      id: 1,
      picture: "https://cdn.quasar.dev/img/parallax2.jpg",
      title: "Yoast SEO",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
      type: "Public",
      safe_habour_type: "Full Safe Harbor",
      reward_type: "Cash Paiement",
      reward_range: 0,
      guidelines:
        "Nulla porttitor accumsan tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in ipsum id orci porta dapibus.",
      legal_terms: "",
      scope: 5,
      hackers: [],
      critical: { min: 0, max: 0 },
      severe: { min: 0, max: 0 },
      medium: { min: 0, max: 0 },
      low: { min: 0, max: 0 },
      status: "Closed",
      status2: "Active",
      date_post: "10/04/2021",
      max: 2000,
      min: 100,

      totalSubmissions: [
        { label: "Accepted ", value: 0.8 },
        { label: "Rejected ", value: 0.2 },
        { label: "Pending ", value: 0.1 },
      ],
    },
    {
      id: 2,
      picture: "https://cdn.quasar.dev/img/parallax2.jpg",
      title: "Lorem Yoast SEO",
      description:
        "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.",
      type: "Public",
      safe_habour_type: "Full Safe Harbor",
      reward_type: "Cash Paiement",
      reward_range: 0,
      guidelines: "",
      legal_terms: "",
      scope: 5,
      hackers: [],
      critical: { min: 0, max: 0 },
      severe: { min: 0, max: 0 },
      medium: { min: 0, max: 0 },
      low: { min: 0, max: 0 },
      status: "Running",
      status2: "Active",
      date_post: "10/04/2021",
      max: 2000,
      min: 100,

      totalSubmissions: [
        { label: "Accepted ", value: 0.8 },
        { label: "Rejected ", value: 0.2 },
        { label: "Pending ", value: 0.1 },
      ],
    },
    {
      id: 3,
      picture: "https://cdn.quasar.dev/img/parallax2.jpg",
      title: "Yoast SEO",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
      type: "Public",
      safe_habour_type: "Full Safe Harbor",
      reward_type: "Cash Paiement",
      reward_range: 0,
      guidelines: "",
      legal_terms: "",
      scope: 5,
      hackers: [],
      critical: { min: 0, max: 0 },
      severe: { min: 0, max: 0 },
      medium: { min: 0, max: 0 },
      low: { min: 0, max: 0 },
      status: "Running",
      status2: "Active",
      date_post: "10/04/2021",
      max: 2000,
      min: 100,

      totalSubmissions: [
        { label: "Accepted ", value: 0.8 },
        { label: "Rejected ", value: 0.2 },
        { label: "Pending ", value: 0.1 },
      ],
    },
    {
      id: 4,
      picture: "https://cdn.quasar.dev/img/parallax2.jpg",
      title: "Yoast SEO",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
      type: "Public",
      safe_habour_type: "Full Safe Harbor",
      reward_type: "Cash Paiement",
      reward_range: 0,
      guidelines: "",
      legal_terms: "",
      scope: 5,
      hackers: [],
      critical: { min: 0, max: 0 },
      severe: { min: 0, max: 0 },
      medium: { min: 0, max: 0 },
      low: { min: 0, max: 0 },
      status: "Closed",
      status2: "Active",
      date_post: "10/04/2021",
      max: 2000,
      min: 100,

      totalSubmissions: [
        { label: "Accepted ", value: 0.8 },
        { label: "Rejected ", value: 0.2 },
        { label: "Pending ", value: 0.1 },
      ],
    },
    {
      id: 5,
      picture: "https://cdn.quasar.dev/img/parallax2.jpg",
      title: "Lorem ipsum dolor",
      description:
        "Donec sollicitudin molestie malesuada. Proin eget tortor risus.",
      type: "Public",
      safe_habour_type: "Full Safe Harbor",
      reward_type: "Cash Paiement",
      reward_range: 0,
      guidelines: "",
      legal_terms: "",
      scope: 5,
      hackers: [],
      critical: { min: 0, max: 0 },
      severe: { min: 0, max: 0 },
      medium: { min: 0, max: 0 },
      low: { min: 0, max: 0 },
      status: "Running",
      status2: "Active",
      date_post: "10/04/2021",
      max: 2000,
      min: 100,

      totalSubmissions: [
        { label: "Accepted ", value: 0.8 },
        { label: "Rejected ", value: 0.2 },
        { label: "Pending ", value: 0.1 },
      ],
    },
  ],
  programs: [],
};

const getters = {
  running(state) {
    let data = [];
    state.myPrograms.forEach((element) => {
      if (element.status == "Running") data.push(element);
    });
    return data.reverse();
  },
  closed(state) {
    let data = [];
    state.myPrograms.forEach((element) => {
      if (element.status == "Closed") data.push(element);
    });
    return data.reverse();
  },
  getMyPrograms(state) {
    return JSON.parse(JSON.stringify(state.myPrograms));
    //return [];
  },
  getProgram(state) {
    return (id) => {
      let program = {};
      let allPrograms = localStorage.getItem("programs");
      if (allPrograms) {
        allPrograms = JSON.parse(allPrograms);
        allPrograms.forEach((p) => {
          if (p.id == id) program = JSON.parse(JSON.stringify(p));
        });
      }
      //je recherche toutes les submissions de ce program
      if (program.id) {
        program.submissions = [];
        if (localStorage.getItem("submissions")) {
          let allSubmissions = JSON.parse(localStorage.getItem("submissions"));
          allSubmissions.forEach((s) => {
            if (s.program_id === program.id) program.submissions.push(s);
          });
        }
      }
      return program;
    };
  },
  getPrograms(state) {
    let programs = localStorage.getItem("programs");
    if (programs) {
      programs = JSON.parse(programs);
      return programs;
    } else {
      return JSON.parse(JSON.stringify(state.programs));
    }
  },
  getClientPrograms(state) {
    let user = dasboard.state.user;
    let programs = [];
    let allPrograms = localStorage.getItem("programs");
    //console.log(allPrograms);
    if (allPrograms) {
      allPrograms = JSON.parse(allPrograms);
      allPrograms.forEach((program) => {
        if (program.user_id == user.id) {
          //je recherche toutes les submissions de ce program
          program.submissions = [];
          if (localStorage.getItem("submissions")) {
            let allSubmissions = JSON.parse(
              localStorage.getItem("submissions")
            );
            allSubmissions.forEach((s) => {
              if (s.program_id === program.id) program.submissions.push(s);
            });
          }

          programs.push(program);
        }
      });
    }
    return programs;
  },
  getHackerPrograms(state) {
    let programs = [];
    let user = dasboard.state.user;
    let allPrograms = localStorage.getItem("programs");
    if (allPrograms) {
      allPrograms = JSON.parse(allPrograms);
      allPrograms.forEach((program) => {
        program.hackers.forEach((h) => {
          if (h.id == user.id) programs.push(program);
        });
      });
    }
    return programs;
  },
  isPrivateProgram(state) {
    let result = false;
    return (id) => {
      state.programs.forEach((program) => {
        if (program.id == id && program.type == "Private") result = true;
      });
      return result;
    };
  },
  isHackerJoined(state) {
    let result = false;
    let user = dasboard.state.user;
    return (program_id) => {
      let program = {};

      state.programs.forEach((p) => {
        if (p.id == program_id) program = p;
      });
      program.hackers.forEach((h) => {
        if (h.id == user.id) result = true;
      });
      //console.log(result);
      return result;
    };
  },
  isHackerHasInvitation(state) {
    let result = false;
    let user = dasboard.state.user;
    return (program_id) => {
      let programs = localStorage.getItem("programs");
      if (programs) {
        programs = JSON.parse(programs);
        console.log(programs);
        programs.forEach((program) => {
          if (
            program.id == program_id &&
            program.invitations.includes(user.id)
          ) {
            result = true;
          }
        });
      }
      return result;
    };
  },
};

const mutations = {
  setPrograms(state) {
    let programs = localStorage.getItem("programs");
    if (programs) {
      programs = JSON.parse(programs);
      state.programs = programs;
    }
  },
  addProgram(state, payload) {
    let programs = localStorage.getItem("programs");
    if (programs) {
      programs = JSON.parse(programs);
      programs.push(payload);
      state.programs = programs;
      localStorage.setItem("programs", JSON.stringify(programs));
    } else {
      state.programs.push(payload);
      localStorage.setItem("programs", JSON.stringify(state.programs));
    }
  },
  addHackerToProgram(state, payload) {
    state.programs.forEach((p) => {
      if (p.id == payload.program_id) {
        p.hackers.push(payload.hacker);
      }
    });
  },
};

const actions = {
  async getAllPrograms({ state, commit }) {
    commit("setPrograms");
  },
  async saveProgram({ state, commit, dispatch }, payload) {
    let max =
      payload.critical.max > payload.severe.max
        ? payload.critical.max
        : payload.severe.max;
    max = max > payload.medium.max ? max : payload.medium.max;
    max = max > payload.low.max ? max : payload.low.max;

    let min =
      payload.critical.min > payload.severe.min
        ? payload.critical.min
        : payload.severe.min;
    min = min > payload.medium.min ? min : payload.medium.min;
    min = min > payload.low.min ? min : payload.low.min;

    let user = dasboard.state.user;

    let program = {
      id: payload.id,
      user_id: user.id,
      picture: "https://cdn.quasar.dev/img/parallax2.jpg",
      title: payload.title,
      description: payload.description,
      type: payload.type,
      safe_habour_type: payload.safe_habour_type,
      reward_type: payload.reward_type,
      reward_range: payload.reward_range,
      guidelines: payload.guidelines,
      legal_terms: payload.legal_terms,
      scope: payload.scope,
      hackers: [],
      invitations: payload.invitations,
      critical: { min: payload.critical.min, max: payload.critical.max },
      severe: { min: payload.severe.min, max: payload.severe.max },
      medium: { min: payload.medium.min, max: payload.medium.max },
      low: { min: payload.low.min, max: payload.low.max },
      is_closed: payload.is_closed,
      close_at: null,
      status: "Active",
      date_post: "10/04/2021",
      max: max,
      min: min,

      totalSubmissions: [
        { label: "Accepted ", value: 0 },
        { label: "Rejected ", value: 0 },
        { label: "Pending ", value: 0 },
      ],
    };
    program.invitations.forEach((hacker) => {
      let task = {
        task_created: user.id,
        task_received: hacker,
        task_type: "invitation",
        status: "",
        task_link: "Private Invitation",
        task_title: "You received an invitation to join a bounty program",
        task_description: program.title,
        task_date: "",
      };
      dispatch("task/addTask", task, { root: true });
    });
    commit("addProgram", program);
  },
  async joinProgram({ state, commit }, payload) {
    let user = dasboard.state.user;
    let param = {
      hacker: user,
      program_id: payload,
    };
    commit("addHackerToProgram", param);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
