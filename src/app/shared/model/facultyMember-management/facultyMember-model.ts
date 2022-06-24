import {BaseModel} from '../base-model';
import {CollegeModel} from '../college-management/college-model';
import {DepartmentModel} from '../department-management/department-model';
import {DegreeModel} from '../Degree-management/degree-model';
import {UserModel} from '../security/user-model';

export class FacultyMemberModel extends BaseModel {

  nameAr: string;
  nameEn: string;
  universityMail: string;
  alternativeMail: string;
  nationality: string;
  nationalID: string;
  phone: string;
  birthDate: Date;
  photo: string;
  degreeDTO: DegreeModel;
  departmentDTO: DepartmentModel;
  collegeDTO: CollegeModel;
  user: UserModel;

}
