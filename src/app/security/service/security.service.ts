import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Constants} from '../../shared/constants';
import {FacultyMemberModel} from '../../shared/model/facultyMember-management/facultyMember-model';
import {StudentModel} from '../../shared/model/student-management/student-model';
import {LoginModel} from '../../shared/model/security/login-model';
import {RegisterModel} from '../../shared/model/security/register-model';
import {MessageResponse} from '../../shared/model/message-response';
import {AdminModel} from '../../shared/model/security/admin-model';
import {CollegeManagementService} from '../../college-management/service/college-management.service';
import {DepartmentService} from '../../department-management/service/department.service';
import {AcademicTermService} from '../../academic-term-management/service/academic-term.service';
import {AcademicYearService} from '../../academic-year-management/service/academic-year.service';
import {ProfilePasswordModel} from "../../shared/model/security/profile-password-model";

@Injectable({
   providedIn: 'root'
})
export class SecurityService {

   public loginEvent: Subject<any> = new Subject<any>();

   constructor(private httpClient: HttpClient, private departmentService: DepartmentService, private academicYearService: AcademicYearService,
               private academicTermService: AcademicTermService, private collegeManagementService: CollegeManagementService)
   {}


   public login(loginModel: LoginModel): Observable<FacultyMemberModel | StudentModel | AdminModel> {
      return this.httpClient.post<FacultyMemberModel | StudentModel>(Constants.loginUrl, loginModel);
   }

   public register(registerModel: RegisterModel, userType: string): Observable<MessageResponse> {
      if (userType === Constants.STUDENT_TYPE) {
         return this.httpClient.post<MessageResponse>(Constants.registerStudentUrl, registerModel);
      } else {
         return this.httpClient.post<MessageResponse>(Constants.registerStaffUrl, registerModel);
      }
   }
   public getAllUtilData(): void{

      this.departmentService.getDepartments().subscribe(value => {
         localStorage.setItem(Constants.DEPARTMENTS_LIST, JSON.stringify(value));
      });
      this.academicYearService.getAcademicYears().subscribe(value => {
         localStorage.setItem(Constants.YEARS_LIST, JSON.stringify(value));
      });
      this.academicTermService.getAcademicTerms().subscribe(value => {
         localStorage.setItem(Constants.TERMS_LIST, JSON.stringify(value));
      });
      this.academicTermService.getCurrentTerm().subscribe(value => {
         localStorage.setItem(Constants.CURRENT_TERM, JSON.stringify(value));
      });
   }
   public changePassword(profilePasswordModel: ProfilePasswordModel): Observable<MessageResponse> {
      return this.httpClient.post<MessageResponse>(Constants.changePasswordUrl, profilePasswordModel);
   }
}
