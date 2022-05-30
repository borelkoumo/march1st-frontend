import dasboard from "./dashboard";
/* import submission from "./submission"; */

import {
  _getPrograms,
  _getOneProgram,
  _joinProgram,
  _createProgram,
  _createInvitation,
} from "../services/program";
import { PROGRAMS_QUERY } from "../query/program";



const state = {
  programs: [],
};

const getters = {
  getHasJoin(state) {
    return (id) => {
      let hasJoin = false;
      let user = localStorage.getItem("m_user")===null?null:JSON.parse(localStorage.getItem("m_user"));
      if(user===null) false;
      let p = state.programs.filter((program) => program.id == id);
      //return false
      if (p[0].hackers.length > 0) {
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
        let program = state.programs.filter((program) => program.id === id);
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
    let user = localStorage.getItem("m_user")===null?null:JSON.parse(localStorage.getItem("m_user"));
    if(user===null) return [];
    if (user.typeUser === "client") {
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
    }
    else if (user.typeUser === "hacker") {
      let a = state.programs.filter((program) =>
        program.hackers.includes(user.id)
      );
      return a;
    } else if (user.typeUser === "admin") {
      return JSON.parse(JSON.stringify(state.programs));
    }
  },

  getAllPrograms(state) {
    let user = localStorage.getItem("m_user")===null?null:JSON.parse(localStorage.getItem("m_user"));
    if(user==null) return [];
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
    let user = localStorage.getItem("m_user")===null?null:JSON.parse(localStorage.getItem("m_user"));
    if(user==null) return [];
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
    let user = localStorage.getItem("m_user")===null?null:JSON.parse(localStorage.getItem("m_user"));
    if(user==null) return [];
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
    let user = localStorage.getItem("m_user")===null?null:JSON.parse(localStorage.getItem("m_user"));
    if(user==null) return false;
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
    let user = localStorage.getItem("m_user")===null?null:JSON.parse(localStorage.getItem("m_user"));
    if(user==null) return false;
    return (program_id) => {
      state.programs.forEach((program) => {
        if (
          program.id == program_id &&
          program.invitations.includes(user.hacker.id)
        ) {
          result = true;
        }
      });
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
      let user = localStorage.getItem("m_user")===null?null:JSON.parse(localStorage.getItem("m_user"));
      if(user==null) return null;
      let program = {
        ...payload,
        is_closed: false,
        company: user.company.id,
        hackers: [],
        company_users: payload.managers.map((m) => m.id),
        max: payload.critical.max,
        min: payload.low.min,
      };
      const program_id = await _createProgram(program);
      dispatch("allPrograms");
      payload.invitations.forEach(async (id) => {
        let payload = {
          company_user: user.company_user.id,
          hacker: id,
          program: program_id,
        };
        //console.log("invitation du hacker", id, "invitation=", payload);
         await _createInvitation(payload);
      });
      dispatch("allPrograms");
      //commit("addProgram", program);
    } catch (error) {}
  },
  async joinProgram({ state, commit, dispatch }, payload) {
    try {
      let user = localStorage.getItem("m_user")===null?null:JSON.parse(localStorage.getItem("m_user"));
      if(user==null) return null;
      payload.hackers.push(user.id);
      let param = {
        hacker: user,
        program_id: payload.id,
      };
      const result = await _joinProgram(payload);
      commit("addHackerToProgram", param);
      dispatch("allPrograms");
    }catch (e){
      console.log("error when join program",e.message())
    }
  },
  async leaveProgram({ state, commit }, payload) {
    let user = localStorage.getItem("m_user")===null?null:JSON.parse(localStorage.getItem("m_user"));
    if(user==null) return null;
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
      console.log("error in action program " + `${error}`);
    }
  },
  async oneProgram({commit},payload){
    try {
      const program = await _getOneProgram(payload);
      return Promise.resolve(program);
      // commit("setPrograms", programs);
    } catch (error) {
      console.log("error in action program " + `${error}`);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
