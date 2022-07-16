import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {PageRequest} from '../../shared/model/page-request';
import {HttpClient} from '@angular/common/http';
import {Sort} from '@angular/material/sort';
import {Constants} from '../../shared/constants';
import {MessageResponse} from '../../shared/model/message-response';
import {TimetableRequestModel} from '../../shared/model/timetable-management/timetable-request-model';
import {TimetableModel} from '../../shared/model/timetable-management/timetable-model';
import {LectureTypeModel} from '../../shared/model/lectureType-model';
import {TimetableTableRecordsModel} from '../../shared/model/timetable-management/timetableTableRecords-model';
import {RoleModel} from '../../shared/model/security/role-model';

@Injectable({
   providedIn: 'root'
})
export class TimetableManagementService {

   timetableAddEvent: Subject<TimetableModel> = new Subject<TimetableModel>();
   timetableUpdateEvent: Subject<TimetableModel> = new Subject<TimetableModel>();
   timetableFilterEvent: Subject<TimetableRequestModel> = new Subject<TimetableRequestModel>();
   timetableDeleteEvent: Subject<any> = new Subject<any>();
   timetableCloseUpdateEvent: Subject<any> = new Subject<any>();
   timetableFilterByDayEvent: Subject<any> = new Subject<any>();

   constructor(private httpClient: HttpClient) {
   }

   public searchTimetables(pageNumber: number, pageSize: number, timetableRequestModel: TimetableRequestModel):
      Observable<PageRequest<TimetableModel>> {
      console.log(pageNumber, pageSize);
      return this.httpClient.post<PageRequest<TimetableModel>>
      (Constants.searchTimetableUrl + (pageNumber + 1) + '/' + pageSize, timetableRequestModel);
   }

   public filterTimetables(pageNumber: number, pageSize: number, timetableRequestModel: TimetableRequestModel):
      Observable<PageRequest<TimetableTableRecordsModel>> {
      console.log(pageNumber, pageSize);
      return this.httpClient.post<PageRequest<TimetableTableRecordsModel>>
      (Constants.filterTimetableUrl + (pageNumber + 1) + '/' + pageSize, timetableRequestModel);
   }

   constructTimetableRequestObject(sort: Sort, timetableRequestModel: TimetableRequestModel): TimetableRequestModel {
      if (sort.direction === 'asc') {
         timetableRequestModel.sortDirection = Constants.ASC;
      } else if (sort.direction === 'desc') {
         timetableRequestModel.sortDirection = Constants.DESC;
      } else {
         timetableRequestModel.sortDirection = null;
      }
      timetableRequestModel.sortBy = sort.active;
      return timetableRequestModel;
   }

   saveTimetables(timetables: TimetableModel[]): Observable<MessageResponse> {
      timetables.forEach(value => {
         value.facultyMemberDTO.user.role = new RoleModel();
      });
      return this.httpClient.post<MessageResponse>(Constants.saveTimetableUrl, timetables);
   }

   updateTimetable(timetable: TimetableModel): Observable<MessageResponse> {
      timetable.facultyMemberDTO.user.role = new RoleModel();
      return this.httpClient.post<MessageResponse>(Constants.updateTimetableUrl, timetable);
   }

   deleteTimetable(id: number): Observable<MessageResponse> {
      return this.httpClient.get<MessageResponse>(Constants.deleteTimetableUrl + id);
   }

   getTimetableById(id: number): Observable<MessageResponse> {
      return this.httpClient.get<MessageResponse>(Constants.timetableByIdUrl + id);
   }

   public getAllLectureTypes():
      Observable<LectureTypeModel[]> {
      return this.httpClient.get <LectureTypeModel[]>(Constants.allLectureTypesUrl);
   }

   public getStudentTimetables(userId: number): Observable<TimetableTableRecordsModel[]> {
      return this.httpClient.get <TimetableTableRecordsModel[]>(Constants.studentTimetablesUrl + userId);
   }
}
