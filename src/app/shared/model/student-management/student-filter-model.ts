import {Constants} from '../../constants';

export class StudentFilterModel {
  filterValue: string;
  sortDirection: string = Constants.ASC;
  sortBy = 'id';
}
