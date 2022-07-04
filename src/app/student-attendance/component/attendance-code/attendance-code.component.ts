import {Component, HostListener, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {StudentAttendanceService} from '../../service/student-attendance.service';
import {AttendanceCounter} from '../../../shared/model/student-attendance/attendanceCounter';

@Component({
   selector: 'app-attendance-code',
   templateUrl: './attendance-code.component.html',
   styleUrls: ['./attendance-code.component.css']
})
export class AttendanceCodeComponent implements OnInit {


   attendanceCode: string;
   counter: number;
   interval: any;
   constructor(@Inject(MAT_DIALOG_DATA) public data: AttendanceCounter, private studentAttendanceService: StudentAttendanceService, ) {}


   startTimer(): void{
      this.interval = setInterval(() => {
         if (this.data.counter > 0) {
            this.data.counter--;
         } else {
            clearInterval(this.interval);
            this.studentAttendanceService.cancelAttendanceCodeDialogEvent.next();

            // return;
         }
      }, 1000);
   }

   pauseTimer(): void{
      clearInterval(this.interval);
   }

   ngOnInit(): void {
      this.attendanceCode = JSON.stringify(this.data.attendanceCode);

      this.startTimer();
   }

   cancel(): void{
      clearInterval(this.interval);
      this.studentAttendanceService.cancelAttendanceCodeDialogEvent.next();
   }

}
