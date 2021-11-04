import {Constants} from '../../constants';

export class StudentFilterModel {
  filterValue: string;
  sortDirection: string = Constants.ASC;
  sortBy = 'id';
  collegeId: number;
  departmentId: number;
}
