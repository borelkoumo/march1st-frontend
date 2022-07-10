const state={
  submissions:[],
  mySubmissions:[],
  submissionsStatus:[]
}
const getters={
  getAllSubmissions(){
    return state.submissions;
  },
  getOneSubmission(state,id){
    return (id)=>{
      let submissionData = state.submissions.filter((submission)=>submission.id==id);
      if(submissionData.length>0) return submissionData[0];
      return null;
    }
  },
  getMySubmissions(){
    return state.mySubmissions;
  }
}
const mutations={
  SET_SUBMISSIONS(state, submissions){
    state.submissions = JSON.parse(JSON.stringify(submissions));
  },
  SET_MY_SUBMISSIONS(state,submissions){
    state.mySubmissions = submissions;
  }
}
const actions={
  async CREATE_SUBMISSION({commit,dispatch},formData){
    const user = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null;
    if(user){
      formData.hacker_id = user.hacker.id
    }
    let oldSubmissions = localStorage.getItem('submissions')?JSON.parse(localStorage.getItem('submissions')):[];
    formData.id = oldSubmissions.length+1;

    //Create submission_statues
    let oldSubmissionStatus = localStorage.getItem('submissionStatus')?JSON.parse(localStorage.getItem('submissionStatus')):[];
    let newSubmissionStatus = {
      status:'new',
      status_title:"New Report",
      comment:"",
      submission:formData.id,
      id:oldSubmissionStatus.length+1
    }
    oldSubmissionStatus.push(newSubmissionStatus);
    localStorage.setItem('submissionStatus',JSON.stringify(oldSubmissionStatus));
    formData.submission_statuses.push(newSubmissionStatus.id);

    //Save submissions
    oldSubmissions.push(formData);
    localStorage.setItem('submissions',JSON.stringify(oldSubmissions));

    //save dans le localstorate de programs
    let programs = localStorage.getItem('programs')?JSON.parse(localStorage.getItem('programs')):[];
    programs = programs.map(function(program){
      if(program.id==formData.program_id)
        program.submissions.push(formData);
      return program;
    })
    localStorage.setItem('programs',JSON.stringify(programs));

    await commit('SET_SUBMISSIONS',oldSubmissions);
  },
  async UPDATE_SUBMISSION({commit,dispatch},formData){

  },
  async GET_ALL_SUBMISSIONS({commit,dispatch}){
    const submissions = localStorage.getItem('submissions')?JSON.parse(localStorage.getItem('submissions')):[];
    await commit('SET_SUBMISSIONS',submissions);
  },
  async GET_MY_SUBMISSIONS({commit,dispatch}){
    let mySubmissions=[];
    const user = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null;
    const submissions = localStorage.getItem('submissions')?JSON.parse(localStorage.getItem('submissions')):[];
    if(user){
      if(user.role==='hacker'){
        mySubmissions = submissions.filter((submission)=>submission.hacker_id==user.hacker.id);
      }
      else if(user.role==='client'){
        let submissionsData=[];
        const programs = localStorage.getItem('programs')?JSON.parse(localStorage.getItem('programs')):[];
        const progransCompany = programs.filter((program)=>program.company==user.company.id);
        if(user.type==='super_manager'){
          progransCompany.forEach(program => {
            let data=submissionsData.concat(program.submissions);
              submissionsData=data;
          });
          mySubmissions=submissionsData;
        }
        else{
          progransCompany.forEach(program => {
            let allManagers = program.managers;
            let companies = JSON.parse(localStorage.getItem('companies'));
            let companyData = companies.filter((company)=>company.id==user.company.id)[0];
            let companyUsers = companyData.companyUsers;
            let companyUser = companyUsers.filter((item)=>item.user.id==user.id)[0];

            const dataPresent = allManagers.filter((manager)=> manager.id==companyUser.id);
            if(dataPresent.length>0){
              let data=submissionsData.concat(program.submissions);
              submissionsData=data;
            }
          });
          mySubmissions=submissionsData;
        }
      }
      else if(user.role==='march1st'){
        mySubmissions = submissions;
      }
    }
    await commit('SET_MY_SUBMISSIONS',mySubmissions);
  },
  async GET_SUBMISSIONSTATUS_BY_SUBMISSION({commit},idSubmission){
    const allSubmissionStatus = localStorage.getItem('submissionStatus')?JSON.parse(localStorage.getItem('submissionStatus')):[];
    console.log(allSubmissionStatus);
    const data = await allSubmissionStatus.filter((submissionStatus)=> submissionStatus.submission == idSubmission)
    return data;
  }
}

export default{
  namespaced:true,
  state,
  getters,
  mutations,
  actions
}
