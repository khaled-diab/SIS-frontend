import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Constants } from 'src/app/shared/constants';
import { AttendanceReportByLectureManagementModel } from 'src/app/shared/model/attendanceReportByLecture-management/attendance-report-by-lecture-management-model';
import { AttendanceReportRequestModel } from 'src/app/shared/model/attendanceReportByLecture-management/attendance-report-request-model';
import { CourseModel } from 'src/app/shared/model/course-management/course-model';
import { SectionModel } from 'src/app/shared/model/section-model';
import { AttendanceDetailsModel } from 'src/app/shared/model/student-attendance/attendanceDetails-model';
import { LectureModel } from 'src/app/shared/model/student-attendance/lecture-model';
import { StudentModel } from 'src/app/shared/model/student-management/student-model';

@Injectable({
  providedIn: 'root'
})
export class AttendaneReportByLectureService {
  constructor(private http: HttpClient) { }
  static sectionList: SectionModel[];
  attendanceReportByLectureFilterEvent: Subject<any> = new Subject<any>();
  attendanceDetailsByLectureFilterEvent: Subject<any> = new Subject<any>();
  closeSaveEvent: Subject<any> = new Subject();
  sectionINFO: SectionModel = new SectionModel();

attendaceReportModdel: AttendanceDetailsModel = new AttendanceDetailsModel();
studentAttendance: AttendanceReportByLectureManagementModel = new AttendanceReportByLectureManagementModel();
public getAllCourses():
Observable<CourseModel[]> {
return this.http.get <CourseModel[]>(Constants.getCourses);
}
public getlectureReport(sectionId: number): Observable<LectureModel[]>{
  console.log(sectionId);
  return this.http.get <LectureModel[]>(`${Constants.lecturesReport}/${sectionId}`);
}
public getAllsections():
Observable<SectionModel[]> {
return this.http.get <SectionModel[]>(Constants.getSections);
}
public getsection(id: number): Observable<SectionModel>{
  return this.http.get <SectionModel>(`${Constants.getSection}/${id}`);

}
public getStudentAttendanceReport(lectureId: string | null): Observable<any>{
   console.log(lectureId);
  return this.http.get <any>(`${Constants.studentAttendanceReport}/${lectureId}`);
}
editattendanceStatues(attendance: AttendanceDetailsModel) {
   return this.http.put(`${Constants.attendanceDetails}`, attendance);
}

}
