const { faker } = require("@faker-js/faker");
import apolloClient from "../boot/apollo";
import {
  CREATE_SUBMISSION,
  CREATE_SUBMISSION_STATUS,
  SUBMISSIONS_HACKER,
  SUBMISSIONS_SUPER_MANAGER,
  SUBMISSIONS_MANAGER,
  SUBMISSIONS_ADMIN,
} from "../query/submission";
import program from "../store/program";

const _createSubmission = async function (payload) {
  try {
    let submission = {
      ...payload,
      attachment_1: "",
    };
    /* console.log(
      "La submission avant création dans submission service ",
      submission
    ); */
    CREATE_SUBMISSION.variables.submission = submission;
    CREATE_SUBMISSION.context.headers.authorization =
      "Bearer " + localStorage.getItem("token");
    const result = await apolloClient.mutate(CREATE_SUBMISSION);
    console.log(
      "Id de la cration de submission dans service ",
      result.data.createSubmission.data.id
    );
    return result.data.createSubmission.data.id;
  } catch (error) {
    console.log(error);
  }
};
const _createSubmissionStatus = async function (payload) {
  try {
    let submissionStatus = {
      status: payload.status,
      status_title: payload.status_title,
      comment: "",
    };
    if(payload.submissionId){
      submissionStatus.submission=payload.submissionId
    }
    //console.log(payload);
    CREATE_SUBMISSION_STATUS.variables.submissionStatus = submissionStatus;
    CREATE_SUBMISSION_STATUS.context.headers.authorization =
      "Bearer " + localStorage.getItem("token");
    const result = await apolloClient.mutate(CREATE_SUBMISSION_STATUS);
    return result.data.createSubmissionStatus.data.id;
  } catch (error) {
    console.log("Creation de submisssionStatus ", error);
  }
};

