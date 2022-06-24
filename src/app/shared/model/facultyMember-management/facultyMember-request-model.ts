import {Constants} from '../../constants';

export class FacultyMemberRequestModel {
  searchValue: string;
  sortDirection: string | null = Constants.ASC;
  sortBy = 'nameAr';
  filterCollege: number;
  filterDepartment: number;
}
