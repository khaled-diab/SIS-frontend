import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { AttendaneReportByLectureService } from 'src/app/attendance-by-lecture-management/service/attendane-report-by-lecture.service';
import { SectionManagementService } from 'src/app/section-management/service/sectionManagement.service';
import { AttendanceReportRequestModel } from 'src/app/shared/model/attendanceReportByLecture-management/attendance-report-request-model';
import { AttendanceStudentReportRequestModel } from 'src/app/shared/model/attendanceReportByStudent-management/attendance-Studentreport-request-model';
import { CourseModel } from 'src/app/shared/model/course-management/course-model';
import { SectionRequestModel } from 'src/app/shared/model/section-management/section-request-model';
import { SectionModel } from 'src/app/shared/model/section-model';
import { AttendaneReportByStudentService } from '../../service/attendane-report-by-student.service';

@Component({
  selector: 'app-attendane-report-by-student-filter',
  templateUrl: './attendane-report-by-student-filter.component.html',
  styleUrls: ['./attendane-report-by-student-filter.component.css']
})
export class AttendaneReportByStudentFilterComponent implements OnInit {

  attendanceFilterReport: AttendanceStudentReportRequestModel=new AttendanceStudentReportRequestModel();
  // lectures:AttendanceReportByLectureManagementModel[];
  // searchValue: string;
  // filterCourse: number;
  // filterSection: number;
  lectures :any;
  courses: CourseModel[];
  newSections:SectionModel[]=[];
  sections: SectionModel[];
  sectionRequestModel:SectionRequestModel=new SectionRequestModel();
  attendanceReportRequest :AttendanceStudentReportRequestModel=new AttendanceStudentReportRequestModel();
  @ViewChild('courseSelect', {static: true})  courseSelect: MatSelect;
  @ViewChild('sectionSelect', {static: true})  sectionSelect: MatSelect;

  constructor(private lectureReportService : AttendaneReportByLectureService,
              private studentReportService : AttendaneReportByStudentService,
              private sectionService :SectionManagementService ) { }

  ngOnInit(): void {
    this.lectureReportService.getAllCourses().subscribe(Response => {
      this.courses = Response;
      console.log(Response);
      
    });
    this.lectureReportService.getAllsections().subscribe(Response => {
      this.sections=Response;
      console.log(Response)
    })
  }
  ngAfterViewInit(): void { 

        this.sectionSelect.valueChange.subscribe(value=>{
          if (this.sectionSelect !== undefined){
            this.attendanceReportRequest.filterSection=this.sectionSelect.value;
            this.studentReportService.getStudentReport(this.sectionSelect.value)
            .subscribe(Response=>
              {
                console.log(Response);
              })
          
            
          }  
          this.attendanceFilterReport.filterSection=value;
          this.studentReportService.attendanceReportByStudentFilterEvent.next(this.attendanceReportRequest)
        })
      }
     
    
  
  applyFilter(): void {
    this.studentReportService.attendanceReportByStudentFilterEvent.next(this.attendanceFilterReport);
  }

  resetFilter(): void {
    this.studentReportService.attendanceReportByStudentFilterEvent.next(this.attendanceFilterReport);
  }

}
