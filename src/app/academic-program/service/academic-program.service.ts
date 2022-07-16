import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Sort} from '@angular/material/sort';
import {Subject, Observable} from 'rxjs';
import {Constants} from 'src/app/shared/constants';
import {
   AcademicProgramRequestModel
} from 'src/app/shared/model/academicProgram-management/academic-program-request-model';
import {AcademicProgramModel} from 'src/app/shared/model/academicProgram-management/academicProgram-model';
import {MessageResponse} from 'src/app/shared/model/message-response';

@Injectable({
   providedIn: 'root'
})
export class AcademicProgramService {

   static academicProgramList: AcademicProgramModel[];
   academicProgramFilterEvent: Subject<any> = new Subject<any>();
   academicProgramSaveEvent: Subject<AcademicProgramModel> = new Subject<AcademicProgramModel>();
   academicProgramSaveCloseEvent: Subject<any> = new Subject<any>();
   academicProgramDeleteEvent: Subject<any> = new Subject<any>();

   constructor(private httpClient: HttpClient) {
   }


   public getAllAcademicPrograms():
      Observable<AcademicProgramModel[]> {
      return this.httpClient.get<AcademicProgramModel[]>(Constants.getAcademicPrograms);
   }

   public saveAcademicprogram(academicProgram: AcademicProgramModel): Observable<MessageResponse> {
      return this.httpClient.post<MessageResponse>(Constants.addAcademicPrograms, academicProgram);
   }

   constructCourseRequestObject(sort: Sort, academicProgaramRequestModel: AcademicProgramRequestModel): AcademicProgramRequestModel {
      if (sort.direction === 'asc') {
         academicProgaramRequestModel.sortDirection = Constants.ASC;
      } else if (sort.direction === 'desc') {
         academicProgaramRequestModel.sortDirection = Constants.DESC;
      } else {
         academicProgaramRequestModel.sortDirection = null;
      }
      academicProgaramRequestModel.sortBy = sort.active;
      return academicProgaramRequestModel;
   }

   deleteAcademicProgram(id: number): Observable<MessageResponse> {
      console.log("delete");
      return this.httpClient.get<MessageResponse>(Constants.deleteAcademicPrograms + id);
   }


   getCoursesByDepartment(departmentId: number): AcademicProgramModel[] {
      return AcademicProgramService.academicProgramList.filter(value => {
         return (value.departmentDTO?.id === departmentId);
      });
   }

   getAcademicProgramsByCollege(collegeId: number): Observable<AcademicProgramModel[]> {
      return this.httpClient.get<AcademicProgramModel[]>(Constants.academicProgramsByCollegeIdUrl + collegeId);
   }
}
