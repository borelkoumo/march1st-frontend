const { faker } = require("@faker-js/faker");
import apolloClient from "../../../boot/apollo";
import {
  PROGRAMS_QUERY,
  SUPER_MANAGER_PROGRAM,
  HACKER_PROGRAM,
  ONE_PROGRAM_QUERY,
  JOIN_PROGRAM_MUTATION,
  CREATE_PROGRAM,
  UPDATE_PROGRAM,
  CREATE_INVITATION,
  REMOVE_INVITATION,
} from "./query";

export class ProgramService {
  static createProgram(payload) {
    return new Promise(async (resolve, reject) => {
      let program = {
        program_title: payload.program_title,
        program_description: payload.program_description,
        program_type: payload.program_type,
        safe_harbour_type: payload.safe_harbour_type,
        reward_type: payload.reward_type,
        reward_range: payload.reward_range,
        program_guidelines_1: payload.program_guidelines_1,
        program_guidelines_2: payload.program_guidelines_2,
        program_scope: payload.program_scope,
        legal_terms: payload.legal_terms,
        is_closed: false,
        company: payload.company,
        company_users: payload.company_users,
        hackers: payload.hackers,
        program_picture_url: faker.image.business(1234, 2345),
        submissions: [],
      };
      let token = localStorage.getItem("token");

      CREATE_PROGRAM.variables.program = program;
      CREATE_PROGRAM.context.headers.authorization = "Bearer " + token;
      const result = await apolloClient.mutate(CREATE_PROGRAM);
      resolve(result.data.createProgram.data.id);
    });
  }
  static updateProgram(payload) {
    return new Promise(async (resolve, reject) => {
      let program = {
        program_title: payload.program_title,
        program_description: payload.program_description,
        program_type: payload.program_type,
        safe_harbour_type: payload.safe_harbour_type,
        reward_type: payload.reward_type,
        reward_range: payload.reward_range,
        program_guidelines_1: payload.program_guidelines_1,
        program_guidelines_2: payload.program_guidelines_2,
        program_scope: payload.program_scope,
        legal_terms: payload.legal_terms,
        is_closed: false,
        company: payload.company,
        company_users: payload.company_users,
        hackers: payload.hackers,
        program_picture_url: faker.image.business(1234, 2345),
        submissions: [],
      };
      let token = localStorage.getItem("token");

      UPDATE_PROGRAM.variables.program = program;
      UPDATE_PROGRAM.variables.programId = payload.id;
      UPDATE_PROGRAM.context.headers.authorization = "Bearer " + token;
      const result = await apolloClient.mutate(UPDATE_PROGRAM);
      //console.log(result);
      resolve(result.data.updateProgram.data.id);
    });
  }

  static async getSuperManagerPrograms(companyId) {
    return new Promise(async (resolve, reject) => {
      let token = localStorage.getItem("token");
      SUPER_MANAGER_PROGRAM.context.headers.authorization = "Bearer " + token;
      SUPER_MANAGER_PROGRAM.variables.companyId = companyId;
      const result = await apolloClient.query(SUPER_MANAGER_PROGRAM);
      const programsData = result.data.programs.data;
      resolve(this.formatPrograms(programsData));
    });
  }
  static async getHackerPrograms(hackerId) {
    return new Promise(async (resolve, reject) => {
      let token = localStorage.getItem("token");
      HACKER_PROGRAM.context.headers.authorization = "Bearer " + token;
      HACKER_PROGRAM.variables.hackerId = hackerId;
      const result = await apolloClient.query(HACKER_PROGRAM);
      const programsData = result.data.programs.data;
      resolve(this.formatPrograms(programsData));
    });
  }
  static getAllPrograms() {
    return new Promise(async (resolve, reject) => {
      let token = localStorage.getItem("token");
      PROGRAMS_QUERY.context.headers.authorization = "Bearer " + token;
      const result = await apolloClient.query(PROGRAMS_QUERY);
      const programsData = result.data.programs.data;
      resolve(this.formatPrograms(programsData));
    });
  }
  static async getAllPrograms2(programId) {
    console.log("getAllPrograms2/programId = ",programId)
    let token = localStorage.getItem("token");
    PROGRAMS_QUERY.context.headers.authorization = "Bearer " + token;
    const result = await apolloClient.query(PROGRAMS_QUERY);
    const programsData = result.data.programs.data;
    return this.formatPrograms(programsData);
  }

