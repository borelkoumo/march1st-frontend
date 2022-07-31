import { ProgramService } from "./api/programGraph";
const state={
  programs:[],
  myPrograms:[]
}
const getters={
  getAllPrograms(state){
    return state.programs;
  },
  getOneProgram(state,id){
    return(id)=>{
      const data = state.programs.filter((program)=>program.id==id);
      return data[0];
    }
  },
  getMyPrograms(state){
    return state.myPrograms;
  }
}
const mutations={
  ADD_PROGRAM(state,program){
    let programs = getters.getAllPrograms();
    let id = programs.length+1;
    program.id=id;
    programs.push(program);
    localStorage.setItem('programs',JSON.stringify(programs));

  },
  UPDATE_PROGRAM(state,program){

  },
  SET_PROGRAMS(state,programs){
    state.programs=programs;
  },
  SET_MY_PROGRAMS(state, programs){
    state.myPrograms=programs;
  }
}
const actions={
  async CREATE_PROGRAM({state,dispatch},programData){
    let program={
      ...programData,
      reward_range:{
        low: {"max":programData.low.max, "min":programData.low.min},
        medium: {"max":programData.medium.max, "min":programData.medium.max},
        severe: {"max":programData.severe.max, "min":programData.severe.max},
        critical: {"max":programData.critical.max, "min":programData.critical.max}
      },
      company_users:programData.managers.map(function(manager){
        return Number(manager.id);
      })
    }
    const programId = await ProgramService.createProgram(program);
    program.invitations.forEach((i)=>{
      let invitation={
        program:programId,
        hacker:i,
        accepted:false
      }
      ProgramService.createInvitation(invitation);
    })
    dispatch('GET_MY_PROGRAMS');
    dispatch('GET_PROGRAMS');
  },
  async UPDATE_PROGRAM({state,commit,dispatch},program){
    commit('UPDATE_PROGRAM',program);
    const programs = localStorage.getItem('programs')?JSON.parse(localStorage.getItem('programs')):[];
    const newPrograms = programs.map(function(item){
      if(item.id==program.id) return program;
      else return item;
    });
    localStorage.setItem('programs',JSON.stringify(newPrograms));
    await dispatch('GET_PROGRAMS');
  },
  async GET_PROGRAMS({state,commit, dispatch}){
    //const programs = localStorage.getItem('programs')?JSON.parse(localStorage.getItem('programs')):[];
    const programs = await ProgramService.getAllPrograms();
    commit('SET_PROGRAMS',programs);
  },
  async GET_MY_PROGRAMS({state,commit}){
    const user = JSON.parse(localStorage.getItem('user'));
    //const programs = localStorage.getItem('programs')?JSON.parse(localStorage.getItem('programs')):[];
    let myPrograms=[];
    if(user.role==='client'){
      myPrograms= await ProgramService.getSuperManagerPrograms(user.company.id);
      console.log("GET_MY_PROGRAMS/myPrograms = ", myPrograms);
      //myPrograms=programs.filter((program) => program.company==user.company.id)
      if(user.type=='manager'){
        let programsManagers=[];
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
        myPrograms = programsManagers
      }
    }
    else if(user.role==='hacker'){
      myPrograms= await ProgramService.getHackerPrograms(user.hacker.id);
    }
    else if(user.role==='march1st'){
      myPrograms = []
    }
    commit('SET_MY_PROGRAMS',myPrograms);
  },
  async GET_ONE_PROGRAM({state, commit},programId){
    const program = await ProgramService.getOneProgram(programId);
    return program;
    /*const programs = localStorage.getItem('programs')?JSON.parse(localStorage.getItem('programs')):[];
    let programData = programs.filter((program)=>program.id==programId);
    if(programData.length>0) return programData[0];*/
  },

  async JOIN_PROGRAM({state,commit, dispatch},programId){
    const user = JSON.parse(localStorage.getItem('user'));
    const program = await dispatch('GET_ONE_PROGRAM',programId);
    if(program.invitations.includes(user.hacker.id) || program.program_type==='public'){
      program.hackers.push(user.hacker.id);
      //on sauvegarde l'ensemble des programs
      await dispatch('UPDATE_PROGRAM',program);
      await dispatch('GET_MY_PROGRAMS');
    }
  },
  async LEAVE_PROGRAM({state,commit,dispatch},programId){
    const user = JSON.parse(localStorage.getItem('user'));
    const program = await dispatch('GET_ONE_PROGRAM',programId);
    const index = program.hackers.indexOf(user.hacker.id);
    if(index>-1){
      program.hackers.splice(index,1);
      await dispatch('UPDATE_PROGRAM',program);
      await dispatch('GET_MY_PROGRAMS');
    }
  }
}

export default{
  namespaced:true,
  state,
  getters,
  mutations,
  actions
}
