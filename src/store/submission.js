import { apolloClient } from "./utils/apollo";
import dasboard from "./dashboard";
import gql from "graphql-tag";
import program from "./program";

const state = {
  submissions: [],
  submissionStatus: [],
};

const getters = {
  getMySubmissions(state) {
    let user = dasboard.state.user;
    let mySubmissions = [];
    if (user.typeUser == "hacker") {
      mySubmissions = state.submissions.filter(
        (submission) => submission.hacker_id == user.id
      );
    } else if (user.typeUser == "client") {
      mySubmissions = state.submissions.filter(
        (submission) => submission.client_id == user.id
      );
    } else if (user.typeUser == "admin") {
      return (mySubmissions = state.submissions);
    }
    return JSON.parse(JSON.stringify(mySubmissions));
  },
  getSubmission(state) {
    return (id) => {
      let submission = {};
      state.submissions.forEach((s) => {
        if (s.id == id) submission = JSON.parse(JSON.stringify(s));
      });
      return submission;
    };
  },
  getStatusSubmission() {
    return (id) => {
      let val = "";
      let status = "";
      state.submissionStatus.forEach((s) => {
        console.log(s);
        if (s.id == id) val = s;
      });
      switch (val.status) {
        case "new_report":
          status = "New Report Submission";
          break;
        case "returned_for_clarifications":
          status = "M1 Returned For Clarifications";
          break;
        case "resubmitted_with_clarifications":
          status = "Resubmitted With Clarifications";
          break;
        case "passed_triage":
          status = "Passed Triage";
          break;
        case "client_returned_for_clarifications":
          status = "Client Returned For Clarifications";
          break;
        case "submission_accepted":
          status = "Submission Accepted";
          break;
        case "payement_ok":
          status = "M1 made payment";
          break;
        default:
          status = "Rejected Submission";
          break;
      }
      return status;
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
    state.submissions.push(payload);
  },
  addStatus(state, payload) {
    state.submissionStatus.push(payload);
  },
};

const actions = {
  async addReport({ state, commit }, payload) {
    payload.id = Math.floor(Math.random() * 500);
    payload.severety_level = payload.severety_level.value;
    payload.submissionStatus_id = Math.floor(Math.random() * 500);
    let statusSumission = {
      status: "new_report",
      submission_id: payload.id,
      id: payload.submissionStatus_id,
    };
    commit("addStatus", statusSumission);
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
