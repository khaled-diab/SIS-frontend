import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AttendanceReportByLectureManagementModel } from 'src/app/shared/model/attendanceReportByLecture-management/attendance-report-by-lecture-management-model';
import { AttendanceReportRequestModel } from 'src/app/shared/model/attendanceReportByLecture-management/attendance-report-request-model';
import { LectureModel } from 'src/app/shared/model/student-attendance/lecture-model';
import { AttendaneReportByLectureService } from '../../service/attendane-report-by-lecture.service';

@Component({
  selector: 'app-attendane-report-by-lecture',
  templateUrl: './attendane-report-by-lecture.component.html',
  styleUrls: ['./attendane-report-by-lecture.component.css']
})
export class AttendaneReportByLectureComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  tableData: any;
  attendanceReportRequest: AttendanceReportRequestModel = new AttendanceReportRequestModel();
  displayedColumns = ['lectureDate', 'lectureStartTime', 'lectureEndTime', 'attendancenumber'
  , 'absentNumber', 'rate', 'Actions'];
  LectureNumber = 0;
  totalLectures = 0;
  totalRate = 0;
  attendanceRate: number;
  pageIndex = 1;
  defaultPageSize = 10;
  subscriptionsList: Subscription[] = [];
  attendanceReportByLecture = new AttendanceReportByLectureManagementModel();
  attendanceReport: AttendanceReportByLectureManagementModel[];
  subscription: Subscription;
  searchValue: string;
  filterValue: null;


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
  constructor(private lectureReportService: AttendaneReportByLectureService,
              private breakpointObserver: BreakpointObserver,
              private router: Router,
              public dialog: MatDialog) { }
  ngOnInit(): void {
    // this.dataSource = new MatTableDataSource<any>();
    // this.subscriptions();
  }
  ngAfterViewInit(): void{
    this.dataSource = new MatTableDataSource<AttendanceReportByLectureManagementModel>();
    this.subscriptions();
  }
  private subscriptions(): Subscription[] {
    this.subscriptionsList.push(this.filterEventSubscription());
    return this.subscriptionsList;
  }
  private filterEventSubscription(): Subscription {
    return this.lectureReportService.attendanceReportByLectureFilterEvent
    .subscribe(value => {
      this.attendanceReportRequest = value;
      this.lectureReportService
        .getlectureReport(this.attendanceReportRequest.filterSection)
        .subscribe(filteredData => {
          this.tableData = filteredData;
          console.log(filteredData);
          this.dataSource.data = this.tableData;
          this.lectureReportService.getlectureReport(this.attendanceReportRequest.filterSection)
          .subscribe(
            value => {for (let i = 0; i < value.length; i++) {
              this.LectureNumber = i + 1;

            }});
          this.lectureReportService.getlectureReport(this.attendanceReportRequest.filterSection)
          .subscribe(value => {
            for (let i = 0; i < value.length; i++) {
          this.totalRate += value[i].rate;
          console.log('total Rate' + this.totalRate);

            }
          });
          this.lectureReportService.getsection(this.attendanceReportRequest.filterSection)
          .subscribe(Response => {

            this.totalLectures = Response.exercisesLectures + Response.theoreticalLectures
            + Response.practicalLectures;

            this.attendanceRate = Math.floor((this.totalRate / this.totalLectures) * 100);

          });

        });
    });
  }

  details(lecture: LectureModel): void
  {
this.router.navigateByUrl('/attendancereportsbylecture-management/attendane-details-by-lecture/'+lecture.id);
// this.attendanceReportRequest.lectureId = lecture.id;

// this.lectureReportService.attendanceDetailsByLectureFilterEvent.next(this.attendanceReportRequest);
  }



}


