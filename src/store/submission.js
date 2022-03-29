import { apolloClient } from "./utils/apollo";
import dasboard from "./dashboard";
import gql from "graphql-tag";
import program from "./program";

const state = {
  submissions: [],
};

const getters = {
  getMySubmissions(state) {
    let user = dasboard.state.user;
    let mySubmissions = [];
    let allSubmissions = localStorage.getItem("submissions");
    if (allSubmissions) {
      allSubmissions = JSON.parse(allSubmissions);
      if (user.typeUser == "hacker") {
        allSubmissions.forEach((submission) => {
          if (submission.hacker_id == user.id) {
            mySubmissions.push(submission);
          }
        });
      } else if (user.typeUser == "client") {
        let user = dasboard.state.user;
        allSubmissions.forEach((submission) => {
          if (submission.client_id == user.id) {
            mySubmissions.push(submission);
          }
        });
      }
    }
    return JSON.parse(JSON.stringify(mySubmissions));
  },
  getSubmission(state) {
    return (id) => {
      let submission = {};
      let allSubmissions = localStorage.getItem("submissions");
      if (allSubmissions) {
        allSubmissions = JSON.parse(allSubmissions);
        allSubmissions.forEach((s) => {
          if (s.id == id) submission = JSON.parse(JSON.stringify(s));
        });
      }

      return submission;
    };
  },
  getSubmissions(state) {
    let allSubmissions = localStorage.getItem("submissions");
    if (allSubmissions) {
      allSubmissions = JSON.parse(allSubmissions);
      return allSubmissions;
    } else {
      return JSON.parse(JSON.stringify(state.submissions));
    }
  },
};

const mutations = {
  setNewReport(state, payload) {
    let submissions = localStorage.getItem("submissions");
    if (submissions) {
      submissions = JSON.parse(submissions);
      submissions.push(payload);
      state.submissions = submissions;
      localStorage.setItem("submissions", submissions);
    } else {
      state.submissions.push(payload);
      localStorage.setItem("submissions", JSON.stringify(state.submissions));
    }
  },
  /* addReport(state, payload) {
    state.submission.push(payload);
  }, */
};

const actions = {
  async addReport({ state, commit }, payload) {
    payload.id = Math.floor(Math.random() * 500);
    payload.severety_level = payload.severety_level.value;
    commit("setNewReport", payload);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
