import {Constants} from '../../constants';

export class StudentRequestModel {
  filterValue: string;
  sortDirection: string | null = Constants.ASC;
  sortBy = 'nameAr';
  collegeId: number;
  departmentId: number | null;
  level: string;

}
