// Amplify libraries
import { Auth } from "@aws-amplify/auth";
import { CompanyServiceRest } from './api/companyRest';

const state={
  locale: { label: "English (United States)", value: "en-US" },
}
const getters ={

}
const mutations={

}
const actions={

  async ADD_USER({state,commit},formUser){
    const user = JSON.parse(localStorage.getItem('user'));
    formUser.company=user.company.id;
    //formUser.user=1;
    await CompanyServiceRest.addCompanyManager(formUser);
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
