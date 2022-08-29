const { faker } = require("@faker-js/faker");
import apolloClient from "../../../boot/apollo";
import {
  CREATE_SUBMISSION,
  CREATE_SUBMISSION_STATUS,
  UPDATE_SUBMISSION,
  SUBMISSIONS_HACKER,
  SUBMISSIONS_SUPER_MANAGER,
  SUBMISSIONS_MANAGER,
  SUBMISSIONS_ADMIN,
  ONE_SUBMISSION_QUERY,
  SUBMISSION_STATUS,
} from "./query";

export class SubmissionService {
  static createSubmission(payload) {
    return new Promise(async (resolve, reject) => {
      let submission = {
        submission_title: payload.submission_title,
        submission_target: payload.submission_target,
        submission_text: payload.submission_text,
        severity_level: payload.severity_level,
        program: payload.program_id,
        hacker: payload.hacker_id,
      };
      let token = localStorage.getItem("token");

      CREATE_SUBMISSION.variables.submission = submission;
      CREATE_SUBMISSION.context.headers.authorization = "Bearer " + token;
      const result = await apolloClient.mutate(CREATE_SUBMISSION);
      resolve(result.data.createSubmission.data.id);
    });
  }
  static createSubmissionStatus(submissionStatus) {
    return new Promise(async (resolve, reject) => {
      let token = localStorage.getItem("token");
      CREATE_SUBMISSION_STATUS.variables.submissionStatus = submissionStatus;
      CREATE_SUBMISSION_STATUS.context.headers.authorization =
        "Bearer " + token;
      const result = await apolloClient.mutate(CREATE_SUBMISSION_STATUS);
      resolve(result.data.createSubmissionStatus.data.id);
    });
  }

  static updateSubmission(payload) {
    return new Promise(async (resolve, reject) => {
      let submission = {
        submission_title: payload.submission_title,
        submission_target: payload.submission_target,
        submission_text: payload.submission_text,
        severity_level: payload.severity_level,
      };
      let token = localStorage.getItem("token");

      UPDATE_SUBMISSION.variables.submission = submission;
      UPDATE_SUBMISSION.variables.submissionId = payload.id;
      UPDATE_SUBMISSION.context.headers.authorization = "Bearer " + token;
      const result = await apolloClient.mutate(UPDATE_SUBMISSION);
      resolve(result.data.updateSubmission.data.id);
    });
  }

  static getOneSubmission(submissionId) {
    return new Promise(async (resolve, reject) => {
      let token = localStorage.getItem("token");
      ONE_SUBMISSION_QUERY.variables.submissionId = submissionId;
      ONE_SUBMISSION_QUERY.context.headers.authorization = "Bearer " + token;
      const result = await apolloClient.query(ONE_SUBMISSION_QUERY);
      const submissionData = result.data.submission.data;
      const submission = this.formatSubmission(submissionData);
      resolve(submission);
    });
  }
  /*static getHackerSubmissions(){
    return new Promise(async (resolve, reject) => {
      let token = localStorage.getItem("token");
      SUBMISSIONS_HACKER.context.headers.authorization = "Bearer " + token;
      const result = await apolloClient.query(SUBMISSIONS_HACKER);
      const submissionData = result.data.submissions.data;
      resolve(this.formatSubmissions(submissionData));
    });
  }
  static getSuperAdminSubmissions(){
    return new Promise(async (resolve, reject) => {
      let token = localStorage.getItem("token");
      SUBMISSIONS_SUPER_MANAGER.context.headers.authorization = "Bearer " + token;
      const result = await apolloClient.query(SUBMISSIONS_SUPER_MANAGER);
      const submissionData = result.data.submissions.data;
      resolve(this.formatSubmissions(submissionData));
    });
  }
  static getManagerSubmissions(){
    return new Promise(async (resolve, reject) => {
      let token = localStorage.getItem("token");
      SUBMISSIONS_MANAGER.context.headers.authorization = "Bearer " + token;
      const result = await apolloClient.query(SUBMISSIONS_MANAGER);
      const submissionData = result.data.submissions.data;
      resolve(this.formatSubmissions(submissionData));
    });
  }
  static getAdminSubmissions(){
    return new Promise(async (resolve, reject) => {
      let token = localStorage.getItem("token");
      SUBMISSIONS_ADMIN.context.headers.authorization = "Bearer " + token;
      const result = await apolloClient.query(SUBMISSIONS_ADMIN);
      const submissionData = result.data.submissions.data;
      resolve(this.formatSubmissions(submissionData));
    });
  }*/
  static getMySubmissions(payload) {
    return new Promise(async (resolve, reject) => {
      let token = localStorage.getItem("token");
      let result = [];
      let param = {
        id: payload.id,
        page: 1,
        pageSize: 30,
      };
      SUBMISSIONS_HACKER.variables.hackerId = param.id;
      SUBMISSIONS_HACKER.variables.page = param.page;
      SUBMISSIONS_HACKER.variables.pageSize = param.pageSize;

      SUBMISSIONS_ADMIN.variables.page = param.page;
      SUBMISSIONS_ADMIN.variables.pageSize = param.pageSize;

      SUBMISSIONS_SUPER_MANAGER.variables.page = param.page;
      SUBMISSIONS_SUPER_MANAGER.variables.pageSize = param.pageSize;

      if (payload.role === "hacker") {
        SUBMISSIONS_HACKER.context.headers.authorization = "Bearer " + token;
        result = await apolloClient.query(SUBMISSIONS_HACKER);
      } else if (payload.role === "march1st") {
        SUBMISSIONS_ADMIN.context.headers.authorization = "Bearer " + token;
        result = await apolloClient.query(SUBMISSIONS_ADMIN);
      } else if (payload.role === "program_manager") {
        SUBMISSIONS_MANAGER.context.headers.authorization = "Bearer " + token;
        result = await apolloClient.query(SUBMISSIONS_MANAGER);
      } else if (payload.role === "program_super_admin") {
        SUBMISSIONS_SUPER_MANAGER.variables.companyId = payload.company;
        SUBMISSIONS_SUPER_MANAGER.context.headers.authorization =
          "Bearer " + token;
        result = await apolloClient.query(SUBMISSIONS_SUPER_MANAGER);
      }
      console.log("getMySubmissions /result = ", result);
      const submissionData = result.data.submissions.data;
      resolve(this.formatSubmissions(submissionData));
    });
  }
  static getSubmissionStatus(payload) {
    return new Promise(async (resolve, reject) => {
      let token = localStorage.getItem("token");
      SUBMISSION_STATUS.variables.submissionId = payload;
      SUBMISSION_STATUS.context.headers.authorization = "Bearer " + token;
      const result = await apolloClient.query(SUBMISSION_STATUS);
      const submissionStatusData = result.data.submissionStatuses.data;
      const submissionStatus =
        this.formatSubmissionStatus(submissionStatusData);
      console.log("getSubmissionStatus/submissionStatus = ", submissionStatus);
      resolve(submissionStatus);
    });
  }

