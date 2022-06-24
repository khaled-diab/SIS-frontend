import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Constants} from '../../shared/constants';
import {ClassroomRequestModel} from '../../shared/model/classroom-management/classroom-request-model';
import {ClassroomModel} from '../../shared/model/classroom-management/classroom-model';
import {MessageResponse} from '../../shared/model/message-response';

@Injectable({
  providedIn: 'root'
})
export class ClassroomManagementService {

  static classroomsList: ClassroomModel[];
  classroomFilterEvent: Subject<any[]> = new Subject<any[]>();
  classroomDeleteEvent: Subject<any> = new Subject<any>();
  classroomSaveEvent: Subject<ClassroomModel> = new Subject<ClassroomModel>();
  closeSaveEvent: Subject<any> = new Subject();


  constructor(private httpClient: HttpClient) {
  }

  public getClassrooms():
    Observable<ClassroomModel[]> {
    return this.httpClient.get<ClassroomModel[]>(Constants.classroomPageUrl);
  }

  public deleteClassroom(id: number): Observable<MessageResponse> {
    return this.httpClient.delete<MessageResponse>(Constants.deleteClassroomUrl + id);
  }

  public saveClassroom(classroom: ClassroomModel): Observable<MessageResponse> {
    return this.httpClient.post<MessageResponse>(Constants.saveClassroomUrl, classroom);
  }

  constructClassroomRequestObject(classroomRequestModel: ClassroomRequestModel): ClassroomRequestModel {
    return classroomRequestModel;
  }

  getClassroomsByBuilding(buildingId: number): ClassroomModel[] {
    return ClassroomManagementService.classroomsList.filter(value => {
      return (value.buildingDTO?.id === buildingId);
    });
  }

}
