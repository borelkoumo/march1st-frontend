import dasboard from "./dashboard";
import program from "./program";
import {
  _createSubmission,
  _createSubmissionStatus,
  _mySubmissions,
  __createSubmissionStatus,
} from "../services/submission";

//const programs =program.state.programs;
/* const user = dasboard.state.user; */

const state = {
  submissions: [],
  submissionStatus: [],
  comments: [],
};

const getters = {
  getMySubmissions(state) {
    let programs = program.state.programs;
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
      let submissionTriaged = [];
      mySubmissions.forEach((submission) => {
        let allStatus = state.submissionStatus.filter(
          (s) => s.submission_id == submission.id && s.status == "triaged"
        );
        if (allStatus.length > 0) submissionTriaged.push(submission);
      });
      /* let submissionTriaged = mySubmissions.map((submission) => {
        let allStatus = state.submissionStatus.filter(
          (s) => s.submission_id == submission.id && s.status == "triaged"
        );
        console.log(allStatus);
        console.log(submission);
        if (allStatus.length > 0) return submission;
      }); */
      console.log(submissionTriaged);
      mySubmissions = submissionTriaged;
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
        if (s.id == id) val = s;
      });
      return val.status_text;
    };
  },
  getReelStatus(state) {
    return (id) => {
      let val = "";
      state.submissionStatus.forEach((s) => {
        if (s.id == id) val = s;
      });
      return val.status;
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

  getComments(state) {
    return (id) => {
      return state.comments.filter((comment) => comment.submission_id == id);
    };
  },
};

const mutations = {
  setNewReport(state, payload) {
    state.submissions.push(payload);
  },
  addStatus(state, payload) {
    state.submissionStatus.push(payload);
  },
  updateSubmission(state, payload) {
    state.submissions.forEach((submission) => {
      if (submission.id == payload.id) {
        submission.submissionStatus_id = payload.submissionStatus_id;
        submission.submission_status = payload.status_top;
      }
    });
  },
  addComment(state, payload) {
    state.comments.push(payload);
  },
  setSubmissions(state, payload) {
    state.submissions = payload;
  },
};

const actions = {
  async addReport({ state, commit }, payload) {
    const user = dasboard.state.user;
    payload.severety_level = payload.severety_level.value;
    payload.submission_status = "Pending";
    payload.comments = [];
    let submissionStatus = {
      status: "new",
      status_text: "New Report Submission",
      status_raison: "",
      created_at: "",
    };
    //commit("addStatus", statusSumission);
    //commit("setNewReport", payload);
    try {
      const submissionStatusId = await _createSubmissionStatus(
        submissionStatus
      );
      //console.log("Valeur de submissionStatusId dans store ",submissionStatusId)
      let submission = {
        submission_title: payload.submission_title,
        severity_level: payload.severety_level.toLowerCase(),
        submission_target: payload.submission_target,
        submission_text: payload.submission_text,
        submission_statuses: [submissionStatusId],
        program: payload.program_id,
        hacker: user.hacker.id,
      };
      const submissionId = await _createSubmission(submission);
      console.log("La valeur de submission Id dans store",submissionId)
    } catch (error) {
      console.log("Création de submission ", error);
    }
  },
  async changeStatus({ state, commit }, payload) {
    payload.submissionStatus_id = Math.floor(Math.random() * 500);

    let statusSumission = {
      status: payload.status,
      status_text: payload.status_text,
      submission_id: payload.id,
      id: payload.submissionStatus_id,
      status_raison: "",
      created_at: "",
    };
    // Add Comment

    let user = dasboard.state.user;
    let comment = {
      id: Math.floor(Math.random() * 500),
      user_id: user.id,
      submission_id: payload.id,
      message: payload.message,
    };
    commit("addStatus", statusSumission);
    commit("updateSubmission", payload);
    if (comment.message != null && comment.message != "")
      commit("addComment", comment);
  },
  async mySubmissions({ state, commit }, payload) {
    let user = dasboard.state.user;
    try {
      let result = null;
      if (user.typeUser === "hacker") {
        result = await _mySubmissions({
          id: user.hacker.id,
          typeUser: "hacker",
          pagination:payload
        });
        commit("setSubmissions", result.submissions);
        return Promise.resolve(result);
      }
      else if(user.typeUser==="client"){
        result = await _mySubmissions({
          id: user.role==="super_manager"?user.company.id:user.company_user.id,
          typeUser: "client",
          role:user.role,
          pagination:payload
        });
        commit("setSubmissions", result.submissions);
        return Promise.resolve(result);
      }
      else if(user.typeUser==="admin"){
        result = await _mySubmissions({
          typeUser: "admin",
          pagination:payload
        });
        commit("setSubmissions", result.submissions);
        console.log(result)
        return Promise.resolve(result);
      }
    } catch (error) {}
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
