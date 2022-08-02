const state={

}
const getters ={

}
const mutations={

}
const actions={
  async ADD_USER({state,commit},formUser){
    const user = JSON.parse(localStorage.getItem('user'));
    formUser.company=user.company.id;
    formUser.user=1;
    console.log(formUser);
  }
}
export default{
  namespaced:true,
  state,
  mutations,
  getters,
  actions
}
