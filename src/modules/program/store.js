import { ProgramService } from "./api/programGraph";
import { ProgramServiceRest } from "./api/programRest";
const state = {
  programs: [],
  myPrograms: [],
};
const getters = {
  getAllPrograms(state) {
    return state.programs;
  },
  getOneProgram(state, id) {
    return (id) => {
      const data = state.programs.filter((program) => program.id == id);
      return data[0];
    };
  },
  getMyPrograms(state) {
    return state.myPrograms;
  },
};
const mutations = {
  ADD_PROGRAM(state, program) {
    let programs = getters.getAllPrograms();
    let id = programs.length + 1;
    program.id = id;
    programs.push(program);
    localStorage.setItem("programs", JSON.stringify(programs));
  },
  UPDATE_PROGRAM(state, program) {},
  SET_PROGRAMS(state, programs) {
    state.programs = programs;
  },
  SET_MY_PROGRAMS(state, programs) {
    state.myPrograms = programs;
  },
};
const actions = {
  async CREATE_PROGRAM({ state, dispatch }, programData) {
    const formData = new FormData();

    const file = programData.picture;
    const invitations = programData.invitations;

    delete programData.picture;
    delete programData.invitations;
    let program = {
      ...programData,
      reward_range: {
        low: { max: programData.low.max, min: programData.low.min },
        medium: { max: programData.medium.max, min: programData.medium.min },
        severe: { max: programData.severe.max, min: programData.severe.min },
        critical: {
          max: programData.critical.max,
          min: programData.critical.min,
        },
      },
      company_users: programData.managers.map(function (manager) {
        return Number(manager.id);
      }),
    };
    if(file){
      formData.append('files.program_picture',file)
    }
    //console.log(program)
    formData.append('data', JSON.stringify(program));
    const programResult = await ProgramServiceRest.createProgram(formData);

    invitations.forEach(async (i) => {
      let invitation = {
        program: programResult.data.id,
        hacker: i,
        accepted: false,
      };
      await ProgramService.createInvitation(invitation);
    });

    dispatch("GET_PROGRAMS");
    dispatch("GET_MY_PROGRAMS");
  },
  async UPDATE_PROGRAM({ state, commit, dispatch }, programData) {
    const user =
      localStorage.getItem("user") != null
        ? JSON.parse(localStorage.getItem("user"))
        : null;
    const oldProgram = await dispatch("GET_ONE_PROGRAM", programData.id);
    const oldInvitations = oldProgram.invitations;
    let program = {
      ...programData,
      reward_range: {
        low: { max: programData.low.max, min: programData.low.min },
        medium: { max: programData.medium.max, min: programData.medium.min },
        severe: { max: programData.severe.max, min: programData.severe.min },
        critical: {
          max: programData.critical.max,
          min: programData.critical.min,
        },
      },
      company_users: programData.managers.map(function (manager) {
        return Number(manager.id);
      }),
      company: user.company.id,
    };
    const hackers = JSON.parse(JSON.stringify(program.hackers));
    program.hackers = hackers.map(function (hacker) {
      return hacker;
    });

    /*delete program.critical;
    delete program.managers;
    delete program.severe;
    delete program.low;
    delete program.medium;
    delete program.close_at;
    delete program.date_post;*/

    const invitations = JSON.parse(JSON.stringify(program.invitations));
    program.invitations = oldInvitations.map(function (invitation) {
      return invitation.id;
    });

    //on enregistre la modification
    await ProgramService.updateProgram(program);

    invitations.forEach((element) => {
      //console.log(element)
      const r = oldInvitations.find(
        (invitation) => invitation.hackerId == element.hackerId
      );
      if (!r) {
        //Creation de l'invitation
        let invitation = {
          program: program.id,
          hacker: element.hackerId,
          accepted: false,
        };
        ProgramService.createInvitation(invitation);
      }
    });
    oldInvitations.forEach((element) => {
      const r = invitations.find(
        (invitation) => invitation.hackerId == element.hackerId
      );
      if (!r) {
        //Supression de l'invitation
        ProgramService.removeInvitation(element.id);
      }
    });
    await dispatch("GET_PROGRAMS");
    await dispatch("GET_MY_PROGRAMS");
  },
  async GET_PROGRAMS({ state, commit, dispatch }) {
    console.log(localStorage.getItem("token"));
    const programs = await ProgramService.getAllPrograms();
    console.log("GET_PROGRAMS/programs = ", programs);
    commit("SET_PROGRAMS", programs);
  },
  async GET_MY_PROGRAMS({ state, commit }) {
    const user = JSON.parse(localStorage.getItem("user"));
    //const programs = localStorage.getItem('programs')?JSON.parse(localStorage.getItem('programs')):[];
    let myPrograms = [];
    if (user.role === "client") {
      myPrograms = await ProgramService.getSuperManagerPrograms(
        user.company.id
      );
      console.log("GET_MY_PROGRAMS/myPrograms = ", myPrograms);
      //myPrograms=programs.filter((program) => program.company==user.company.id)
      if (user.type == "manager") {
        let programsManagers = [];
        /*myPrograms.forEach((program)=>{
          let allManagers = program.managers;
          let companies = JSON.parse(localStorage.getItem('companies'));
          let companyData = companies.filter((company)=>company.id==user.company.id)[0];
          let companyUsers = companyData.companyUsers;
          let companyUser = companyUsers.filter((item)=>item.user.id==user.id)[0];

          const dataPresent = allManagers.filter((manager)=> manager.id==companyUser.id);
          if(dataPresent.length>0){
            programsManagers.push(program);
          }
        })*/
        myPrograms = programsManagers;
      }
    } else if (user.role === "hacker") {
      myPrograms = await ProgramService.getHackerPrograms(user.hacker.id);
    } else if (user.role === "march1st") {
      myPrograms = await ProgramService.getAllPrograms();
    }
    console.log("GET_PROGRAMS/programs = ", myPrograms);
    commit("SET_MY_PROGRAMS", myPrograms);
    return myPrograms;
  },
  async GET_ONE_PROGRAM({ state, commit }, programId) {
    const program = await ProgramService.getOneProgram(programId);
    return program;
  },

  async JOIN_PROGRAM({ state, commit, dispatch }, programId) {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const program = await dispatch("GET_ONE_PROGRAM", programId);
      let hackers = program.hackers;
      if (user.hacker) {
        const result = program.invitations.find(
          (invitation) => invitation.hackerId == user.hacker.id
        );
        if (result || program.program_type === "public") {
          hackers.push(user.hacker.id);
          const programsData = await ProgramService.getHackerPrograms(
            user.hacker.id
          );
          let programsID = programsData.map(function (program) {
            return program.id;
          });
          programsID.push(programId);
          await ProgramService.joinProgram(user.hacker.id, programsID);
          //await dispatch("GET_PROGRAMS");
        }
      }
    } catch (error) {}
  },
  async LEAVE_PROGRAM({ state, commit, dispatch }, programId) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user.hacker) {
      const programsData = await ProgramService.getHackerPrograms(
        user.hacker.id
      );
      let programsID = programsData.map(function (program) {
        return program.id;
      });
      const index = programsID.indexOf(programId);
      if (index > -1) {
        programsID.splice(index, 1);
        await ProgramService.joinProgram(user.hacker.id, programsID);
        dispatch("GET_PROGRAMS");
      }
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
