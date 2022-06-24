import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { SectionManagementService } from 'src/app/section-management/service/sectionManagement.service';
import { AttendanceReportByLectureManagementModel } from 'src/app/shared/model/attendanceReportByLecture-management/attendance-report-by-lecture-management-model';
import { AttendanceReportRequestModel } from 'src/app/shared/model/attendanceReportByLecture-management/attendance-report-request-model';
import { CourseModel } from 'src/app/shared/model/course-management/course-model';
import { SectionRequestModel } from 'src/app/shared/model/section-management/section-request-model';
import { SectionModel } from 'src/app/shared/model/section-model';
import { AttendaneReportByLectureService } from '../../service/attendane-report-by-lecture.service';

@Component({
  selector: 'app-attendane-report-by-lecture-filter',
  templateUrl: './attendane-report-by-lecture-filter.component.html',
  styleUrls: ['./attendane-report-by-lecture-filter.component.css']
})
export class AttendaneReportByLectureFilterComponent implements OnInit {
  attendanceFilterReport: AttendanceReportRequestModel=new AttendanceReportRequestModel();
  // lectures:AttendanceReportByLectureManagementModel[];
  // searchValue: string;
  // filterCourse: number;
  // filterSection: number;
  lectures :any;
  courses: CourseModel[];
  newSections:SectionModel[]=[];
  sections: SectionModel[];
  sectionRequestModel:SectionRequestModel=new SectionRequestModel();
  attendanceReportRequest :AttendanceReportRequestModel=new AttendanceReportRequestModel();
  @ViewChild('courseSelect', {static: true})  courseSelect: MatSelect;
  @ViewChild('sectionSelect', {static: true})  sectionSelect: MatSelect;

  constructor(private lectureReportService : AttendaneReportByLectureService,
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
            this.lectureReportService.getlectureReport(this.sectionSelect.value).subscribe(Response=>
              {
                console.log(Response);
              })
          }
          this.attendanceFilterReport.filterSection=value;
          this.lectureReportService.attendanceReportByLectureFilterEvent.next(this.attendanceReportRequest)
        })
      }
     
    
  
  applyFilter(): void {
    this.lectureReportService.attendanceReportByLectureFilterEvent.next(this.attendanceFilterReport);
  }

  resetFilter(): void {
    this.lectureReportService.attendanceReportByLectureFilterEvent.next(this.attendanceFilterReport);
  }


}
