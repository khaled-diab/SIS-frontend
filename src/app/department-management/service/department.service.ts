import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Constants} from 'src/app/shared/constants';
import {DepartmentModel} from 'src/app/shared/model/department-management/department-model';
import {DepartmentRequestModel} from 'src/app/shared/model/department-management/department-request-model';
import {MessageResponse} from 'src/app/shared/model/message-response';
import {CollegeModel} from '../../shared/model/college-management/college-model';

@Injectable({
   providedIn: 'root'
})
export class DepartmentService {
   // FormData : DepartmentModel = new DepartmentModel();

   // static departmentsList: DepartmentModel[];
   departmentFilterEvent: Subject<any> = new Subject<any>();
   departmentDeleteEvent: Subject<any> = new Subject<any>();
   departmentSaveEvent: Subject<DepartmentModel> = new Subject<DepartmentModel>();
   closeSaveEvent: Subject<any> = new Subject();

   constructor(private httpClient: HttpClient) {
   }

   getDepartmentsByCollege(collegeId: number): DepartmentModel[] {
      // @ts-ignore
      return JSON.parse(localStorage.getItem(Constants.DEPARTMENTS_LIST)).filter(value => {
         return (value.collegeDTO?.id === collegeId);
      });
   }

   getDepartmentsByCollege2(collegeId: number): Observable<DepartmentModel[]> {
      return this.httpClient.get<DepartmentModel[]>(Constants.getDepartmentsByCollege + collegeId);

   }

   public getDepartments():
      Observable<DepartmentModel[]> {
      return this.httpClient.get<DepartmentModel[]>(Constants.getDepartments);
   }

   public deleteDepartment(id: number): Observable<MessageResponse> {
      return this.httpClient.get<MessageResponse>(`${Constants.deleteDepartments}/${id}`);
   }

// public saveClassroom(department: DepartmentModel): Observable<MessageResponse> {
// return this.httpClient.post<MessageResponse>('http://localhost:5000/api/departments/add', department);
// }

   constructClassroomRequestObject(departmentRequestModel: DepartmentRequestModel): DepartmentRequestModel {
      return departmentRequestModel;
   }

   public saveDepartment(department: DepartmentModel) {
      return this.httpClient.post(Constants.addDepartments, department);
   }
   public static get departmentsList(): DepartmentModel[]{
      // @ts-ignore
      return JSON.parse(localStorage.getItem(Constants.DEPARTMENTS_LIST));
   }
   public static set departmentsList(departmentModels: DepartmentModel[]){
      // @ts-ignore
      localStorage.setItem(Constants.DEPARTMENTS_LIST, JSON.stringify(departmentModels));
   }
}
