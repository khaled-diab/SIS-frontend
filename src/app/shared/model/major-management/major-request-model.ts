import {BaseModel} from '../base-model';
import {Constants} from '../../constants';


export class MajorRequestModel extends BaseModel {
   searchValue: string;
   sortDirection: string | null = Constants.ASC;
   sortBy = 'nameAr';
   filterCollege: number;
   filterDepartment: number;
}
