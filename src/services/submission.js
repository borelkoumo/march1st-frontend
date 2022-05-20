const { faker } = require("@faker-js/faker");
import apolloClient from "../boot/apollo";
import { CREATE_SUBMISSION, SUBMISSIONS_HACKER } from "../query/submission";
import program from "../store/program";

const _createSubmission = async function (payload) {
  try {
    let submission = {
      submission_title: payload.submission_title,
      submission_level: payload.submission_level,
      submission_target: payload.submission_target,
      submission_text: payload.submission_text,
      attachment_1: "",
      submission_statuses: [],
      program: payload.program,
      hacker: payload.hacker,
    };
    console.log(submission);
    CREATE_SUBMISSION.variables.submission = submission;
    CREATE_SUBMISSION.context.headers.authorization =
      "Bearer " + localStorage.getItem("token");
    const result = await apolloClient.mutate(CREATE_SUBMISSION);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const _mySubmissions = async function (payload) {
  console.log("La valeur de payload dans _mySubmissions", payload);
  try {
    let result = null;
    if (payload.typeUser === "hacker") {
      SUBMISSIONS_HACKER.variables.hackerId = payload.id;
      SUBMISSIONS_HACKER.context.headers.authorization =
        "Bearer " + localStorage.getItem("token");
      result = await apolloClient.query(SUBMISSIONS_HACKER);
      const data = result.data.hacker.data.attributes.submissions.data;
      let sumbmissions = data.map(function (s) {
        /*console.log("s=",s);
        console.log("s.program=",s.attributes.program);*/
        let submission = {};
        submission.id = s.id;
        submission.submission_title = s.attributes.submission_title;
        submission.submission_level = s.attributes.submission_level;
        submission.submission_target = s.attributes.submission_target;
        submission.submission_text = s.attributes.submission_text;

        if (s.attributes.program.data.id) {
          //console.log("La valeur du id dans _mySubmissions",s.attributes.program.data.id)
          let program = { ...s.attributes.program.data.attributes };
          program.id = s.attributes.program.data.id;
          /*program.program_title =
            s.attributes.program.data.attributes.program_title;
          program.program_type =
            s.attributes.program.data.attributes.program_type;
          program.program_picture_url =
            s.attributes.program.data.attributes.program_picture_url;
          program.program_description =
            s.attributes.program.data.attributes.program_description;
          program.reward_range =
            s.attributes.program.data.attributes.reward_range;*/
          program.critical = program.reward_range.critical;
          program.medium = program.reward_range.medium;
          program.severe = program.reward_range.severe;
          program.low = program.reward_range.low;
          submission.program = program;
          console.log(
            "Object.getOwnPropertyDescriptor(submission) = ",
            Object.getOwnPropertyDescriptor(submission, "program")
          );
          console.log("submission.program= ", submission.program);
          /*console.log("La valeur de submission ", submission);
          console.log("La valeur de program ", program);*/
        } else {
          submission.program = null;
        }
        console.log("La valeur de submission ",submission);
        return submission;
      });
      sumbmissions = sumbmissions.filter(
        (s) => s.program !== null || s.program !== undefined
      );
      console.log("La valeur du tableau des submissions dans service",sumbmissions);
      return sumbmissions;
    }
  } catch (error) {
    console.log(error);
  }
};

export { _createSubmission, _mySubmissions };
