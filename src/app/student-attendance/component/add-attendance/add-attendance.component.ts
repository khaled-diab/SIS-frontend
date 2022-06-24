import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {StudentAttendanceService} from '../../service/student-attendance.service';
import {CourseModel} from '../../../shared/model/course-management/course-model';
import {TimetableModel} from '../../../shared/model/timetable-model';
import {MatSelect} from '@angular/material/select';
import { formatDate} from '@angular/common';
import {SectionModel} from '../../../shared/model/section-model';
import {LectureModel} from '../../../shared/model/student-attendance/lecture-model';
import {FacultyMemberModel} from '../../../shared/model/facultyMember-management/facultyMember-model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AttendanceCodeComponent} from '../attendance-code/attendance-code.component';
import {Subscription} from 'rxjs';
import {AttendanceCounter} from '../../../shared/model/student-attendance/attendanceCounter';
import {MatInput} from '@angular/material/input';
import {Constants} from '../../../shared/constants';

@Component({
  selector: 'app-add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.css']
})

export class AddAttendanceComponent implements OnInit, AfterViewInit , OnDestroy{

  constructor(private studentAttendanceService: StudentAttendanceService,  private dialog: MatDialog) {

  }

  colleges: number[];
  selectedCourse: CourseModel;
  timetables: TimetableModel[];
  timetable = new TimetableModel();
  sections: SectionModel[];
   timeDisabled = false;
  isLectureDateChanged = false;
  islectureTimeChanged = false;
  isRegTypeChanged = false;
  isSectionsChanged = false;
  lecture = new LectureModel();
  fc = new FacultyMemberModel();
  minCountDown = 30;
  countDown: string;
    counter: number;
  @ViewChild('coursesMenu') coursesMenu: MatSelect;
  @ViewChild('timeMenu') timeMenu: MatSelect;
  @ViewChild('regTypeMenu') regTypeMenu: MatSelect;
  @ViewChild('regTime') regTime: MatInput;
  @ViewChild('lectureDate') lectureDate: MatInput;

  cancelAttendanceCodeEventSubscription: Subscription;


  ngOnInit(): void {
    this.fc.id = 1;
    this.lecture.facultyMemberDTO = this.fc;
    this.studentAttendanceService.getFacultyMemberSections(1).subscribe(value => {
      this.sections = value;
    });
    this.cancelAttendanceCodeEventSubscription = this.studentAttendanceService.cancelAttendanceCodeDialogEvent.subscribe(value => {
        {
          console.log(this.lecture);
          this.dialog.closeAll();
          this.lecture.attendanceStatus = false;
          this.studentAttendanceService.getAttendancesEvent.next(this.lecture);
          this.studentAttendanceService.disableLecture(this.lecture).subscribe();

        }
    });
  }

  ngAfterViewInit(): void {

    this.regTime.value  = this.minCountDown.toString(this.minCountDown);
    this.counter = this.minCountDown;
    this.lecture.facultyMemberDTO = this.fc;
    this.coursesMenu.valueChange.subscribe(value => {
      this.lecture.id = 0;
      this.isSectionsChanged = true;
      this.timeMenu.value = undefined;
      this.lecture.courseDTO = value.courseDTO;
      this.lecture.sectionDTO = value;

      this.studentAttendanceService.getSectionTimetables(value.id).subscribe(timeTable => {
        this.timetables = timeTable;

      });
    });

    this.timeMenu.valueChange.subscribe(value => {
      this.lecture.id = 0;
      this.islectureTimeChanged = true;
      this.lecture.lectureDay = value.day;
      this.lecture.lectureStartTime = value.startTime;
      this.lecture.lectureEndTime = value.endTime;

    });

    this.regTypeMenu.valueChange.subscribe(value => {
      this.isRegTypeChanged = true;
      this.timeDisabled = (value === 'Manual');
      if (value === 'Automatic'){
        this.countDown = '30';
      }
      this.lecture.attendanceType = value;
    });

  }

  save(): void{

    if (this.lecture.attendanceType !== 'Manual'){
      this.lecture.attendanceStatus = true;
    }
    this.studentAttendanceService.addLecture(this.lecture).subscribe(value => {
       const today = formatDate(value.lectureDate, 'yyyy-MM-dd', 'en-US');
       value.lectureDate = today;
       this.lecture = value;
       if (this.lecture.attendanceType === 'Manual'){
         this.studentAttendanceService.saveLectureEvent.next(this.lecture);
      }else{
        // console.log('auto');
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '40%';
        dialogConfig.height = '300px';
        const data = new AttendanceCounter();
        data.attendanceCode = this.lecture.attendanceCode;
        data.counter = this.counter;
        dialogConfig.data = data;
        this.dialog.open(AttendanceCodeComponent, dialogConfig);
      }
    });
  }

  ngOnDestroy(): void {
      this.cancelAttendanceCodeEventSubscription.unsubscribe();
  }

  attendanceTimeChange(event: any): void{
    if (event.target.value < 30){
      this.counter = 30;
      event.target.value = 30;
    }
    this.counter = event.target.value;
  }
  changeDate(val: any): void{
    if (this.lecture.id === 0) {
      this.isLectureDateChanged = true;
      this.lecture.lectureDate = val;
    }else{
      this.lecture.id = 0;
      this.isLectureDateChanged = true;
      this.lecture.lectureDate = val;
    }
  }

}
