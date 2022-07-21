import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {PageRequest} from '../../shared/model/page-request';
import {HttpClient} from '@angular/common/http';
import {Sort} from '@angular/material/sort';
import {Constants} from '../../shared/constants';
import {MessageResponse} from '../../shared/model/message-response';
import {GradeBookModel} from '../../shared/model/gradebook-management/gradeBook-model';
import {GradeBookRequestModel} from '../../shared/model/gradebook-management/gradeBook-request-model';
import {CourseModel} from '../../shared/model/course-management/course-model';
import {StudentModel} from '../../shared/model/student-management/student-model';
import {SectionModel} from '../../shared/model/section-model';

@Injectable({
   providedIn: 'root'
})
export class GradeBookManagementService {

   gradeBookFilterEvent: Subject<GradeBookRequestModel> = new Subject<GradeBookRequestModel>();
   gradeBookUpdateEvent: Subject<GradeBookModel> = new Subject<GradeBookModel>();
   gradeBookCloseUpdateEvent: Subject<any> = new Subject<any>();
   gradeBookFilterCourseIdEvent: Subject<any[]> = new Subject<any[]>();

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

   updateGradeBook(gradeBookModels: GradeBookModel[]): Observable<MessageResponse> {
      return this.httpClient.post<MessageResponse>(Constants.updateGradeBookUrl, gradeBookModels);
   }

   getSectionsByFacultyMemberId(termId: number, facultyMemberId: number): Observable<SectionModel[]> {
      return this.httpClient.get<SectionModel[]>(Constants.getSectionsByFacultyMemberId + termId + '/' + facultyMemberId);
   }

   // getStudentsBySectionId(pageNumber: number, pageSize: number, sectionId: number): Observable<PageRequest<StudentModel>> {
   //    return this.httpClient.get<PageRequest<StudentModel>>(Constants.getStudentsCourseId + (pageNumber + 1) + '/' + pageSize + '/' + sectionId);
   // }

}
