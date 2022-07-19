import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {PageRequest} from '../../shared/model/page-request';
import {HttpClient} from '@angular/common/http';
import {Sort} from '@angular/material/sort';
import {Constants} from '../../shared/constants';
import {MessageResponse} from '../../shared/model/message-response';
import {GradeBookModel} from '../../shared/model/gradebook-management/gradeBook-model';
import {GradeBookRequestModel} from '../../shared/model/gradebook-management/gradeBook-request-model';

@Injectable({
   providedIn: 'root'
})
export class GradeBookManagementService {

   gradeBookFilterEvent: Subject<GradeBookRequestModel> = new Subject<GradeBookRequestModel>();
   gradeBookUpdateEvent: Subject<GradeBookModel> = new Subject<GradeBookModel>();
   gradeBookCloseUpdateEvent: Subject<any> = new Subject<any>();

   constructor(private httpClient: HttpClient) {
   }

   public filterGradeBook(pageNumber: number, pageSize: number, gradeBookRequestModel: GradeBookRequestModel):
      Observable<PageRequest<GradeBookModel>> {
      return this.httpClient.post<PageRequest<GradeBookModel>>
      (Constants.filterGradeBookUrl + (pageNumber + 1) + '/' + pageSize, gradeBookRequestModel);
   }

   constructGradeBookRequestObject(sort: Sort, gradeBookRequestModel: GradeBookRequestModel): GradeBookRequestModel {
      if (sort.direction === 'asc') {
         gradeBookRequestModel.sortDirection = Constants.ASC;
      } else if (sort.direction === 'desc') {
         gradeBookRequestModel.sortDirection = Constants.DESC;
      } else {
         gradeBookRequestModel.sortDirection = null;
      }
      gradeBookRequestModel.sortBy = sort.active;
      return gradeBookRequestModel;
   }

   updateGradeBook(gradeBookModel: GradeBookModel): Observable<MessageResponse> {
      return this.httpClient.post<MessageResponse>(Constants.updateGradeBookUrl, gradeBookModel);
   }

}
