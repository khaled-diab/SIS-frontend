import {BaseModel} from './base-model';

export class PageQueryUtil {

  page: number;
  limit: number;

  constructor(page: number,  limit: number) {
    this.page = page;
    this.limit = limit;
  }
}