const _mySubmissions = async function (payload) {
  try {
    let result = null;
    if (payload.typeUser === "hacker") {
      SUBMISSIONS_HACKER.variables.page = payload.pagination.page;
      SUBMISSIONS_HACKER.variables.pageSize = payload.pagination.pageSize;
      SUBMISSIONS_HACKER.variables.hackerId = payload.id;
      SUBMISSIONS_HACKER.context.headers.authorization =
        "Bearer " + localStorage.getItem("token");
      result = await apolloClient.query(SUBMISSIONS_HACKER);
      const submissionData = result.data.submissions.data;
      let submissions = [];
      submissions = submissionData.map(function (s) {
        let submission = {};
        submission.id = s.id;
        submission.submission_title = s.attributes.submission_title;
        submission.submission_level = s.attributes.severity_level;
        submission.submission_target = s.attributes.submission_target;
        submission.submission_text = s.attributes.submission_text;

        const statusesData = s.attributes.submission_statuses.data;
        if (statusesData.length > 0) {
          submission.submission_status =
            statusesData[0].attributes.status_title;
          let statuses = statusesData.map(function (s) {
            let statusSubmission = {};
            statusSubmission.id = s.id;
            statusSubmission.status = s.attributes.status;
            statusSubmission.status_title = s.attributes.status_title;
            statusSubmission.createdAt = s.attributes.createdAt;
            return statusSubmission;
          });
          submission.statuses = statuses;
        } else {
          submission.submission_status = "Unknow Status";
        }

        if (s.attributes.program.data.id) {
          let program = { ...s.attributes.program.data.attributes };
          program.id = s.attributes.program.data.id;
          program.critical = program.reward_range.critical;
          program.medium = program.reward_range.medium;
          program.severe = program.reward_range.severe;
          program.low = program.reward_range.low;
          submission.program = program;
        } else {
          submission.program = null;
        }
        return submission;
      });
      submissions = submissions.filter(
        (s) => s.program !== null || s.program !== undefined
      );
      const pagination = result.data.submissions.meta.pagination;
      return { pagination, submissions };
    } else if (payload.typeUser === "client") {
      if (payload.role === "super_manager") {
        SUBMISSIONS_SUPER_MANAGER.variables.page = payload.pagination.page;
        SUBMISSIONS_SUPER_MANAGER.variables.pageSize =
          payload.pagination.pageSize;
        SUBMISSIONS_SUPER_MANAGER.variables.companyId = payload.id;
        SUBMISSIONS_SUPER_MANAGER.context.headers.authorization =
          "Bearer " + localStorage.getItem("token");
        result = await apolloClient.query(SUBMISSIONS_SUPER_MANAGER);
        const submissionData = result.data.submissions.data;
        let submissions = [];
        submissions = submissionData.map(function (s) {
          let submission = {};
          submission.id = s.id;
          submission.submission_title = s.attributes.submission_title;
          submission.submission_level = s.attributes.severity_level;
          submission.submission_target = s.attributes.submission_target;
          submission.submission_text = s.attributes.submission_text;

          const statusesData = s.attributes.submission_statuses.data;
          if (statusesData.length > 0) {
            submission.submission_status =
              statusesData[0].attributes.status_title;
            let statuses = statusesData.map(function (s) {
              let statusSubmission = {};
              statusSubmission.id = s.id;
              statusSubmission.status = s.attributes.status;
              statusSubmission.status_title = s.attributes.status_title;
              statusSubmission.createdAt = s.attributes.createdAt;
              return statusSubmission;
            });
            submission.statuses = statuses;
          } else {
            submission.submission_status = "Unknow Status";
          }

          if (s.attributes.program.data.id) {
            let program = { ...s.attributes.program.data.attributes };
            program.id = s.attributes.program.data.id;
            program.critical = program.reward_range.critical;
            program.medium = program.reward_range.medium;
            program.severe = program.reward_range.severe;
            program.low = program.reward_range.low;
            submission.program = program;
          } else {
            submission.program = null;
          }
          return submission;
        });
        submissions = submissions.filter(
          (s) => s.program !== null || s.program !== undefined
        );
        const pagination = result.data.submissions.meta.pagination;
        return { pagination, submissions };
      } else {
        SUBMISSIONS_MANAGER.variables.page = payload.pagination.page;
        SUBMISSIONS_MANAGER.variables.pageSize =
          payload.pagination.pageSize;
        SUBMISSIONS_MANAGER.variables.companyUserId = payload.id;
        SUBMISSIONS_MANAGER.context.headers.authorization =
          "Bearer " + localStorage.getItem("token");
        result = await apolloClient.query(SUBMISSIONS_MANAGER);
        const submissionData = result.data.submissions.data;
        let submissions = [];
        submissions = submissionData.map(function (s) {
          let submission = {};
          submission.id = s.id;
          submission.submission_title = s.attributes.submission_title;
          submission.submission_level = s.attributes.severity_level;
          submission.submission_target = s.attributes.submission_target;
          submission.submission_text = s.attributes.submission_text;

          const statusesData = s.attributes.submission_statuses.data;
          if (statusesData.length > 0) {
            submission.submission_status =
              statusesData[0].attributes.status_title;
            let statuses = statusesData.map(function (s) {
              let statusSubmission = {};
              statusSubmission.id = s.id;
              statusSubmission.status = s.attributes.status;
              statusSubmission.status_title = s.attributes.status_title;
              statusSubmission.createdAt = s.attributes.createdAt;
              return statusSubmission;
            });
            submission.statuses = statuses;
          } else {
            submission.submission_status = "Unknow Status";
          }

          if (s.attributes.program.data.id) {
            let program = { ...s.attributes.program.data.attributes };
            program.id = s.attributes.program.data.id;
            program.critical = program.reward_range.critical;
            program.medium = program.reward_range.medium;
            program.severe = program.reward_range.severe;
            program.low = program.reward_range.low;
            submission.program = program;
          } else {
            submission.program = null;
          }
          return submission;
        });
        submissions = submissions.filter(
          (s) => s.program !== null || s.program !== undefined
        );
        const pagination = result.data.submissions.meta.pagination;
        return { pagination, submissions };
      }
    } else if (payload.typeUser === "admin") {
      SUBMISSIONS_ADMIN.variables.page = payload.pagination.page;
      SUBMISSIONS_ADMIN.variables.pageSize = payload.pagination.pageSize;
      SUBMISSIONS_ADMIN.context.headers.authorization =
        "Bearer " + localStorage.getItem("token");
      result = await apolloClient.query(SUBMISSIONS_ADMIN);
      const submissionData = result.data.submissions.data;
      //console.log("la valeur de result dans submission", submissionData);
      let submissions = [];
      submissions = submissionData.map(function (s) {
        let submission = {};
        submission.id = s.id;
        submission.submission_title = s.attributes.submission_title;
        submission.submission_level = s.attributes.severity_level;
        submission.submission_target = s.attributes.submission_target;
        submission.submission_text = s.attributes.submission_text;

        const statusesData = s.attributes.submission_statuses.data;
        if (statusesData.length > 0) {
          submission.submission_status =
            statusesData[0].attributes.status_title;
          let statuses = statusesData.map(function (s) {
            //console.log("la valeur de s.id=",s.id)
            let statusSubmission = {};
            statusSubmission.id = s.id;
            statusSubmission.status = s.attributes.status;
            statusSubmission.status_title = s.attributes.status_title;
            statusSubmission.createdAt = s.attributes.createdAt;
            //console.log("la valeur de statusSubmission=",statusSubmission)
            return statusSubmission;
          });
          submission.statuses = statuses;
          //console.log("submission.statues = ",submission.statuses)
        } else {
          submission.submission_status = "Unknow Status";
        }
        //console.log("s.attributes.program.data=",s.attributes.program);
        if (s.attributes.program.data) {
          //console.log("la valeur de s dans a",s.attributes.program.data);
          let program = { ...s.attributes.program.data.attributes };
          //console.log("La valeur de program",program);
          program.id = s.attributes.program.data.id;

          program.critical = program.reward_range.critical;
          program.medium = program.reward_range.medium;
          program.severe = program.reward_range.severe;
          program.low = program.reward_range.low;
          submission.program = program;
        } else {
          submission.program = null;
          //console.log("le program est null")
        }
        return submission;
      });
      //console.log("La valeur de submission")
      const allSubmissions = submissions.filter(
        (s) => s.program !== null || s.program !== undefined
      );
      //console.log(allSubmissions);
      const pagination = result.data.submissions.meta.pagination;
      //console.log("La valeur de pagination",pagination)
      //submissions = submissions.filter((s)=>s.program!=null)
      return { pagination,  submissions:allSubmissions};
    }
  } catch (error) {
    console.log(error);
  }
};

export { _createSubmission, _mySubmissions, _createSubmissionStatus };
