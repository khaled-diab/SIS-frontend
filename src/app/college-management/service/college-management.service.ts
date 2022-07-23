import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Constants} from '../../shared/constants';
import {GeneralSearchRequest} from '../../shared/model/general-search-request';
import {PageRequest} from '../../shared/model/page-request';
import {CollegeModel} from '../../shared/model/college-management/college-model';
import {Sort} from '@angular/material/sort';
import {MessageResponse} from '../../shared/model/message-response';
import {environment} from '../../../environments/environment';

@Injectable({
   providedIn: 'root'
})
export class CollegeManagementService {
   constructor(private httpClient: HttpClient) {
   }

   collegeFilterEvent: Subject<GeneralSearchRequest> = new Subject<GeneralSearchRequest>();
   closeSaveEvent: Subject<any> = new Subject();
   collegeSaveEvent: Subject<CollegeModel> = new Subject<CollegeModel>();
   collegeDeleteEvent: Subject<any> = new Subject<any>();

   public getCollegePage(pageNumber: number, pageSize: number, collegeFilterModel: GeneralSearchRequest):
      Observable<PageRequest<CollegeModel>> {
      return this.httpClient.post<PageRequest<CollegeModel>>(Constants.collegePageUrl + pageNumber + '/' + pageSize, collegeFilterModel);
   }

   public getColleges(): Observable<CollegeModel[]> {
      return this.httpClient.get<CollegeModel[]>(environment.baseURL + '/colleges/all');
   }

   public deleteCollege(id: number): Observable<MessageResponse> {
      return this.httpClient.get<MessageResponse>(Constants.deleteCollegeUrl + id);
   }

   public saveCollege(college: CollegeModel): Observable<MessageResponse> {
      return this.httpClient.post<MessageResponse>(Constants.saveCollegeUrl, college);
   }

   public checkCollegeCode(code: string | null): Observable<MessageResponse> {
      return this.httpClient.get<MessageResponse>(`${Constants.checkCollegeCode}/${code}`);
   }

   constructCollegeRequestObject(sort: Sort, collegeRequestModel: GeneralSearchRequest): GeneralSearchRequest {
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

   public getAllColleges():
      Observable<CollegeModel[]> {
      console.log(localStorage.getItem('Authorization'));
      return this.httpClient.get <CollegeModel[]>(environment.baseURL + '/colleges/all', {
         headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'jwt-token': localStorage.getItem(Constants.authHeader) || 'none',
            t: 't',
            x: 'x',
            f: 't',
            d: 'x'
         })
      });
   }

}
