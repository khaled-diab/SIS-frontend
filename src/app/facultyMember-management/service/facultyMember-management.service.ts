import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {PageRequest} from '../../shared/model/page-request';
import {HttpClient} from '@angular/common/http';
import {PageQueryUtil} from '../../shared/model/page-query';
import {Sort} from '@angular/material/sort';
import {Constants} from '../../shared/constants';
import {MessageResponse} from '../../shared/model/message-response';
import {FacultyMemberRequestModel} from '../../shared/model/facultyMember-management/facultyMember-request-model';
import {FacultyMemberModel} from '../../shared/model/facultyMember-management/facultyMember-model';
import {DegreeModel} from '../../shared/model/Degree-management/degree-model';

@Injectable({
  providedIn: 'root'
})
export class FacultyMemberManagementService {

  static facultyMembersList: FacultyMemberModel[];
  facultyMemberFilterEvent: Subject<FacultyMemberRequestModel> = new Subject<FacultyMemberRequestModel>();
  facultyMemberDeleteEvent: Subject<any> = new Subject<any>();
  facultyMemberCloseUpdateEvent: Subject<any> = new Subject<any>();

  constructor(private httpClient: HttpClient) {
  }

  getFacultyMembersPage(pageNumber: number, pageSize: number): Observable<PageRequest<FacultyMemberModel>> {
    const pageQuery = new PageQueryUtil(pageNumber + 1, pageSize);
    console.log(pageQuery);
    return this.httpClient.post<PageRequest<FacultyMemberModel>>(Constants.facultyMemberPageUrl, pageQuery);
  }

  public searchFacultyMembers(pageNumber: number, pageSize: number, facultyMemberRequestModel: FacultyMemberRequestModel):
    Observable<PageRequest<FacultyMemberModel>> {
    console.log(pageNumber, pageSize);
    return this.httpClient.post<PageRequest<FacultyMemberModel>>
    (Constants.searchFacultyMemberUrl + (pageNumber + 1) + '/' + pageSize, facultyMemberRequestModel);
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
    return this.httpClient.post<MessageResponse>(Constants.saveFacultyMemberUrl, facultyMember);

  }

  deleteFacultyMember(id: number): Observable<MessageResponse> {
    return this.httpClient.delete<MessageResponse>(Constants.deleteFacultyMemberUrl + id);
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

  allFacultyMembers(): Observable<FacultyMemberModel[]>{
    return this.httpClient.get <FacultyMemberModel[]>(Constants.allFacultyMembersUrl);
  }

  getFacultyMembersByDepartment(departmentId: number): FacultyMemberModel[] {
    return FacultyMemberManagementService.facultyMembersList.filter(value => {
      return (value.departmentDTO?.id === departmentId);
    });
  }

}
