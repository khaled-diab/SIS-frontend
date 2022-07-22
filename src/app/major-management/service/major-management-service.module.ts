import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {PageRequest} from '../../shared/model/page-request';
import {HttpClient} from '@angular/common/http';
import {Sort} from '@angular/material/sort';
import {Constants} from '../../shared/constants';
import {MessageResponse} from '../../shared/model/message-response';
import {MajorRequestModel} from '../../shared/model/major-management/major-request-model';
import {MajorModel} from '../../shared/model/major-management/major-model';
import {MajorTableRecordsModel} from '../../shared/model/major-management/major-table-records-model';

@Injectable({
   providedIn: 'root'
})
export class MajorManagementServiceModule {

   majorFilterEvent: Subject<MajorRequestModel> = new Subject<MajorRequestModel>();
   majorDeleteEvent: Subject<any> = new Subject<any>();
   majorCloseUpdateEvent: Subject<any> = new Subject<any>();

   constructor(private httpClient: HttpClient) {
   }

   public filterMajors(pageNumber: number, pageSize: number, majorRequestModel: MajorRequestModel):
      Observable<PageRequest<MajorTableRecordsModel>> {
      return this.httpClient.post<PageRequest<MajorTableRecordsModel>>
      (Constants.filterMajorsUrl + (pageNumber + 1) + '/' + pageSize, majorRequestModel);
   }

   constructMajorRequestObject(sort: Sort, majorRequestModel: MajorRequestModel): MajorRequestModel {
      if (sort.direction === 'asc') {
         majorRequestModel.sortDirection = Constants.ASC;
      } else if (sort.direction === 'desc') {
         majorRequestModel.sortDirection = Constants.DESC;
      } else {
         majorRequestModel.sortDirection = null;
      }
      majorRequestModel.sortBy = sort.active;
      return majorRequestModel;
   }

   addMajor(majorModel: MajorModel): Observable<MessageResponse> {
      return this.httpClient.post<MessageResponse>(Constants.addMajorUrl, majorModel);
   }

   updateMajor(majorModel: MajorModel): Observable<MessageResponse> {
      return this.httpClient.post<MessageResponse>(Constants.updateMajorUrl, majorModel);
   }

   deleteMajor(id: number): Observable<MessageResponse> {
      return this.httpClient.get<MessageResponse>(Constants.deleteMajorUrl + id);
   }

   majorById(id: number): Observable<MajorModel> {
      return this.httpClient.get<MajorModel>(Constants.majorByIdUrl + id);
   }

}
