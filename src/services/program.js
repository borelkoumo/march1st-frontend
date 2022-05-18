import apolloClient from "../boot/apollo";
import { ONE_PROGRAM_QUERY, PROGRAMS_QUERY, JOIN_PROGRAM_MUTATION } from "../query/program";
const _getPrograms = async function () {
  try {
    PROGRAMS_QUERY.context.headers.authorization =
      "Bearer " + localStorage.getItem("token");
    //console.log(PROGRAMS_QUERY);
    const result = await apolloClient.query(PROGRAMS_QUERY);
    const data = result.data.programs.data;
    const programList = data.map(function (p) {
      let program = {};
      program.id = p.id;
      program.program_title = p.attributes.program_title;
      program.program_description = p.attributes.program_description;
      program.program_guidelines_1 = p.attributes.program_guidelines_1;
      program.program_guidelines_2 = p.attributes.program_guidelines_2;
      program.program_scope = p.attributes.program_scope;
      program.legal_terms = p.attributes.legal_terms;
      program.program_picture_url = p.attributes.program_picture_url;
      program.is_closed = p.attributes.is_closed;
      program.closed_at = p.attributes.closed_at;
      program.createdAt = p.attributes.createdAt;
      program.reward_guidelines = p.attributes.reward_guidelines;

      program.program_type = p.attributes.program_type;
      program.safe_harbour_type = p.attributes.safe_harbour_type;
      program.reward_type = p.attributes.reward_type;

      program.critical = p.attributes.reward_range.critical;
      program.severe = p.attributes.reward_range.severe;
      program.medium = p.attributes.reward_range.medium;
      program.low = p.attributes.reward_range.low;
      let hackers = p.attributes.hackers.data;
      program.hackers = hackers.map(function (h) {
        return h.id;
      });
      //program.hackers=[];
      //program.hackers = [];
      program.invitations = [];
      program.managers = [];
      return program;
    });
    return Promise.resolve(programList);
  } catch (error) {
    console.log(error);
    return Promise.reject(0);
  }
};

const _getOneProgram = async function (payload) {
  try {
    ONE_PROGRAM_QUERY.variables.id = payload;

    const result = await apolloClient.query(ONE_PROGRAM_QUERY);
    const p = result.data.program.data;
    let program = {};
    program.id = p.id;
    program.program_title = p.attributes.program_title;
    program.program_description = p.attributes.program_description;
    program.program_guidelines_1 = p.attributes.program_guidelines_1;
    program.program_guidelines_2 = p.attributes.program_guidelines_2;
    program.program_scope = p.attributes.program_scope;
    program.legal_terms = p.attributes.legal_terms;
    program.program_picture_url = p.attributes.program_picture_url;
    program.is_closed = p.attributes.is_closed;
    program.closed_at = p.attributes.closed_at;
    program.createdAt = p.attributes.createdAt;
    program.reward_guidelines = p.attributes.reward_guidelines;

    program.program_type = p.attributes.program_type;
    program.safe_harbour_type = p.attributes.safe_harbour_type;
    program.reward_type = p.attributes.reward_type;

    program.critical = p.attributes.reward_range.critical;
    program.severe = p.attributes.reward_range.severe;
    program.medium = p.attributes.reward_range.medium;
    program.low = p.attributes.reward_range.low;

    program.hackers = [];
    program.invitations = [];
    program.managers = [];
    return Promise.resolve(program);
  } catch (error) {
    return Promise.reject(null);
  }
};

const _joinProgram = async function (payload) {
  try {
    JOIN_PROGRAM_MUTATION.variables.id = payload.id;
    JOIN_PROGRAM_MUTATION.variables.hackers = payload.hackers;
    JOIN_PROGRAM_MUTATION.context.headers.authorization =
      "Bearer " + localStorage.getItem("token");
    const result = await apolloClient.mutate(JOIN_PROGRAM_MUTATION);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export { _getPrograms, _getOneProgram, _joinProgram };
