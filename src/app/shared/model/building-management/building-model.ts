import {BaseModel} from '../base-model';
import {CollegeModel} from '../college-management/college-model';
import {DepartmentModel} from '../department-management/department-model';

export class BuildingModel extends BaseModel {
  code: string;
  name: string;
  status: number;
  collegeDTO: CollegeModel;
  departmentDTO: DepartmentModel ;
}
