import {BaseModel} from '../base-model';
import {CollegeModel} from '../college-management/college-model';

export class DepartmentModel extends BaseModel {
  code: string;
  nameAr: string;
  nameEn: string;
  collegeDTO: CollegeModel | null;

}