  /*======================================================================*/
  /*                      FORMAT FUNCTIONS                                */
  /*======================================================================*/

  static formatSubmissions(submissionsData) {
    const url = "https://strapi.march1st.com"
    const submissions = submissionsData.map(function (element) {
      console.log("element = ", element);
      console.log("element.attributes.program = ",element.attributes.program);
      return {
        id: element.id,
        submission_title: element.attributes.submission_title,
        submission_level: element.attributes.severity_level,
        submission_target: element.attributes.submission_target,
        submission_text: element.attributes.submission_text,
        createdAt: element.attributes.createdAt,
        attachments:element.attributes.attachment.data.map((attachment)=>{
          return{
            id:attachment.id,
            name:attachment.attributes.name,
            url:url+attachment.attributes.url,
            size:attachment.attributes.size
          }
        }),
        submission_status:element.attributes.submission_statuses.data[0]?
          element.attributes.submission_statuses.data[0].attributes.status:"Undefined",
        submission_status_title:element.attributes.submission_statuses.data[0]?
          element.attributes.submission_statuses.data[0].attributes
            .status_title:"Undefined",
        submission_statuses: element.attributes.submission_statuses.data.map(
          function (sub_statut) {
            return {
              id: sub_statut.id,
              status: sub_statut.attributes.status,
              status_title: sub_statut.attributes.status_title,
              comment:sub_statut.attributes.comment
            };
          }
        ),
        program: {
          ...element.attributes.program.data.attributes,
          id: element.attributes.program.data.id,
          critical:
            element.attributes.program.data.attributes.reward_range.critical,
          low: element.attributes.program.data.attributes.reward_range.low,
          severe:
            element.attributes.program.data.attributes.reward_range.severe,
          medium:
            element.attributes.program.data.attributes.reward_range.medium,
        },

      };
    });
    return submissions;
  }
  static formatSubmission(element) {
    const url = "https://strapi.march1st.com"
    return {
      id: element.id,
      submission_title: element.attributes.submission_title,
      submission_level: element.attributes.severity_level,
      submission_target: element.attributes.submission_target,
      submission_text: element.attributes.submission_text,
      createdAt: element.attributes.createdAt,
      attachments:element.attributes.attachment.data.map((attachment)=>{
        return{
          id:attachment.id,
          name:attachment.attributes.name,
          url:url+attachment.attributes.url,
          size:attachment.attributes.size
        }
      }),
      submission_status:
        element.attributes.submission_statuses.data[0].attributes.status,
      submission_status_title:
        element.attributes.submission_statuses.data[0].attributes.status_title,
      submission_statuses: element.attributes.submission_statuses.data.map(
        function (sub_statut) {
          return {
            id: sub_statut.id,
            status: sub_statut.attributes.status,
            status_title: sub_statut.attributes.status_title,
            comment:sub_statut.attributes.comment
          };
        }
      ),
      program: {
        ...element.attributes.program.data.attributes,
        id: element.attributes.program.data.id,
        critical:
          element.attributes.program.data.attributes.reward_range.critical,
        low: element.attributes.program.data.attributes.reward_range.low,
        severe: element.attributes.program.data.attributes.reward_range.severe,
        medium: element.attributes.program.data.attributes.reward_range.medium,
      },
    };
  }
  static formatSubmissionStatus(submissionsData) {
    const submissionsStatus = submissionsData.map(function (element) {
      return {
        id: element.id,
        status: element.attributes.status,
        status_title: element.attributes.status_title,
        comment: element.attributes.comment,
        createdAt: element.attributes.createdAt,
        submission: element.attributes.submission.data.id,
      };
    });
    return submissionsStatus;
  }
}
