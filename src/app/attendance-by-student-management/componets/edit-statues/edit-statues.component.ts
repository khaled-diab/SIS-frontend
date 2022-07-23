import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSelect} from '@angular/material/select';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AttendaneReportByLectureService} from 'src/app/attendance-by-lecture-management/service/attendane-report-by-lecture.service';
import {
   AttendanceReportDetailsByStudent
} from 'src/app/shared/model/attendanceReportByStudent-management/attendance-report-details-by-student';
import {AttendaneReportByStudentService} from '../../service/attendane-report-by-student.service';

@Component({
   selector: 'app-edit-statues',
   templateUrl: './edit-statues.component.html',
   styleUrls: ['./edit-statues.component.css']
})
export class EditStatuesComponent implements OnInit {

   action: string;
   localData: any;
   @ViewChild('regTypeMenu') regTypeMenu: MatSelect;

   attendanceReport: AttendanceReportDetailsByStudent;
   attendanceReportModel: AttendanceReportDetailsByStudent;
   attendanceDetailsModels: AttendanceReportDetailsByStudent[];
   readOnly: boolean;
   form: FormGroup;
   AttendanceId = 0;
   errorMessage: string;
   status = '';

   constructor(@Inject(MAT_DIALOG_DATA) public data: AttendanceReportDetailsByStudent,
               private studentReportService: AttendaneReportByStudentService,
               private lectureReportService: AttendaneReportByLectureService,
               private breakpointObserver: BreakpointObserver,
               private snackBar: MatSnackBar,
   ) {
   }

   ngOnInit(): void {
      this.attendanceReportModel = new AttendanceReportDetailsByStudent();
      this.form = new FormGroup({
            attendanceStatus: new FormControl(this.status, Validators.required),
         }
      );
      this.breakpointObserver.observe(Breakpoints.Handset).subscribe(value => {
         if (value.matches) {
            this.fetchDataFromRouter(history.state);
            console.log('here 1');
         } else {
            console.log('here 2');
            this.attendanceReportModel = {...this.data};
            this.AttendanceId = this.attendanceReportModel.id;
            this.form.get('attendanceStatus')?.setValue(this.attendanceReportModel.attendanceStatus);
         }
      });

   }

   add(): void {
      if (this.form.valid) {
         // this.attendaceReportModdel.attendanceStatus = this.form.get('attendanceStatus')?.value;
         this.status = this.form.get('attendanceStatus')?.value;
         this.data.attendanceStatus = this.status;
      }
      this.studentReportService.editattendanceStatues(this.data.id, this.data).subscribe((Response) => {
            console.log(Response);
            this.snackBar.open('Attendance Status Edited Successfully', undefined, {duration: 2000, panelClass: 'successSnackBar'});
            this.studentReportService.closeSaveEvent.next();
         }, error => {
            const formControl = this.form.get(error.error.field);
            this.errorMessage = error.error.message;
            if (formControl) {
               formControl.setErrors({
                  serverError: true
               });
            }
            this.snackBar.open('Attendance Status Edited Successfully', undefined, {duration: 2000, panelClass: 'successSnackBar'});
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
   cancel() {
      console.log('cancelllll');
      this.studentReportService.closeSaveEvent.next('Cancel');
   }

   private fetchDataFromRouter(data: any): void {
      if (data.id === undefined) {
         this.attendanceReportModel = new AttendanceReportDetailsByStudent();
      } else {
         this.attendanceReportModel = {...history.state};
      }
   }


}
