import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Time } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { EditStatuesComponent } from 'src/app/attendance-by-lecture-management/components/edit-statues/edit-statues.component';
import { AttendanceReportByLectureManagementModel } from 'src/app/shared/model/attendanceReportByLecture-management/attendance-report-by-lecture-management-model';
import { AttendanceReportRequestModel } from 'src/app/shared/model/attendanceReportByLecture-management/attendance-report-request-model';
import { AttendanceDetailsModel } from 'src/app/shared/model/student-attendance/attendanceDetails-model';
import { StudentModel } from 'src/app/shared/model/student-management/student-model';
import { AttendaneReportByLectureService } from '../../service/attendane-report-by-lecture.service';

@Component({
  selector: 'app-attendane-details-by-lecture',
  templateUrl: './attendane-details-by-lecture.component.html',
  styleUrls: ['./attendane-details-by-lecture.component.css']
})
export class AttendaneDetailsByLectureComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  tableData: any;
  attendancceReportRequest :AttendanceReportRequestModel=new AttendanceReportRequestModel();
  displayedColumns = ['universityId', 'nameAr','attendanceStatus', 'Actions'];
  pageIndex = 1;
  defaultPageSize = 10;
  lectureId=0;
  coursename='';
  date:string;
  from:Time;
  to:Time;
//  colors = [{ attendanceStatus: "absent", color: "red" }, { attendanceStatus: "present", color: "green" }]
  isSmallScreen : boolean;
  subscriptionsList: Subscription[] = [];
  attendanceReportByLecture = new AttendanceReportByLectureManagementModel();
  attendanceReport : AttendanceReportByLectureManagementModel[];
  attendaceReportModdel=new AttendanceDetailsModel();
  subscription:Subscription;
  attendanceDetails:AttendanceDetailsModel;
  data: AttendanceReportByLectureManagementModel;
  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = value;
    }
  }
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  @ViewChild(MatSort, {static: false})
  set sort(value: MatSort) {
    if (this.dataSource) {
      this.dataSource.sort = value;
    }
  }
  constructor(private lectureReportService : AttendaneReportByLectureService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    private changeDetectorRef:ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver,
    ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>();
    this.Subscription();
    
}

private Subscription():Subscription[]{
  this.subscriptionsList.push(this.filterEventSubscription());
  this.subscriptionsList.push(this.initialDataSubscription());
  return this.subscriptionsList;
}
private filterEventSubscription(){
  return this.lectureReportService.attendanceDetailsByLectureFilterEvent.subscribe(
    value=>{this.attendancceReportRequest=value;
      this.lectureId=value;
      console.log(this.attendancceReportRequest.lectureId);
  this.lectureReportService.getStudentAttendanceReport(this.attendancceReportRequest.lectureId)
  .subscribe(Report=>
    {
      this.tableData=Report;
      this.dataSource.data=this.tableData;
      console.log(this.dataSource.data);
    }) 
  }
  );
}


private initialDataSubscription(){
  return this.lectureReportService.getStudentAttendanceReport(1).subscribe(Report=>
    {
      this.tableData=Report
      this.dataSource.data=this.tableData;
      console.log(this.tableData)   
      this.to=Report[0].lectureEndTime;
      this.from=Report[0].lectureStartTime;
      this.date=Report[0].lectureDTO.lectureDate;
      this.coursename=Report[0].lectureDTO.courseDTO.nameEn;
    })
}
edit(details : AttendanceDetailsModel){
  if (this.isSmallScreen) {
    this.router.navigateByUrl('/attendancereportsbylecture-management/edit-status', {state: details}).then(_ => console.log());
  } else {
    this.dialog.open(EditStatuesComponent, {data: details});
    this.lectureReportService.closeSaveEvent.subscribe(e => {
      this.dialog.closeAll();
      if (e !== 'Cancel') {
        this.snackBar.open('Attendance Statues Edited Successfully', undefined, {duration: 4000, panelClass: 'successSnackBar'});
        console.log('here');
         this.filterEventSubscription();
      }
      },
     error => {
      this.snackBar.open('Attendance Statues Editing Failed', undefined, {duration: 4000, panelClass: 'failedSnackBar'});
    });
  }
}

ngOnDestroy(): void {
// this.lectureReportService.attendanceDetailsByLectureFilterEvent.unsubscribe();
}
// openDialog(action:any,obj: { action: any; }) {
//   obj.action = action;
//   const dialogRef = this.dialog.open(EditStatuesComponent, {
//     width: '250px',
//     data:obj
//   });

//   dialogRef.afterClosed().subscribe(result => {
  
//    if(result.event == 'Update'){
//       this.updateRowData(result.data);
//     }
//   });
// }


// updateRowData(row_obj :AttendanceDetailsModel){
//   // this.dataSource.filterPredicate = function customFilter(data , filter : string): boolean{
//   //   return (data.attendanceStatus.startsWith(filter));
// // }
// this.lectureReportService.editattendanceStatues(row_obj.id).subscribe(value=>{
//   console.log(value)
// })
//   }
// getTheColor(statues:string) {
//   return this.colors.filter(item => item.attendanceStatus ===statues)[0].color 
// }
}
