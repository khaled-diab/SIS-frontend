import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AttendaneReportByLectureService } from 'src/app/attendance-by-lecture-management/service/attendane-report-by-lecture.service';
import { AttendanceReportDetailsByStudent } from 'src/app/shared/model/attendanceReportByStudent-management/attendance-report-details-by-student';
import { AttendaneReportByStudentService } from '../../service/attendane-report-by-student.service';

@Component({
  selector: 'app-edit-statues',
  templateUrl: './edit-statues.component.html',
  styleUrls: ['./edit-statues.component.css']
})
export class EditStatuesComponent implements OnInit {
 
  action:string;
  local_data:any;
  @ViewChild('regTypeMenu') regTypeMenu: MatSelect;

  attendanceReport : AttendanceReportDetailsByStudent;
  attendaceReportModdel: AttendanceReportDetailsByStudent;
  attendanceDetailsModels:AttendanceReportDetailsByStudent[];
  readOnly: boolean;
  form: FormGroup;
  AttendanceId=0;
  errorMessage: string;
  statues='';
  constructor(@Inject(MAT_DIALOG_DATA) public data: AttendanceReportDetailsByStudent,
    private studentReportService: AttendaneReportByStudentService,
    private lectureReportService:AttendaneReportByLectureService,
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.attendaceReportModdel = new AttendanceReportDetailsByStudent();
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
      this.studentReportService.editattendanceStatues(this.data.id,this.data).subscribe((Response) => {
        console.log(Response);
        this.snackBar.open('Attendace Statues Edited Successfully', undefined, {duration: 2000, panelClass: 'successSnackBar'});
        this.studentReportService.closeSaveEvent.next();
        
      }, error => {
        const formControl = this.form.get(error.error.field);
        this.errorMessage = error.error.message;
        if (formControl) {
          formControl.setErrors({
            serverError: true
          });
        }
        this.snackBar.open('Attendace Statues Edited Successfully', undefined, {duration: 2000, panelClass: 'successSnackBar'});
        this.studentReportService.closeSaveEvent.next();

      }
    );
  }
// save(): void {
//   console.log('attendance model ', this.attendaceReportModdel);
//   this.studentReportService.editattendanceStatues(this.data.id,this.data).subscribe(value => {
    
//     this.lectureReportService.closeSaveEvent.next();
//   });
// }
cancel(): void {
  this.lectureReportService.closeSaveEvent.next('Cancel');

}

private fetchDataFromRouter(data: any): void {
  if (data.id === undefined) {
    this.attendaceReportModdel = new AttendanceReportDetailsByStudent();
  } else {
    this.attendaceReportModdel = {...history.state};
  }
}


}
