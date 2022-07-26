const { faker } = require("@faker-js/faker");
import apolloClient from "../../../boot/apollo";
import {
  PROGRAMS_QUERY,
  SUPER_MANAGER_PROGRAM,
  ONE_PROGRAM_QUERY,
  JOIN_PROGRAM_MUTATION,
  CREATE_PROGRAM,
  CREATE_INVITATION
} from './query';

export class ProgramService{
  static async createProgram(payload){
    let program = {
      program_title: payload.program_title,
      program_description: payload.program_description,
      program_type: payload.program_type,
      safe_harbour_type: payload.safe_harbour_type,
      reward_type: payload.reward_type,
      reward_range:payload.reward_range,
      program_guidelines_1: payload.program_guidelines_1,
      program_guidelines_2: payload.program_guidelines_2,
      program_scope: payload.program_scope,
      legal_terms: payload.legal_terms,
      is_closed: false,
      company: payload.company,
      company_users:payload.company_users,
      hackers: payload.hackers,
      program_picture_url: faker.image.business(1234, 2345),
      submissions:[]
    };
    let token = localStorage.getItem("token");

    CREATE_PROGRAM.variables.program = program;
    CREATE_PROGRAM.context.headers.authorization ="Bearer " + token;
    const result = await apolloClient.mutate(CREATE_PROGRAM);
    //console.log(result);
    return result.data.createProgram.data.id;
  }
  static async getSuperManagerPrograms(companyId){
    let token = localStorage.getItem("token");
    SUPER_MANAGER_PROGRAM.context.headers.authorization ="Bearer " + token;
    SUPER_MANAGER_PROGRAM.variables.companyId=companyId;
    const result = await apolloClient.query(SUPER_MANAGER_PROGRAM);
    console.log(result);
    const programsData = result.data.programs.data;
    return this.formatPrograms(programsData);
  }
  static async getAllPrograms(){
    let token = localStorage.getItem("token");
    PROGRAMS_QUERY.context.headers.authorization ="Bearer " + token;
    const result = await apolloClient.query(PROGRAMS_QUERY)
    const programsData = result.data.programs.data;
    /*const programs = programsData.map(function(element){
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
        safe_harbour_type: element.attributes.safe_harbour_type
      }
      return program;
    })*/
    return this.formatPrograms(programsData);
  }
  static async createInvitation(invitation){
    let token = localStorage.getItem("token");
    CREATE_INVITATION.variables.invitation = invitation;
    CREATE_INVITATION.context.headers.authorization ="Bearer " + token;
    const result = await apolloClient.mutate(CREATE_INVITATION);
    return result;
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
        submissions:[]
      }
      return program;
    })
    return programs;
  }
}
