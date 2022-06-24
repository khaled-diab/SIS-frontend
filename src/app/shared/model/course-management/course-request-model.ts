import {Constants} from '../../constants';
import {BaseModel} from '../base-model';

export class CourseRequestModel extends BaseModel{
  searchValue: string;
  filterCollege: number;
  filterDepartment: number;
  sortDirection: string | null = Constants.ASC;
  sortBy = 'nameAr';
}
