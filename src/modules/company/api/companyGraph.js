import apolloClient from "../../../boot/apollo";
import {
  COMPANY_USER_MUTATION
} from "./query";

export class CompanyService{
  static async addUser(formUser){
    return new Promise((resolve, reject) => {
      let companyUser = {
        first_name:formUser.first_name,
        last_name:formUser.last_name,
        title:formUser.title,
        profile_picture_url:"",
        user:1,
        company:formUser.company,
        programs:formUser.programs
      };
      let token = localStorage.getItem("token");

      COMPANY_USER_MUTATION.variables.companyUser = companyUser;
      COMPANY_USER_MUTATION.context.headers.authorization = "Bearer " + token;
      const result = await apolloClient.mutate(COMPANY_USER_MUTATION);
      resolve(result);
    })
  }
}
