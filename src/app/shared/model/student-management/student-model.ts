import {BaseModel} from '../base-model';
import {CollegeModel} from '../college-management/college-model';
import {DepartmentModel} from '../department-management/department-model';
import {AcademicProgramModel} from '../academicProgram-management/academicProgram-model';

export class StudentModel extends BaseModel {
  universityId: number;
  nameAr: string;
  nameEn: string;
  nationality: string;
  nationalID: string;
  birthDate: Date;
  universityMail: string;
  alternativeMail: string;
  phone: string;
  parentPhone: string;
  level: string;
  photo: string;
  departmentDTO: DepartmentModel;
  collegeDTO: CollegeModel;
  academicProgramDTO: AcademicProgramModel;
}
