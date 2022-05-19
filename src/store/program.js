import dasboard from "./dashboard";
/* import submission from "./submission"; */

import {
  _getPrograms,
  _getOneProgram,
  _joinProgram,
  _createProgram,
} from "../services/program";

const state = {
  programs: [],
};

const getters = {
  getHasJoin(state) {
    return (id) => {
      console.log(id);
      let hasJoin = false;
      let user = dasboard.state.user;
      let p = state.programs.filter((program) => program.id == id);
      console.log(p);
      //return false
      if (p[0].hackers.length > 0) {
        console.log(p[0].hackers);
        if (p[0].hackers.includes(user.id)) return true;
        return false;
      } else return false;
    };
  },
  getPublicPrograms(state) {
    return state.programs.filter((program) => program.program_type == "public");
  },
  getPrivatePrograms(state) {
    return state.programs.filter(
      (program) => program.program_type == "private"
    );
  },
  getCashPrograms(state) {
    return state.programs.filter((program) => program.reward_type == "cash");
  },
  getPointOnlyPrograms(state) {
    return state.programs.filter((program) => program.reward_type == "points");
  },
  getProgram(state) {
    return (id) => {
      try {
        let program = state.programs.filter((program) => program.id == id);
        if (program[0]) {
          let p = JSON.parse(JSON.stringify(program[0]));
          return p;
        }
      } catch (error) {
        return {};
      }
    };
  },

  getMyPrograms(state) {
    let user = dasboard.state.user;
    if (user.typeUser === "client") {
      console.log(state.programs);
      if (user.role === "manager") {
        const programs = state.programs.filter(
          (program) => program.company === user.company.id
        );
        let myprograms = [];
        programs.forEach((element) => {
          Object.keys(element.managersId).forEach((key) => {
            if (Number(element.managersId[key]) === user.company_user.id)
              myprograms.push(element);
          });
        });
        return myprograms;
      }
      return state.programs.filter(
        (program) => program.company === user.company.id
      );
    } else if (user.typeUser === "hacker") {
      let a = state.programs.filter((program) =>
        program.hackers.includes(user.id)
      );
      return a;
    } else if (user.typeUser === "admin") {
      /*let managerPrograms = [];
      state.programs.forEach((program) => {
        let allManagers = program.managers;
        if (allManagers.filter((m) => m.id == user.id).length > 0)
          managerPrograms.push(program);
      });*/
      return JSON.parse(JSON.stringify(state.programs));
    }
  },

  getAllPrograms(state) {
    let user = dasboard.state.user;
    let programs = [];
    if (user.typeUser == "client") {
      state.programs.forEach((p) => {
        let program = JSON.parse(JSON.stringify(p));
        program.can_join = false;
        program.has_join = false;
        programs.push(program);
      });
    } else if (user.typeUser == "hacker") {
      state.programs.forEach((p) => {
        let program = JSON.parse(JSON.stringify(p));
        if (program.program_type == "private") {
          // le program est prive. il doit avoir une invitation
          if (program.invitations.includes(user.id)) {
            if (program.hackers.includes(user.id)) {
              //il a deja join le program, il faut activer le bouton leave
              program.has_join = true;
              program.can_join = false;
            } else {
              program.can_join = true;
              program.has_join = false;
            }
          } else {
            program.can_join = false;
            program.has_join = false;
          }
        } else {
          //le program est public pas besoin d'invitation
          if (program.hackers.includes(user.id)) {
            //il a deja join le program, il faut activer le bouton leave
            program.has_join = true;
            program.can_join = false;
          } else {
            program.can_join = true;
            program.has_join = false;
          }
        }
        programs.push(program);
      });
    } else {
      state.programs.forEach((p) => {
        let program = JSON.parse(JSON.stringify(p));
        program.can_join = false;
        program.has_join = false;
        programs.push(program);
      });
    }
    return programs;
  },

  getPrograms(state) {
    let programs = localStorage.getItem("programs");
    if (programs) {
      programs = JSON.parse(programs);
      return programs;
    } else {
      return JSON.parse(JSON.stringify(state.programs));
    }
  },
  getClientPrograms(state) {
    let user = dasboard.state.user;
    let programs = [];
    let allPrograms = localStorage.getItem("programs");
    //console.log(allPrograms);
    if (allPrograms) {
      allPrograms = JSON.parse(allPrograms);
      allPrograms.forEach((program) => {
        if (program.user_id == user.id) {
          //je recherche toutes les submissions de ce program
          program.submissions = [];
          if (localStorage.getItem("submissions")) {
            let allSubmissions = JSON.parse(
              localStorage.getItem("submissions")
            );
            allSubmissions.forEach((s) => {
              if (s.program_id === program.id) program.submissions.push(s);
            });
          }

          programs.push(program);
        }
      });
    }
    return programs;
  },
  getHackerPrograms(state) {
    let programs = [];
    let user = dasboard.state.user;
    let allPrograms = localStorage.getItem("programs");
    if (allPrograms) {
      allPrograms = JSON.parse(allPrograms);
      allPrograms.forEach((program) => {
        program.hackers.forEach((h) => {
          if (h.id == user.id) programs.push(program);
        });
      });
    }
    return programs;
  },
  isPrivateProgram(state) {
    let result = false;
    return (id) => {
      state.programs.forEach((program) => {
        if (program.id == id && program.type == "Private") result = true;
      });
      return result;
    };
  },
  isHackerJoined(state) {
    let result = false;
    let user = dasboard.state.user;
    return (program_id) => {
      let program = {};

      state.programs.forEach((p) => {
        if (p.id == program_id) program = p;
      });
      program.hackers.forEach((h) => {
        if (h.id == user.id) result = true;
      });
      //console.log(result);
      return result;
    };
  },
  isHackerHasInvitation(state) {
    let result = false;
    let user = dasboard.state.user;
    return (program_id) => {
      let programs = localStorage.getItem("programs");
      if (programs) {
        programs = JSON.parse(programs);
        console.log(programs);
        programs.forEach((program) => {
          if (
            program.id == program_id &&
            program.invitations.includes(user.id)
          ) {
            result = true;
          }
        });
      }
      return result;
    };
  },
};

