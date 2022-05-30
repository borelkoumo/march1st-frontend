const { faker } = require("@faker-js/faker");
import apolloClient from "../boot/apollo";
import {
  ONE_PROGRAM_QUERY,
  PROGRAMS_QUERY,
  JOIN_PROGRAM_MUTATION,
  CREATE_PROGRAM,
  CREATE_INVITATION,
} from "../query/program";
import { programs } from "../store/utils/fakedata";
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
      let managersData = p.attributes.company_users.data;
      program.managers = managersData.map(function (m) {
        let manager = {
          id: m.id,
          first_name: m.attributes.first_name,
          last_name: m.attributes.last_name,
          user: {
            id: m.attributes.user.data.id,
            email: m.attributes.user.data.attributes.email,
            username: m.attributes.user.data.attributes.username,
          },
        };
        return manager;
      });
      let invitations = p.attributes.invitations.data;
      program.invitations = invitations.map(function (i) {
        return i.attributes.hacker.data.id;
      });
      program.managersId = managersData.map(function (m) {
        return m.id;
      });
      //let submissions = p.attributes.submissions.data;
      const submissionsData = p.attributes.submissions.data;
      program.submissions = getSubmissions(submissionsData)

      program.company = p.attributes.company.data.id;
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
    ONE_PROGRAM_QUERY.context.headers.authorization =
      "Bearer " + localStorage.getItem("token");
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

    let hackers = p.attributes.hackers.data;
    program.hackers = hackers.map(function (h) {
      return h.id;
    });
    let managersData = p.attributes.company_users.data;
    program.managers = managersData.map(function (m) {
      let manager = {
        id: m.id,
        first_name: m.attributes.first_name,
        last_name: m.attributes.last_name,
        user: {
          id: m.attributes.user.data.id,
          email: m.attributes.user.data.attributes.email,
          username: m.attributes.user.data.attributes.username,
        },
      };
      return manager;
    });
    program.managersId = managersData.map(function (m) {
      return m.id;
    });
    //les submissions du programs
    const submissionsData = p.attributes.submissions.data;
    program.submissions = getSubmissions(submissionsData)
    program.company = p.attributes.company.data.id;

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
    //console.log(result);
  } catch (error) {
    console.log(error);
  }
};
const _createProgram = async function (payload) {
  try {
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
    //console.log("La valeur de program avant la creation dans service ",program);
    CREATE_PROGRAM.variables.program = program;
    CREATE_PROGRAM.context.headers.authorization =
      "Bearer " + localStorage.getItem("token");
    const result = await apolloClient.mutate(CREATE_PROGRAM);
    //console.log(result);
    const data = result.data.createProgram.data.id;
    return data;
  } catch (error) {
    console.log(error);
  }
};
const _createInvitation = async function (payload) {
  try {
    /* let invitation = {
      company_user: payload.company_user,
      hacker: payload.hacker,
      program: payload.program,
    }; */
    //console.log(program);
    CREATE_INVITATION.variables.invitation = payload;
    CREATE_INVITATION.context.headers.authorization =
      "Bearer " + localStorage.getItem("token");
    const result = await apolloClient.mutate(CREATE_INVITATION);
    //console.log(result);
  } catch (error) {
    console.log(error);
  }
};
function getSubmissions(submissionData){
    const submissions = submissionData.map(function (s) {
    let submission = {};
    submission.id = s.id;
    submission.submission_title = s.attributes.submission_title;
    const statusesData = s.attributes.submission_statuses.data;
    if (statusesData.length > 0) {
      let status = statusesData[0].attributes.status;
      submission.submission_status_title = statusesData[0].attributes.status_title
      if (
        status === "accepted_unresolved" ||
        status === "accepted_resolved"
      ) {
        submission.submission_status = "Accepted";
      } else if (status === "rejected") {
        submission.submission_status = "Rejected";
      } else {
        submission.submission_status = "Pending";
      }
    } else {
      submission.submission_status = "Pending";
      submission.submission_status_title = "Unknow Status"
    }
    return submission;
  });
    return submissions;
}
export {
  _getPrograms,
  _getOneProgram,
  _joinProgram,
  _createProgram,
  _createInvitation,
};
