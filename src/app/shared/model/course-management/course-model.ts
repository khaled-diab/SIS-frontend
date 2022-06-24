import {BaseModel} from '../base-model';
import {CollegeModel} from '../college-management/college-model';
import {DepartmentModel} from '../department-management/department-model';
import {AcademicProgramModel} from '../academicProgram-management/academicProgram-model';

export class CourseModel extends BaseModel {

  code: string;
  nameAr: string;
  nameEn: string;
  theoreticalHours: number;
  exercisesHours: number;
  practicalHours: number;
  totalHours: number;
  weeks: number;
  finalGrade: number;
  finalExamGrade: number;
  practicalGrade: number;
  oralGrade: number;
  midGrade: number;
  collegeDTO: CollegeModel;
  departmentDTO: DepartmentModel;

}
