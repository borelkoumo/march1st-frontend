const { faker } = require("@faker-js/faker");
import apolloClient from "../../../boot/apollo";
import {
  CREATE_SUBMISSION,
  CREATE_SUBMISSION_STATUS,
  SUBMISSIONS_HACKER,
  SUBMISSIONS_SUPER_MANAGER,
  SUBMISSIONS_MANAGER,
  SUBMISSIONS_ADMIN,
} from './query';

export class SubmissionService{
  static async getAllSubmissions(){

  }
  static async createSubmission(payload){
    let submission = {
      submission_title:payload.submission_title,
      submission_target:payload.submission_target,
      submission_text:payload.submission_text,
      severity_level:payload.severity_level,
      program:payload.program_id,
      hacker:payload.hacker_id
    };
    let token = localStorage.getItem("token");

    CREATE_SUBMISSION.variables.submission = submission;
    CREATE_SUBMISSION.context.headers.authorization ="Bearer " + token;
    const result = await apolloClient.mutate(CREATE_SUBMISSION);
    return result.data.createSubmission.data.id;
  }
  static async createSubmissionStatus(submissionStatus){
    let token = localStorage.getItem("token");

    CREATE_SUBMISSION_STATUS.variables.submissionStatus = submissionStatus;
    CREATE_SUBMISSION_STATUS.context.headers.authorization ="Bearer " + token;
    const result = await apolloClient.mutate(CREATE_SUBMISSION_STATUS);
    //console.log(submission);
    return result;
  }
  static async getOneSubmission(submissionId){

  }



  /*======================================================================*/
  /*                      FORMAT FUNCTIONS                                */
  /*======================================================================*/

  static formatPrograms(programsData){
    const programs = programsData.map(function(element){
      let program={
        id:element.id,
        closed_at: null,
        company: element.attributes.company.data.id,
        managers: element.attributes.company_users.data.map(function(cu){
          return {
            id:cu.id,
            first_name:cu.attributes.first_name
          }
        }),
        createdAt: element.attributes.createdAt,
        hackers: element.attributes.hackers.data.map(function(hacker){
          return hacker.id
        }),
        invitations: element.attributes.invitations.data.map(function(invitation){
          return invitation.id
        }),
        is_closed: element.attributes.is_closed,
        legal_terms: element.attributes.legal_terms,
        program_description: element.attributes.program_description,
        program_guidelines_1: element.attributes.program_guidelines_1,
        program_guidelines_2: element.attributes.program_guidelines_2,
        program_picture_url: element.attributes.program_picture_url,
        program_scope: element.attributes.program_scope,
        program_title: element.attributes.program_title,
        program_type: element.attributes.program_type,
        reward_guidelines: element.attributes.reward_guidelines,
        reward_range: element.attributes.reward_range,
        low:element.attributes.reward_range.low,
        medium:element.attributes.reward_range.medium,
        critical:element.attributes.reward_range.critical,
        severe:element.attributes.reward_range.severe,
        reward_type: element.attributes.reward_type,
        safe_harbour_type: element.attributes.safe_harbour_type,
        submissions:element.attributes.submissions.data.map(function(sub){
          let submission={
            id:sub.id,
            submission_text:sub.attributes.submission_text,
            submission_title:sub.attributes.submission_title,
            severity_level:sub.attributes.severity_level,
            submission_target:sub.attributes.submission_target,
            submission_status:sub.attributes.submission_statuses.data[0].attributes.status,
            submission_statuses:sub.attributes.submission_statuses.data.map(function(sub_statut){
              return{
                id:sub_statut.id,
                status:sub_statut.attributes.status,
                status_title:sub_statut.attributes.status_title
              }
            })
          }
          return submission
        })
      }
      return program;
    })
    return programs;
  }
  static formatProgram(element){
    return {
        id:element.id,
        closed_at: null,
        company: element.attributes.company.data.id,
        managers: element.attributes.company_users.data.map(function(cu){
          return {
            id:cu.id,
            first_name:cu.attributes.first_name
          }
        }),
        createdAt: element.attributes.createdAt,
        hackers: element.attributes.hackers.data.map(function(hacker){
          return hacker.id
        }),
        invitations: element.attributes.invitations.data.map(function(invitation){
          return invitation.id
        }),
        is_closed: element.attributes.is_closed,
        legal_terms: element.attributes.legal_terms,
        program_description: element.attributes.program_description,
        program_guidelines_1: element.attributes.program_guidelines_1,
        program_guidelines_2: element.attributes.program_guidelines_2,
        program_picture_url: element.attributes.program_picture_url,
        program_scope: element.attributes.program_scope,
        program_title: element.attributes.program_title,
        program_type: element.attributes.program_type,
        reward_guidelines: element.attributes.reward_guidelines,
        reward_range: element.attributes.reward_range,
        low:element.attributes.reward_range.low,
        medium:element.attributes.reward_range.medium,
        critical:element.attributes.reward_range.critical,
        severe:element.attributes.reward_range.severe,
        reward_type: element.attributes.reward_type,
        safe_harbour_type: element.attributes.safe_harbour_type,
        submissions:element.attributes.submissions.data.map(function(sub){
          let submission={
            id:sub.id,
            submission_text:sub.attributes.submission_text,
            submission_title:sub.attributes.submission_title,
            severity_level:sub.attributes.severity_level,
            submission_target:sub.attributes.submission_target,
            submission_status:sub.attributes.submission_statuses.data[0].attributes.status,
            submission_statuses:sub.attributes.submission_statuses.data.map(function(sub_statut){
              return{
                id:sub_statut.id,
                status:sub_statut.attributes.status,
                status_title:sub_statut.attributes.status_title
              }
            })
          }
          return submission
        })
    }
  }
}
