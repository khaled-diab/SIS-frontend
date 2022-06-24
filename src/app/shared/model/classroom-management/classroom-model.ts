import {BaseModel} from '../base-model';
import {BuildingModel} from '../building-management/building-model';
import {DepartmentModel} from '../department-management/department-model';

export class ClassroomModel extends BaseModel {
  code: string;
  nameAr: string;
  nameEn: string;
  status: number;
  capacity: number;
  departmentDTO: DepartmentModel;
  buildingDTO: BuildingModel;
}
