import {
  PROGRAMS_QUERY,
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
      reward_range: {
        low: {
          max: payload.low.max,
          min: payload.low.min,
        },
        medium: {
          max: payload.medium.max,
          min: payload.medium.min,
        },
        severe: {
          max: payload.severe.max,
          min: payload.severe.min,
        },
        critical: {
          max: payload.critical.max,
          min: payload.critical.min,
        },
      },
      program_guidelines_1: payload.program_guidelines_1,
      program_guidelines_2: payload.program_guidelines_2,
      program_scope: payload.program_scope,
      legal_terms: payload.legal_terms,
      is_closed: false,
      company: payload.company,
      hackers: payload.hackers,
      program_picture_url: faker.image.business(1234, 2345),
      company_users: payload.company_users,
      //program_picture_url: "programs/image17.png",
    };
    let token = localStorage.getItem("token");

    CREATE_PROGRAM.variables.program = program;
    CREATE_PROGRAM.context.headers.authorization ="Bearer " + token;
    const result = await apolloClient.mutate(CREATE_PROGRAM);
    return result;
  }
}
