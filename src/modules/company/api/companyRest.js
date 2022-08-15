import { _postQueryServer } from 'src/store/utils/helper';

export class CompanyServiceRest{
  static async addCompanyManager(formUser){
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


      resolve(result);
    })
  }
}
