import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AttendaneReportByLectureService } from 'src/app/attendance-by-lecture-management/service/attendane-report-by-lecture.service';
import { AttendanceReportByStudentManagementModel } from 'src/app/shared/model/attendanceReportByStudent-management/attendance-report-by-Student-management-model';
import { AttendanceStudentReportRequestModel } from 'src/app/shared/model/attendanceReportByStudent-management/attendance-Studentreport-request-model';
import { AttendaneReportByStudentService } from '../../service/attendane-report-by-student.service';

@Component({
  selector: 'app-attendane-report-by-student',
  templateUrl: './attendane-report-by-student.component.html',
  styleUrls: ['./attendane-report-by-student.component.css']
})
export class AttendaneReportByStudentComponent implements OnInit {
  dataSource: MatTableDataSource<AttendanceReportByStudentManagementModel>;
  tableData: AttendanceReportByStudentManagementModel[];
  attendanceStudentReportRequest :AttendanceStudentReportRequestModel=new AttendanceStudentReportRequestModel();
  displayedColumns = ['nameOfStudent', 'absentLecture','statues', 'Actions'];
  pageIndex = 1;
  defaultPageSize = 10;
  subscriptionsList: Subscription[] = [];
  attendanceReportBystudent = new AttendanceReportByStudentManagementModel();
  attendanceReport : AttendanceReportByStudentManagementModel[];
  subscription: Subscription;
  searchValue: string;
  filterValue: null;
  sectionId:string|null;
  student: AttendanceReportByStudentManagementModel;
  

  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = value;
    }
  }

  @ViewChild(MatSort, {static: false})
  set sort(value: MatSort) {
    if (this.dataSource) {
      this.dataSource.sort = value;
    }
  }
  constructor(private lectureReportService : AttendaneReportByLectureService,
    private studentReportService : AttendaneReportByStudentService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    public dialog: MatDialog) { }
  ngOnInit(): void {
    // this.dataSource = new MatTableDataSource<any>();
    // this.subscriptions();
  }
  ngAfterViewInit():void{
    this.dataSource=new MatTableDataSource<AttendanceReportByStudentManagementModel>();
    this.subscriptions();
  }
  private subscriptions(): Subscription[] {
    this.subscriptionsList.push(this.filterEventSubscription());
   return this.subscriptionsList;
  }
  private filterEventSubscription(): Subscription {
    return this.studentReportService.attendanceReportByStudentFilterEvent
    .subscribe(value => {
      this.attendanceStudentReportRequest = value;
      this.sectionId=String(this.attendanceStudentReportRequest.filterSection) ;

      this.studentReportService
        .getStudentReport(this.attendanceStudentReportRequest.filterSection)
        .subscribe(filteredData => {
          this.tableData = filteredData;
          console.log(filteredData);
          this.dataSource.data=this.tableData;
   
        });
    });
  }
  
  details(student : AttendanceReportByStudentManagementModel):void
  {
this.router.navigateByUrl(`/attendancereportsbystudent-management/attendane-details-by-student/${this.sectionId}/${student.idOfStudent}`)
console.log(this.sectionId)
// this.router.navigateByUrl(`/attendancereportsbystudent-management/attendane-details-by-student/
// ${1}/${1}`)

  }

}
