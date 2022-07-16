import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {PageRequest} from '../../shared/model/page-request';
import {HttpClient} from '@angular/common/http';
import {Sort} from '@angular/material/sort';
import {Constants} from '../../shared/constants';
import {MessageResponse} from '../../shared/model/message-response';
import {FacultyMemberRequestModel} from '../../shared/model/facultyMember-management/facultyMember-request-model';
import {FacultyMemberModel} from '../../shared/model/facultyMember-management/facultyMember-model';
import {DegreeModel} from '../../shared/model/Degree-management/degree-model';
import {FacultyMemberTableRecordsModel} from '../../shared/model/facultyMember-management/facultyMemberTableRecords-model';
import {RoleModel} from '../../shared/model/security/role-model';

@Injectable({
   providedIn: 'root'
})
export class FacultyMemberManagementService {

   facultyMemberFilterEvent: Subject<FacultyMemberRequestModel> = new Subject<FacultyMemberRequestModel>();
   facultyMemberDeleteEvent: Subject<any> = new Subject<any>();
   facultyMemberCloseUpdateEvent: Subject<any> = new Subject<any>();

   constructor(private httpClient: HttpClient) {
   }

   public searchFacultyMembers(pageNumber: number, pageSize: number, facultyMemberRequestModel: FacultyMemberRequestModel):
      Observable<PageRequest<FacultyMemberModel>> {
      console.log(pageNumber, pageSize);
      return this.httpClient.post<PageRequest<FacultyMemberModel>>
      (Constants.searchFacultyMemberUrl + (pageNumber + 1) + '/' + pageSize, facultyMemberRequestModel);
   }

   public filterFacultyMembers(pageNumber: number, pageSize: number, facultyMemberRequestModel: FacultyMemberRequestModel):
      Observable<PageRequest<FacultyMemberTableRecordsModel>> {
      console.log(pageNumber, pageSize);
      return this.httpClient.post<PageRequest<FacultyMemberTableRecordsModel>>
      (Constants.filterFacultyMemberUrl + (pageNumber + 1) + '/' + pageSize, facultyMemberRequestModel);
   }

   constructFacultyMemberRequestObject(sort: Sort, facultyMemberRequestModel: FacultyMemberRequestModel): FacultyMemberRequestModel {
      if (sort.direction === 'asc') {
         facultyMemberRequestModel.sortDirection = Constants.ASC;
      } else if (sort.direction === 'desc') {
         facultyMemberRequestModel.sortDirection = Constants.DESC;
      } else {
         facultyMemberRequestModel.sortDirection = null;
      }
      facultyMemberRequestModel.sortBy = sort.active;
      return facultyMemberRequestModel;
   }

   addFacultyMember(facultyMember: FacultyMemberModel): Observable<MessageResponse> {
      return this.httpClient.post<MessageResponse>(Constants.saveFacultyMemberUrl, facultyMember);
   }

   updateFacultyMember(facultyMember: FacultyMemberModel): Observable<MessageResponse> {
      facultyMember.user.role = new RoleModel();
      return this.httpClient.post<MessageResponse>(Constants.saveFacultyMemberUrl, facultyMember);
   }

   deleteFacultyMember(id: number): Observable<MessageResponse> {
      return this.httpClient.get<MessageResponse>(Constants.deleteFacultyMemberUrl + id);
   }

   facultyMemberById(id: number): Observable<MessageResponse> {
      return this.httpClient.get<MessageResponse>(Constants.facultyMemberByIdUrl + id);
   }

   upload(selectedFile: File, name: string): Observable<string[]> {
      const uploadImageData = new FormData();
      uploadImageData.append('files', selectedFile, name);
      return this.httpClient.post<string[]>(Constants.uploadFacultyMemberImgUrl, uploadImageData, {});
   }

   public getAllDegrees():
      Observable<DegreeModel[]> {
      return this.httpClient.get <DegreeModel[]>(Constants.FacultyMemberDegrees);
   }

   getFacultyMembersByCollege(collegeId: number): Observable<FacultyMemberModel[]> {
      return this.httpClient.get<FacultyMemberModel[]>(Constants.facultyMembersByCollegeIdUrl + collegeId);
   }

   getFacultyMembersByUserId(userId: number): Observable<FacultyMemberModel> {
      return this.httpClient.get<FacultyMemberModel>(Constants.facultyMemberByUserIdUrl + userId);
   }

   public uploadBulkStudents(event: any): Observable<MessageResponse> {
      const file: File = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file, file.name.replaceAll('-', ''));
      return this.httpClient.post<MessageResponse>(Constants.UPLOAD_BULK_STAFF, formData);
   }
}
