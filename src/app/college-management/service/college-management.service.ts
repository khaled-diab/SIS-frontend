import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {CollegePage} from '../model/college-page';
import {Constants} from '../../shared/constants';
import {CollegeFilterModel} from '../model/college-filter-model';

@Injectable({
  providedIn: 'root'
})
export class CollegeManagementService {

  departmentFilterEvent: Subject<CollegeFilterModel> = new Subject<CollegeFilterModel>();

  constructor(private httpClient: HttpClient) {
  }

  public getCollegePage(pageNumber: number, pageSize: number, collegeFilterModel: CollegeFilterModel): Observable<CollegePage> {
    return this.httpClient.post<CollegePage>(Constants.collegePageUrl + pageNumber + '/' + pageSize, collegeFilterModel);
  }
}
