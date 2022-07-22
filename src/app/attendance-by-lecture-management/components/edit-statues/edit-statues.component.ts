import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, NgModule, OnInit, Optional, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSelect} from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AttendanceReportByLectureManagementModel } from 'src/app/shared/model/attendanceReportByLecture-management/attendance-report-by-lecture-management-model';
import { AttendanceDetailsModel } from 'src/app/shared/model/student-attendance/attendanceDetails-model';
import { StudentAttendanceListComponent } from 'src/app/student-attendance/component/student-attendance-list/student-attendance-list.component';
import { AttendanceByLectureManagementModule } from '../../attendance-by-lecture-management.module';
import { AttendaneReportByLectureService } from '../../service/attendane-report-by-lecture.service';
@Component({
  selector: 'app-edit-statues',
  templateUrl: './edit-statues.component.html',
  styleUrls: ['./edit-statues.component.css']
})

export class EditStatuesComponent implements OnInit {
  action:string;
  local_data:any;
  @ViewChild('regTypeMenu') regTypeMenu: MatSelect;

  attendanceReport : AttendanceDetailsModel;
  attendaceReportModdel: AttendanceDetailsModel;
  attendanceDetailsModels:AttendanceDetailsModel[];
  readOnly: boolean;
  form: FormGroup;
  AttendanceId=0;
  errorMessage: string;
  statues='';
  constructor(@Inject(MAT_DIALOG_DATA) public data: AttendanceDetailsModel,
    private lectureReportService: AttendaneReportByLectureService,
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar,
    private route: Router) { }

  ngOnInit(): void {
    this.attendaceReportModdel = new AttendanceDetailsModel();
    this.form = new FormGroup({
        attendanceStatus: new FormControl(undefined, Validators.required),
      }
    );
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe(value => {
      if (value.matches) {
        this.fetchDataFromRouter(history.state);
        console.log('here 1');
      } else {
        console.log('here 2');
        this.attendaceReportModdel = {...this.data};
       
      this.AttendanceId=this.attendaceReportModdel.id;
      
      }
    });
  
    }
   add(): void {
    if (this.form.valid) {
      
      // this.attendaceReportModdel.attendanceStatus = this.form.get('attendanceStatus')?.value;
      this.statues=this.form.get('attendanceStatus')?.value;
      this.data.attendanceStatus=this.statues;
    }
    this.lectureReportService.editattendanceStatues(this.data).subscribe((Response) => {
      console.log(Response);
      this.snackBar.open('Attendace Statues Edited Successfully', undefined, {duration: 2000, panelClass: 'successSnackBar'});
      // this.route.navigate(['/attendancereportsbylecture-management', 'attendane-details-by-lecture']);
      this.lectureReportService.closeSaveEvent.next();
    }, error => {
      const formControl = this.form.get(error.error.field);
      this.errorMessage = error.error.message;
      if (formControl) {
        formControl.setErrors({
          serverError: true
        });
      }
      this.snackBar.open('Failed Editing Attendance Statues', undefined, {duration: 2000});
    }
  );
}
// save(): void {
//   console.log('attendance model ', this.attendaceReportModdel);
//   this.lectureReportService.editattendanceStatues(this.data).subscribe(value => {
    
//     this.lectureReportService.closeSaveEvent.next();
//   });
// }
cancel(): void {
  this.lectureReportService.closeSaveEvent.next('Cancel');

}

private fetchDataFromRouter(data: any): void {
  if (data.id === undefined) {
    this.attendaceReportModdel = new AttendanceDetailsModel();
  } else {
    this.attendaceReportModdel = {...history.state};
  }
}

}
