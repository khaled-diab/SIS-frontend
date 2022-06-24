import {BaseModel} from '../base-model';
import {DepartmentModel} from '../department-management/department-model';
import {CollegeModel} from '../college-management/college-model';

export class AcademicProgramModel extends BaseModel {
  departmentDTO: DepartmentModel ;
  code: string;
  // tslint:disable-next-line:variable-name
  name_ar: string;
  // tslint:disable-next-line:variable-name
  name_en: string;
  collegeDTO: CollegeModel ;

}
