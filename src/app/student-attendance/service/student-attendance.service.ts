import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

import {TimetableModel} from '../../shared/model/timetable-model';
import {MessageResponse} from '../../shared/model/message-response';
import {Constants} from '../../shared/constants';
import {LectureModel} from '../../shared/model/student-attendance/lecture-model';
import {SectionModel} from '../../shared/model/section-model';
import {AttendanceDetailsModel} from '../../shared/model/student-attendance/attendanceDetails-model';


@Injectable({
  providedIn: 'root'
})
export class StudentAttendanceService {
  saveLectureEvent: Subject<LectureModel> = new Subject<LectureModel>();
  getAttendancesEvent: Subject<LectureModel> = new Subject<LectureModel>();
  saveAttendanceEvent: Subject<AttendanceDetailsModel> = new Subject<AttendanceDetailsModel>();
  cancelAttendanceCodeDialogEvent: Subject<any> = new Subject<any>();

  constructor(private httpClient: HttpClient) { }

  getFacultyMemberSections(facultyMemberId: number): Observable<SectionModel[]>{
    return this.httpClient.get<SectionModel[]>(Constants.getFacultyMemberSectionsUrl + facultyMemberId);
  }
  getSectionTimetables(sectionId: number): Observable<TimetableModel[]>{
    return this.httpClient.get<TimetableModel[]>(Constants.getSectionTimeTablesUrl + sectionId );
  }
  addLecture(lecture: LectureModel): Observable < LectureModel > {
    return this.httpClient.post<LectureModel>(Constants.addLectureUrl, lecture);
  }
  addManualAttendance(attendanceDetailsModels: AttendanceDetailsModel[]): Observable < AttendanceDetailsModel[] > {
    return this.httpClient.post<AttendanceDetailsModel[]>(Constants.addManualAttendanceUrl, attendanceDetailsModels);
  }

  disableLecture(lecture: LectureModel): Observable<MessageResponse>{
    return this.httpClient.post<MessageResponse>(Constants.disableLectureUrl + lecture.id, lecture);
  }

  getAttendancesByLecture(lectureId: number): Observable<AttendanceDetailsModel[]>{
    return this.httpClient.get<AttendanceDetailsModel[]>(Constants.getAttendancesByLectureUrl + lectureId);
  }
}
