import { SubmissionService } from "./api/submissionGraph";

const state = {
  submissions: [],
  mySubmissions: [],
  submissionsStatus: [],
};
const getters = {
  getAllSubmissions() {
    return state.submissions;
  },
  getOneSubmission(state, id) {
    return (id) => {
      let submissionData = state.submissions.filter(
        (submission) => submission.id == id
      );
      if (submissionData.length > 0) return submissionData[0];
      return null;
    };
  },
  getMySubmissions() {
    return state.mySubmissions;
  },
};
const mutations = {
  SET_SUBMISSIONS(state, submissions) {
    state.submissions = JSON.parse(JSON.stringify(submissions));
  },
  SET_MY_SUBMISSIONS(state, submissions) {
    state.mySubmissions = submissions;
  },
};
const actions = {
  async CREATE_SUBMISSION({ commit, dispatch }, formData) {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    if (user) {
      formData.hacker_id = user.hacker.id;
      const submissionId = await SubmissionService.createSubmission(formData);
      //create submissionStatus
      let submissionStatus = {
        status_title: "New Report Submission",
        comment: "",
        status: "new",
        submission: submissionId,
      };
      const result = await SubmissionService.createSubmissionStatus(
        submissionStatus
      );
    }
    await dispatch('GET_MY_SUBMISSIONS');
  },
  async UPDATE_SUBMISSION({ commit, dispatch }, formData) {},
  async GET_ALL_SUBMISSIONS({ commit, dispatch }) {
    const submissions = localStorage.getItem("submissions")
      ? JSON.parse(localStorage.getItem("submissions"))
      : [];
    await commit("SET_SUBMISSIONS", submissions);
  },
  async GET_MY_SUBMISSIONS({ commit, dispatch }) {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    //const submissions = localStorage.getItem('submissions')?JSON.parse(localStorage.getItem('submissions')):[];
    if (user) {
      let payload = {
        role: null,
      };
      if (user.role === "hacker") {
        payload.role = "hacker";
        payload.id= user.hacker.id;
      } else if (user.role === "client") {
        payload.id= user.companyUser.id;
        if (user.type === "super_manager") {
          payload.role = "program_super_admin";
        } else {
          payload.role = "program_manager";
        }
      } else if (user.role === "march1st") {
        payload.role = "march1st";
        payload.id= user.march1st.id;
      }
      const mySubmissions = await SubmissionService.getMySubmissions(payload);
      await commit("SET_MY_SUBMISSIONS", mySubmissions);
    }
  },
  async GET_SUBMISSIONSTATUS_BY_SUBMISSION({ commit }, idSubmission) {
    const allSubmissionStatus = localStorage.getItem("submissionStatus")
      ? JSON.parse(localStorage.getItem("submissionStatus"))
      : [];
    console.log(allSubmissionStatus);
    const data = await allSubmissionStatus.filter(
      (submissionStatus) => submissionStatus.submission == idSubmission
    );
    return data;
  },
  async GET_ONE_SUBMISSION({commit}, submissionId){
    const submission = await SubmissionService.getOneSubmission(submissionId);
    return submission;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
