import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AttendaneReportByLectureService } from 'src/app/attendance-by-lecture-management/service/attendane-report-by-lecture.service';
import { AttendanceReportByStudentManagementModel } from 'src/app/shared/model/attendanceReportByStudent-management/attendance-report-by-Student-management-model';
import { AttendanceReportDetailsByStudent } from 'src/app/shared/model/attendanceReportByStudent-management/attendance-report-details-by-student';
import { AttendanceStudentReportRequestModel } from 'src/app/shared/model/attendanceReportByStudent-management/attendance-Studentreport-request-model';
import { AttendaneReportByStudentService } from '../../service/attendane-report-by-student.service';
import { EditStatuesComponent } from '../edit-statues/edit-statues.component';

@Component({
  selector: 'app-attendane-details-by-student',
  templateUrl: './attendane-details-by-student.component.html',
  styleUrls: ['./attendane-details-by-student.component.css']
})
export class AttendaneDetailsByStudentComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  tableData: any;
  attendancceReportRequest :AttendanceStudentReportRequestModel=new AttendanceStudentReportRequestModel();
  displayedColumns = ['attendanceDate', 'lectureStartTime','lectureEndTime','attendanceStatus', 'Actions'];
  pageIndex = 1;
  defaultPageSize = 10;
  date:string;
  studentUserId:string|null;
  sectionUserId:string|null;

  isSmallScreen : boolean;
  subscriptionsList: Subscription[] = [];
  attendanceReportByStudent = new AttendanceReportByStudentManagementModel();
  attendanceReport : AttendanceReportByStudentManagementModel[];
  attendaceReportModdel=new AttendanceReportDetailsByStudent();
  subscription:Subscription;
  attendanceDetails:AttendanceReportDetailsByStudent;
  data: AttendanceReportByStudentManagementModel;
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
    private studentReportService : AttendaneReportByStudentService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    private changeDetectorRef:ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver,
    private activatedRoute: ActivatedRoute    ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>();
    this.Subscription();
    
}

private Subscription():Subscription[]{
  this.subscriptionsList.push(this.filterEventSubscription());
  // this.subscriptionsList.push(this.initialDataSubscription());
  return this.subscriptionsList;
}
private filterEventSubscription(){
  this.sectionUserId=this.activatedRoute.snapshot.params['sectionId'];
  this.studentUserId=this.activatedRoute.snapshot.params['studentId'];
console.log(this.sectionUserId);
console.log(this.studentUserId);

   return this.studentReportService.getStudentReportDetails(this.sectionUserId,this.studentUserId)
  .subscribe(Report=>
    {
      this.tableData=Report;
      this.dataSource.data=this.tableData;
      console.log(this.dataSource.data);
    }) 

}


// private initialDataSubscription(){
//   return this.studentReportService.getStudentReportDetails(31,1).subscribe(Report=>
//     {
//       this.tableData=Report
//       this.dataSource.data=this.tableData;
//       console.log(this.tableData)   
    
//     })
// }
edit(details : AttendanceReportDetailsByStudent){
  if (this.isSmallScreen) {
    this.router.navigateByUrl('/attendancereportsbystudent-management/edit-status', {state: details}).then(_ => console.log());
  } else {
    this.dialog.open(EditStatuesComponent, {data: details});
    this.lectureReportService.closeSaveEvent.subscribe(e => {
      this.dialog.closeAll();
      if (e !== 'Cancel') {
        this.snackBar.open('Attendance Statues Edited Successfully', undefined, {duration: 4000, panelClass: 'successSnackBar'});
        console.log('here');
        //  this.filterEventSubscription();
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


}
