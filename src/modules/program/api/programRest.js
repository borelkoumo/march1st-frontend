import { _postQueryWithFile } from '../../auth/restmethod';

export class ProgramServiceRest {
  static async createProgram(formData){
    const url = "/programs";
    const token = localStorage.getItem('token');
    const data = await _postQueryWithFile(url,formData,token);
  }
}
