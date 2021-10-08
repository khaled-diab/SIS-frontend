import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CollegePage} from '../model/college-page';
import {Constants} from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class CollegeManagementService {

  constructor(private httpClient: HttpClient) {
  }

  public getCollegePage(pageNumber: number, pageSize: number): Observable<CollegePage> {
    return this.httpClient.get<CollegePage>(Constants.collegePageUrl + pageNumber + '/' + pageSize);
  }
}
