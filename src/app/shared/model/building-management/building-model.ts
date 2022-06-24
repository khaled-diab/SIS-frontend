import {BaseModel} from '../base-model';
import {CollegeModel} from '../college-management/college-model';

export class BuildingModel extends BaseModel {
  code: string;
  nameAr: string;
  nameEn: string;
  status: number;
  collegeDTO: CollegeModel;
}
