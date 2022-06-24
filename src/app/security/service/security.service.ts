import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Constants} from '../../shared/constants';
import {FacultyMemberModel} from '../../shared/model/facultyMember-management/facultyMember-model';
import {StudentModel} from '../../shared/model/student-management/student-model';
import {LoginModel} from '../../shared/model/security/login-model';
import {RegisterModel} from '../../shared/model/security/register-model';
import {MessageResponse} from '../../shared/model/message-response';
import {AdminModel} from '../../shared/model/security/admin-model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private httpClient: HttpClient) {
  }

  public login(loginModel: LoginModel): Observable<FacultyMemberModel | StudentModel | AdminModel> {
    return this.httpClient.post<FacultyMemberModel | StudentModel>(Constants.loginUrl, loginModel);
  }

  public register(registerModel: RegisterModel): Observable<MessageResponse> {
    return this.httpClient.post<MessageResponse>(Constants.registerUrl, registerModel);
  }
}
