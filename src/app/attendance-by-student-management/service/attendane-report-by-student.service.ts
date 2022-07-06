import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Constants } from 'src/app/shared/constants';
import { AttendanceReportByStudentManagementModel } from 'src/app/shared/model/attendanceReportByStudent-management/attendance-report-by-Student-management-model';
import { CourseModel } from 'src/app/shared/model/course-management/course-model';
import { SectionModel } from 'src/app/shared/model/section-model';

@Injectable({
  providedIn: 'root'
})

export class AttendaneReportByStudentService {
  attendanceReportByStudentFilterEvent: Subject<any> = new Subject<any>();
  attendanceDetailsByStudentFilterEvent: Subject<any> = new Subject<any>();
  closeSaveEvent: Subject<any> = new Subject();
  constructor(private http: HttpClient) { }
  studentAttendance : AttendanceReportByStudentManagementModel=new AttendanceReportByStudentManagementModel()
  public getAllCourses():
  Observable<CourseModel[]> {
  return this.http.get <CourseModel[]>(Constants.getCourses);
  }

  public getAllsections():
  Observable<SectionModel[]> {
  return this.http.get <SectionModel[]>(Constants.getSections);
  }
  public getStudentReport(sectionId :number):Observable<AttendanceReportByStudentManagementModel[]>{
    console.log(sectionId);
    return this.http.get <AttendanceReportByStudentManagementModel[]>(`${Constants.studentReport}/${sectionId}`);
  }
}
