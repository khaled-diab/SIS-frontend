import {Constants} from '../constants';

export class GeneralSearchRequest {
  filterValue: string;
  sortDirection: string | null = Constants.ASC;
  sortBy = 'id';
}
