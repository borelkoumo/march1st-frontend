const { faker } = require("@faker-js/faker");
import apolloClient from "../boot/apollo";
import {
  CREATE_SUBMISSION,
  CREATE_SUBMISSION_STATUS,
  SUBMISSIONS_HACKER,
  SUBMISSIONS_SUPER_MANAGER,
  SUBMISSIONS_MANAGER,
} from "../query/submission";
import program from "../store/program";

const _createSubmission = async function (payload) {
  try {
    let submission = {
      ...payload,
      attachment_1: "",
    };
    console.log(
      "La submission avant création dans submission service ",
      submission
    );
    CREATE_SUBMISSION.variables.submission = submission;
    CREATE_SUBMISSION.context.headers.authorization =
      "Bearer " + localStorage.getItem("token");
    const result = await apolloClient.mutate(CREATE_SUBMISSION);
    console.log("Id de la cration de submission dans service ", result.data.id);
    return result.data.id;
  } catch (error) {
    console.log(error);
  }
};
const _createSubmissionStatus = async function (payload) {
  try {
    let submissionStatus = {
      status: payload.status,
      status_title: payload.status_text,
      comment: "",
    };
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
      SUBMISSIONS_HACKER.variables.hackerId = payload.id;
      SUBMISSIONS_HACKER.context.headers.authorization =
        "Bearer " + localStorage.getItem("token");
      result = await apolloClient.query(SUBMISSIONS_HACKER);
      const data = result.data.hacker.data.attributes.submissions.data;
      let sumbmissions = data.map(function (s) {
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
      sumbmissions = sumbmissions.filter(
        (s) => s.program !== null || s.program !== undefined
      );
      return sumbmissions;
    } else if (payload.typeUser === "client") {
      if (payload.role === "super_manager") {
        SUBMISSIONS_SUPER_MANAGER.variables.companyId = payload.id;
        SUBMISSIONS_SUPER_MANAGER.context.headers.authorization =
          "Bearer " + localStorage.getItem("token");
        result = await apolloClient.query(SUBMISSIONS_SUPER_MANAGER);
        const programData = result.data.company.data.attributes.programs.data;
        let allSubmissions = [];
        programData.forEach((program) => {
          let sumbmissions = program.attributes.submissions.data.map(function (
            s
          ) {
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
          sumbmissions = sumbmissions.filter(
            (s) => s.program !== null || s.program !== undefined
          );
          allSubmissions = allSubmissions.concat(sumbmissions);
        });
        return allSubmissions;
      } else {
        SUBMISSIONS_MANAGER.variables.companyUserId = payload.id;
        SUBMISSIONS_MANAGER.context.headers.authorization =
          "Bearer " + localStorage.getItem("token");
        result = await apolloClient.query(SUBMISSIONS_MANAGER);
        const programData = result.data.companyUser.data.attributes.programs.data;
        let allSubmissions = [];
        programData.forEach((program) => {
          let sumbmissions = program.attributes.submissions.data.map(function (
            s
          ) {
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
          sumbmissions = sumbmissions.filter(
            (s) => s.program !== null || s.program !== undefined
          );
          allSubmissions = allSubmissions.concat(sumbmissions);
        });
        return allSubmissions;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export { _createSubmission, _mySubmissions, _createSubmissionStatus };