  static createInvitation(invitation) {
    return new Promise(async (resolve, reject) => {
      let token = localStorage.getItem("token");
      CREATE_INVITATION.variables.invitation = invitation;
      CREATE_INVITATION.context.headers.authorization = "Bearer " + token;
      const result = await apolloClient.mutate(CREATE_INVITATION);
      resolve(result);
    });
  }
  static getOneProgram(programId) {
    return new Promise(async (resolve, reject) => {
      let token = localStorage.getItem("token");
      ONE_PROGRAM_QUERY.variables.programId = programId;
      ONE_PROGRAM_QUERY.context.headers.authorization = "Bearer " + token;
      const result = await apolloClient.query(ONE_PROGRAM_QUERY);
      const programData = result.data.program.data;
      const program = this.formatProgram(programData);
      resolve(program);
    });
  }
  static async joinProgram(hackerId, programs) {
    return new Promise(async (resolve, reject) => {
      let token = localStorage.getItem("token");
      JOIN_PROGRAM_MUTATION.variables.hackerId = hackerId;
      JOIN_PROGRAM_MUTATION.variables.programs = programs;
      JOIN_PROGRAM_MUTATION.context.headers.authorization = "Bearer " + token;
      const result = await apolloClient.mutate(JOIN_PROGRAM_MUTATION);
      resolve(result);
    });
  }
  static async removeInvitation(invitationId) {
    return new Promise(async (resolve, reject) => {
      let token = localStorage.getItem("token");
      REMOVE_INVITATION.variables.invitationId = invitationId;
      REMOVE_INVITATION.context.headers.authorization = "Bearer " + token;
      const result = await apolloClient.mutate(REMOVE_INVITATION);
      resolve(result);
    });
  }

  /*======================================================================*/
  /*                      FORMAT FUNCTIONS                                */
  /*======================================================================*/

  static formatPrograms(programsData) {
    console.log("formatPrograms/programsData.length = ", programsData.length);
    const programs = programsData.map(function (element) {
      let program = {
        id: element.id,
        closed_at: null,
        company: element.attributes.company.data.id,
        managers: element.attributes.company_users.data.map(function (cu) {
          return {
            id: cu.id,
            first_name: cu.attributes.first_name,
          };
        }),
        createdAt: element.attributes.createdAt,
        hackers: element.attributes.hackers.data.map(function (hacker) {
          return hacker.id;
        }),

        invitations: element.attributes.invitations.data.map(function (
          invitation
        ) {
          return {
            id: invitation.id,
            hackerId: invitation.attributes.hacker.data.id,
          };
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
        low: element.attributes.reward_range.low,
        medium: element.attributes.reward_range.medium,
        critical: element.attributes.reward_range.critical,
        severe: element.attributes.reward_range.severe,
        reward_type: element.attributes.reward_type,
        safe_harbour_type: element.attributes.safe_harbour_type,
        submissions: element.attributes.submissions.data.map(function (sub) {
          let submission = {
            id: sub.id,
            submission_text: sub.attributes.submission_text,
            submission_title: sub.attributes.submission_title,
            severity_level: sub.attributes.severity_level,
            submission_target: sub.attributes.submission_target,
            submission_status:sub.attributes.submission_statuses.data[0]?
              sub.attributes.submission_statuses.data[0].attributes.status:"Undefined",
            submission_statuses: sub.attributes.submission_statuses.data.map(
              function (sub_statut) {
                return {
                  id: sub_statut.id,
                  status: sub_statut.attributes.status,
                  status_title: sub_statut.attributes.status_title,
                };
              }
            ),
          };
          return submission;
        }),
      };
      return program;
    });
    return programs;
  }
  static formatProgram(element) {
    return {
      id: element.id,
      closed_at: null,
      company: element.attributes.company.data.id,
      managers: element.attributes.company_users.data.map(function (cu) {
        return {
          id: cu.id,
          first_name: cu.attributes.first_name,
        };
      }),
      createdAt: element.attributes.createdAt,
      hackers: element.attributes.hackers.data.map(function (hacker) {
        return hacker.id;
      }),
      invitations: element.attributes.invitations.data.map(function (
        invitation
      ) {
        return {
          id: invitation.id,
          hackerId: invitation.attributes.hacker.data.id,
        };
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
      low: element.attributes.reward_range.low,
      medium: element.attributes.reward_range.medium,
      critical: element.attributes.reward_range.critical,
      severe: element.attributes.reward_range.severe,
      reward_type: element.attributes.reward_type,
      safe_harbour_type: element.attributes.safe_harbour_type,
      submissions: element.attributes.submissions.data.map(function (sub) {
        let submission = {
          id: sub.id,
          submission_text: sub.attributes.submission_text,
          submission_title: sub.attributes.submission_title,
          severity_level: sub.attributes.severity_level,
          submission_target: sub.attributes.submission_target,
          submission_status:
            sub.attributes.submission_statuses.data[0].attributes.status,
          submission_statuses: sub.attributes.submission_statuses.data.map(
            function (sub_statut) {
              return {
                id: sub_statut.id,
                status: sub_statut.attributes.status,
                status_title: sub_statut.attributes.status_title,
              };
            }
          ),
        };
        return submission;
      }),
    };
  }
}
