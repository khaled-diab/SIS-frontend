import {BaseModel} from '../base-model';
import {BuildingModel} from '../building-management/building-model';
import {DepartmentModel} from '../department-management/department-model';
import {CollegeModel} from '../college-management/college-model';

export class ClassroomModel extends BaseModel {
  code: string;
  name: string;
  status: number;
  capacity: number;
  collegeDTO: CollegeModel;
  buildingDTO: BuildingModel;
}
