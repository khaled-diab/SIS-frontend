import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Constants} from '../../shared/constants';
import {CollegeFilterModel} from '../../shared/model/college-management/college-filter-model';
import {PageRequest} from '../../shared/model/page-request';
import {CollegeModel} from '../../shared/model/college-management/college-model';

@Injectable({
  providedIn: 'root'
})
export class CollegeManagementService {

  departmentFilterEvent: Subject<CollegeFilterModel> = new Subject<CollegeFilterModel>();

  constructor(private httpClient: HttpClient) {
  }

  public getCollegePage(pageNumber: number, pageSize: number, collegeFilterModel: CollegeFilterModel):
    Observable<PageRequest<CollegeModel>> {
    return this.httpClient.post<PageRequest<CollegeModel>>(Constants.collegePageUrl + pageNumber + '/' + pageSize, collegeFilterModel);
  }
}
