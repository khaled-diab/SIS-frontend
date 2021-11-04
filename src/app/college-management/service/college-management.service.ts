import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Constants} from '../../shared/constants';
import {CollegeRequestModel} from '../../shared/model/college-management/college-request-model';
import {PageRequest} from '../../shared/model/page-request';
import {CollegeModel} from '../../shared/model/college-management/college-model';
import {Sort} from '@angular/material/sort';
import {MessageResponse} from '../../shared/model/message-response';

@Injectable({
  providedIn: 'root'
})
export class CollegeManagementService {

  departmentFilterEvent: Subject<CollegeRequestModel> = new Subject<CollegeRequestModel>();
  collegeDeleteEvent: Subject<any> = new Subject<any>();


  constructor(private httpClient: HttpClient) {
  }

  public getCollegePage(pageNumber: number, pageSize: number, collegeFilterModel: CollegeRequestModel):
    Observable<PageRequest<CollegeModel>> {
    return this.httpClient.post<PageRequest<CollegeModel>>(Constants.collegePageUrl + pageNumber + '/' + pageSize, collegeFilterModel);
  }

  constructCollegeRequestObject(sort: Sort, collegeRequestModel: CollegeRequestModel): CollegeRequestModel {
    if (sort.direction === 'asc') {
      collegeRequestModel.sortDirection = Constants.ASC;
    } else if (sort.direction === 'desc') {
      collegeRequestModel.sortDirection = Constants.DESC;
    } else {
      collegeRequestModel.sortDirection = null;
    }
    collegeRequestModel.sortBy = sort.active;
    return collegeRequestModel;
  }

  deleteCollege(id: number): Observable<MessageResponse> {
    return this.httpClient.delete<MessageResponse>(Constants.deleteCollegeUrl + id);
  }
}
