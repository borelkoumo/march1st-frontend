const { faker } = require("@faker-js/faker");
import apolloClient from "../boot/apollo";
import {CREATE_SUBMISSION } from "../query/submission";

const _createSubmission = async function(payload){
    try {
      let submission ={
        submission_title:payload.submission_title,
        submission_level:payload.submission_level,
        submission_target:payload.submission_target,
        submission_text:payload.submission_text,
        attachment_1:"",
        submission_statuses:[],
        program:payload.program,
        hacker:payload.hacker
      }
      console.log(submission);
      CREATE_SUBMISSION.variables.submission = submission;
      CREATE_SUBMISSION.context.headers.authorization =
        "Bearer " + localStorage.getItem("token");
        const result = await apolloClient.mutate(CREATE_SUBMISSION);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  
  export {_createSubmission };