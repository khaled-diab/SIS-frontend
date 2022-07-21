import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {PageRequest} from '../../shared/model/page-request';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../../shared/constants';
import {MessageResponse} from '../../shared/model/message-response';
import {GradeBookModel} from '../../shared/model/gradebook-management/gradeBook-model';
import {GradeBookRequestModel} from '../../shared/model/gradebook-management/gradeBook-request-model';
import {SectionModel} from '../../shared/model/section-model';
import {GradeBookStudentRecordsModel} from '../../shared/model/gradebook-management/gradeBookStudentRecords-model';

@Injectable({
   providedIn: 'root'
})
export class GradeBookService {

   gradeBookFilterEvent: Subject<any[]> = new Subject<any[]>();
   gradeBookStudentRecordsFilterEvent: Subject<any[]> = new Subject<any[]>();

   constructor(private httpClient: HttpClient) {
   }

   public filterGradeBook(pageNumber: number, pageSize: number, gradeBookRequestModel: GradeBookRequestModel):
      Observable<PageRequest<GradeBookModel>> {
      return this.httpClient.post<PageRequest<GradeBookModel>>
      (Constants.filterGradeBookUrl + (pageNumber + 1) + '/' + pageSize, gradeBookRequestModel);
   }

   updateGradeBook(gradeBookModels: GradeBookModel[]): Observable<MessageResponse> {
      return this.httpClient.post<MessageResponse>(Constants.updateGradeBookUrl, gradeBookModels);
   }

   getSectionsByFacultyMemberId(termId: number, facultyMemberId: number): Observable<SectionModel[]> {
      return this.httpClient.get<SectionModel[]>(Constants.getSectionsByFacultyMemberId + termId + '/' + facultyMemberId);
   }

   getGradeBooksByTermIdAndStudentId(termId: number, studentId: number): Observable<GradeBookStudentRecordsModel[]> {
      return this.httpClient.get<GradeBookStudentRecordsModel[]>(Constants.getGradeBooksByTermIdAndStudentId + termId + '/' + studentId);
   }

}
