import {BaseModel} from './base-model';

export class PageRequest<T extends BaseModel> {
  totalCount: number;
  pageSize: number;
  totalPage: number;
  currPage: number;
  data: T[];
}
