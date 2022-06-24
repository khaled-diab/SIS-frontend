import {Constants} from '../../constants';

export class CourseFilterModel {
  filterValue: string;
  sortDirection: string = Constants.ASC;
  sortBy = 'id';
  collegeId: number;
  departmentId: number;
}
