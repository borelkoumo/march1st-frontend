import { _postQueryWithFile } from '../../auth/restmethod';

export class SubmissionServiceRest {
  static async createSubmission(formData){
    const url = "/submissions";
    const token = localStorage.getItem('token');
    const data = await _postQueryWithFile(url,formData,token);
    return data;
  }
}
