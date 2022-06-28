import {Constants} from '../../constants';

export class CourseRequestModel {
   searchValue: string;
   filterCollege: number;
   filterDepartment: number;
   sortDirection: string | null = Constants.ASC;
   sortBy = 'nameAr';
}
