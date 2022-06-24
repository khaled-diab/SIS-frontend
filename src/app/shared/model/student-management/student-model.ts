import {BaseModel} from '../base-model';
import {CollegeModel} from '../college-management/college-model';
import {DepartmentModel} from '../department-management/department-model';
import {AcademicProgramModel} from '../academicProgram-management/academicProgram-model';
import {UserModel} from '../security/user-model';

export class StudentModel extends BaseModel {

  universityId: number;
  nameAr: string;
  nameEn: string;
  nationality: string;
  nationalId: string;
  birthDate: Date;
  universityMail: string;
  alternativeMail: string;
  phone: string;
  parentPhone: string;
  level: string;
  year: string;
  photo: string;
  departmentDTO: DepartmentModel;
  collegeDTO: CollegeModel;
  academicProgramDTO: AcademicProgramModel;
  user: UserModel;

}
