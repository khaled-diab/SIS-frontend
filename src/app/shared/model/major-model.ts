import {BaseModel} from './base-model';
import {DepartmentModel} from './department-management/department-model';
import {CollegeModel} from './college-management/college-model';


export class MajorModel extends BaseModel {
  nameAr: string;
  nameEn: string;
  departmentDTO: DepartmentModel;
  collegeDTO: CollegeModel;
}
