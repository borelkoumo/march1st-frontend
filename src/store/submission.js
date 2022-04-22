import { apolloClient } from "./utils/apollo";
import dasboard from "./dashboard";
import gql from "graphql-tag";
import program from "./program";

//const programs =program.state.programs;
//const user = dasboard.state.user;

const state = {
  submissions: [],
  submissionStatus: [],
};

const getters = {
  getMySubmissions(state) {
    let programs =program.state.programs;
    let user = dasboard.state.user;
    console.log(user);
    let mySubmissions = [];
    if (user.typeUser == "hacker") {
      mySubmissions = state.submissions.filter(
        (submission) => submission.hacker_id == user.id
      );
    } else if (user.typeUser == "client") {
      mySubmissions = state.submissions.filter(
        (submission) => submission.client_id == user.id
      );
      let submissionTriaged= mySubmissions.map((submission)=>{
        let allStatus = state.submissions.filter(s => s.submission_id==submission.id && s.status=="triaged")
        if(allStatus.length>0) return submission;
      })
      mySubmissions=submissionTriaged;
    } else if (user.typeUser == "admin") {
      const myPrograms = programs.map((program) => {
        if (program.managersId.includes(user.id)) return program;
      });
      myPrograms.forEach((program) => {
        mySubmissions = mySubmissions.concat(
          state.submissions.filter((s) => s.program_id == program.id)
        );
      });
      //return (mySubmissions = state.submissions);
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
  getStatusSubmission(state) {
    return (id) => {
      let val = "";
      state.submissionStatus.forEach((s) => {
        console.log(s);
        if (s.id == id) val = s;
      });
      /* switch (val.status) {
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
      } */
      return val.status_text;
    };
  },
  getAllStatus(state) {
    return (id) => {
      return state.submissionStatus.filter(
        (status) => status.submission_id == id
      );
    };
  },
  getSubmissionsProgram(state) {
    return (id) => {
      let submissions = [];
      submissions = state.submissions.filter(
        (submission) => submission.program_id == id
      );
      return JSON.parse(JSON.stringify(submissions));
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
    payload.vulnerability_status="in_review"
    payload.submissionStatus_id = Math.floor(Math.random() * 500);
    let statusSumission = {
      status: "new",
      status_text: "New Report Submission",
      submission_id: payload.id,
      id: payload.submissionStatus_id,
      status_raison: "",
      created_at: "",
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