const mutations = {
  setPrograms(state, payload) {
    state.programs = payload;
  },
  setEditProgram(state, payload) {
    let programs = [];
    state.programs.forEach((p) => {
      if (p.id == payload.id) {
        programs.push(payload);
      } else {
        programs.push(p);
      }
    });
    state.programs = programs;
  },
  addProgram(state, payload) {
    state.programs.push(payload);
  },
  addHackerToProgram(state, payload) {
    state.programs.forEach((p) => {
      if (p.id == payload.program_id) {
        console.log(payload);

        p.hackers.push(payload.hacker.id);
        console.log(p.hackers);
      }
    });
  },
  removeHackerToProgram(state, payload) {
    let index = 0;
    state.programs.forEach((p) => {
      if (p.id == payload.program_id) {
        p.hackers.forEach((h) => {
          if (h != payload.hacker.id) {
            index++;
          } else {
            p.hackers.splice(index, 1);
          }
        });
      }
    });
  },
};

const actions = {
  async saveProgram({ state, commit, dispatch }, payload) {
    try {
      let user = dasboard.state.user;
      let program = {
        //id: payload.id,
        /*program_title: payload.program_title,
        program_description: payload.program_description,
        program_type: payload.program_type,
        safe_harbour_type: payload.safe_harbour_type,
        reward_type: payload.reward_type,
        reward_range: payload.reward_range,
        program_guidelines_1: payload.program_guidelines_1,
        program_guidelines_2: payload.program_guidelines_2,
        program_scope: payload.program_scope,
        legal_terms: payload.legal_terms,*/
        //program_picture_url: "programs/image17.png",
        ...payload,
        is_closed: false,
        //closed_at: "",
        //user_id: user.id,
        //client_id: user.id,
        company: user.company.id,
        //date_post: "10/04/2021",

        hackers: [],
        company_users: payload.managers.map((m) => m.id),
        //managers: payload.managers,
        //managersId: payload.managers.map((m) => m.id),
        //submissions: [],
        //invitations: payload.invitations,

        /*critical: payload.critical,
        severe: payload.severe,
        medium: payload.medium,
        low: payload.low,*/

        max: payload.critical.max,
        min: payload.low.min,
      };

      /* program.invitations.forEach((hacker) => {
        let task = {
          task_created: user.id,
          task_received: hacker,
          task_type: "invitation",
          status: "",
          task_link: "Private Invitation",
          task_title: "You received an invitation to join a bounty program",
          task_description: program.title,
          task_date: "",
        };
        dispatch("task/addTask", task, { root: true });
      }); */
      const result = await _createProgram(program);
      //commit("addProgram", program);
    } catch (error) {}
  },
  async joinProgram({ state, commit }, payload) {
    let user = dasboard.state.user;
    payload.hackers.push(user.id);
    let param = {
      hacker: user,
      program_id: payload.id,
    };
    const result = _joinProgram(payload);
    commit("addHackerToProgram", param);
  },
  async leaveProgram({ state, commit }, payload) {
    let user = dasboard.state.user;
    let param = {
      hacker: user,
      program_id: payload,
    };
    commit("removeHackerToProgram", param);
  },
  async editProgram({ state, commit }, payload) {
    /* console.log(payload) */
    /* let max =
      payload.critical.max > payload.severe.max
        ? payload.critical.max
        : payload.severe.max;
    max = max > payload.medium.max ? max : payload.medium.max;
    max = max > payload.low.max ? max : payload.low.max;

    let min =
      payload.critical.min > payload.severe.min
        ? payload.critical.min
        : payload.severe.min;
    min = min > payload.medium.min ? min : payload.medium.min;
    min = min > payload.low.min ? min : payload.low.min;*/

    payload.managersId = payload.managers.map(function (m) {
      return m.id;
    });

    payload.min = payload.low.min;
    payload.max = payload.critical.max;
    commit("setEditProgram", payload);
  },

  async allPrograms({ commit }) {
    try {
      const programs = await _getPrograms();
      commit("setPrograms", programs);
    } catch (error) {
      console.log("erro in action program " + `${error}`);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
