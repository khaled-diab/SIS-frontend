import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {DepartmentModel} from '../../../shared/model/department-management/department-model';
import {AcademicYear} from '../../../shared/model/academicYear-Management/academic-year';
import {AcademicTermModel} from '../../../shared/model/academicTerm-management/academic-term-model';
import {MajorModel} from '../../../shared/model/major-model';
import {StudyTypeModel} from '../../../shared/model/studyType-model';
import {CourseModel} from '../../../shared/model/course-management/course-model';
import {MatSelect} from '@angular/material/select';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {CollegeManagementService} from '../../../college-management/service/college-management.service';
import {DepartmentService} from '../../../department-management/service/department.service';
import {AcademicYearService} from '../../../academic-year-management/service/academic-year.service';
import {AcademicTermService} from '../../../academic-term-management/service/academic-term.service';
import {CourseManagementService} from '../../../course-management/service/course-management.service';
import {SectionModel} from '../../../shared/model/section-management/section-model';
import {SectionManagementService} from '../../service/sectionManagement.service';
import {Constants} from '../../../shared/constants';
import {
   StudentEnrollmentManagementService
} from '../../../studentEnrollment-management/service/studentEnrollment-management.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {TimetableModel} from '../../../shared/model/timetable-management/timetable-model';
import {
   EditSectionTimetableComponent
} from '../../../timetable-management/component/section-timetable-edit/edit-section-timetable.component';
import {take} from 'rxjs/operators';
import {
   DeleteTimetableComponent
} from '../../../timetable-management/component/timetable-delete/delete-timetable.component';
import {TimetableManagementService} from '../../../timetable-management/service/timetable-management.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {MatTableDataSource} from '@angular/material/table';
import {TimetableRequestModel} from '../../../shared/model/timetable-management/timetable-request-model';
import {SelectionModel} from '@angular/cdk/collections';
import {AddTimetableComponent} from '../../../timetable-management/component/timetable-add/add-timetable.component';

@Component({
   selector: 'app-section-edit',
   templateUrl: './edit-section.component.html',
   styleUrls: ['./edit-section.component.css']
})
export class EditSectionComponent implements OnInit, OnDestroy {

   section = new SectionModel();
   colleges: CollegeModel[];
   college = new CollegeModel();
   departments: DepartmentModel[];
   department = new DepartmentModel();
   academicYears: AcademicYear[];
   academicYear = new AcademicYear();
   academicTerms: AcademicTermModel[];
   academicTerm = new AcademicTermModel();
   courses: CourseModel[];
   course = new CourseModel();
   major = new MajorModel();
   majors: MajorModel[];
   studyType = new StudyTypeModel();
   studyTypes: StudyTypeModel[];
   sectionNumber: string;
   theoreticalLectures: number;
   exercisesLectures: number;
   practicalLectures: number;
   capacity: number;
   times: TimetableModel [] = [];
   deletedTimes: number [] = [];
   timetableRequestModel: TimetableRequestModel = new TimetableRequestModel();
   selection = new SelectionModel<TimetableModel>(true, []);
   errorMessage: string;
   form: FormGroup;

   @ViewChild('collegeSelect', {static: true}) collegeSelect: MatSelect;
   @ViewChild('departmentSelect', {static: true}) departmentSelect: MatSelect;
   @ViewChild('academicYearSelect', {static: true}) academicYearSelect: MatSelect;
   @ViewChild('academicTermSelect', {static: true}) academicTermSelect: MatSelect;
   @ViewChild('majorSelect', {static: true}) majorSelect: MatSelect;
   @ViewChild('studyTypeSelect', {static: true}) studyTypeSelect: MatSelect;
   @ViewChild('courseSelect', {static: true}) courseSelect: MatSelect;

   constructor(private sectionManagementService: SectionManagementService,
               private dialog: MatDialog,
               private snackBar: MatSnackBar,
               private modalService: BsModalService,
               private route: Router,
               private collegeManagementService: CollegeManagementService,
               private departmentService: DepartmentService,
               private academicYearService: AcademicYearService,
               private academicTermService: AcademicTermService,
               private studentEnrollmentManagementService: StudentEnrollmentManagementService,
               private courseService: CourseManagementService,
               private timetableService: TimetableManagementService) {
   }

   displayedColumns = ['No.', 'facultyMemberId', 'lectureTypeId', 'day',
      'startTime', 'endTime', 'buildingId', 'classroomId', 'Actions'];
   dataSource = new MatTableDataSource<TimetableModel>(this.selection.selected);

   ngOnInit(): void {
      this.dataSource = new MatTableDataSource<TimetableModel>();
      // @ts-ignore
      this.section = JSON.parse(sessionStorage.getItem('sectionData'));
      console.log(this.section);
      this.form = new FormGroup({
            academicYearMenu: new FormControl(this.section.academicYearDTO.id, Validators.required),
            academicTermMenu: new FormControl(this.section.academicTermDTO.id, Validators.required),
            collegeMenu: new FormControl(this.section.collegeDTO.id, Validators.required),
            departmentMenu: new FormControl(this.section.departmentDTO.id, Validators.required),
            majorMenu: new FormControl(this.section.majorDTO.id),
            studyTypeMenu: new FormControl(this.section.studyTypeDTO.id, Validators.required),
            courseMenu: new FormControl(this.section.courseDTO.id, Validators.required),
            sectionNumber: new FormControl(this.section.sectionNumber, Validators.compose([Validators.required,
               Validators.pattern(Constants.ENGLISH_CHARACTERS_AND_DIGITS_AND_DASH)])),
            theoreticalLectures: new FormControl(this.section.theoreticalLectures, Validators.pattern(Constants.DIGITS_ONLY)),
            exercisesLectures: new FormControl(this.section.exercisesLectures, Validators.pattern(Constants.DIGITS_ONLY)),
            practicalLectures: new FormControl(this.section.practicalLectures, Validators.pattern(Constants.DIGITS_ONLY)),
            capacity: new FormControl(this.section.capacity, Validators.compose([Validators.required, Validators.pattern(Constants.DIGITS_ONLY)]))
         }
      );

      this.academicYear = this.section.academicYearDTO;
      this.academicTerm = this.section.academicTermDTO;
      this.college = this.section.collegeDTO;
      this.department = this.section.departmentDTO;
      this.major = this.section.majorDTO;
      this.studyType = this.section.studyTypeDTO;
      this.course = this.section.courseDTO;
      this.sectionNumber = this.section.sectionNumber;
      this.theoreticalLectures = this.section.theoreticalLectures;
      this.exercisesLectures = this.section.exercisesLectures;
      this.practicalLectures = this.section.practicalLectures;
      this.capacity = this.section.capacity;


      this.academicYears = AcademicYearService.yearsList;
      this.academicTerms = this.academicTermService.getAcademicTermsByAcademicYears(this.academicYear.id);

      this.collegeManagementService.getAllColleges().subscribe(Response => {
         this.colleges = Response;
      });
      this.departments = this.departmentService.getDepartmentsByCollege(this.college.id);
      this.studentEnrollmentManagementService.getMajorsByDepartment(this.department.id).subscribe(value => {
         this.majors = value;
      });
      this.courseService.getCoursesByDepartment(this.department.id).subscribe(value => {
         this.courses = value;
      });

      this.studentEnrollmentManagementService.getAllStudyTypes().subscribe(Response => {
         this.studyTypes = Response;
      });

      this.timetableRequestModel.filterSection = this.section.id;
      this.timetableService.searchTimetables(0, 100, this.timetableRequestModel).subscribe(value => {
         console.log(value.data);
         for (const timetable of value.data) {
            this.times.push(timetable);
            this.selection.select(timetable);
            console.log(this.times);
         }
         console.log(this.selection.selected);
      });

   }

   ngAfterViewInit(): void {
      this.academicYearSelect.valueChange.subscribe(value => {
         this.form.get('academicTermMenu')?.setValue(null);
         if (this.academicYearSelect.value !== undefined) {
            this.academicTermSelect.setDisabledState(false);
            this.academicTerms = this.academicTermService.getAcademicTermsByAcademicYears(this.academicYearSelect.value);
         } else {
            this.academicTermSelect.setDisabledState(true);
         }
      });

      this.collegeSelect.valueChange.subscribe(value => {
         this.form.get('departmentMenu')?.setValue(null);
         if (this.collegeSelect.value !== undefined) {
            this.departmentSelect.setDisabledState(false);
            this.departments = this.departmentService.getDepartmentsByCollege(this.collegeSelect.value);
         } else {
            this.departmentSelect.setDisabledState(true);
         }
      });

      this.departmentSelect.valueChange.subscribe(value => {
         this.form.get('courseMenu')?.setValue(null);
         if (this.departmentSelect.value !== undefined) {
            this.courseSelect.setDisabledState(false);
            this.courseService.getCoursesByDepartment(this.departmentSelect.value).subscribe(value1 => {
               this.courses = value1;
            });

            this.majorSelect.setDisabledState(false);
            this.studentEnrollmentManagementService.getMajorsByDepartment(this.departmentSelect.value).subscribe(value1 => {
               this.majors = value;
            });
         } else {
            this.courseSelect.setDisabledState(true);
            this.majorSelect.setDisabledState(true);
         }
      });

   }

   addTimetable(): void {
      const row: TimetableModel = new TimetableModel();
      row.sectionDTO = this.section;
      row.academicYearDTO = this.section.academicYearDTO;
      row.academicTermDTO = this.section.academicTermDTO;
      row.collegeDTO = this.section.collegeDTO;
      row.departmentDTO = this.section.departmentDTO;
      row.courseDTO = this.section.courseDTO;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '70%';
      dialogConfig.height = '700px';
      dialogConfig.data = row;
      this.dialog.open(AddTimetableComponent, dialogConfig);
      this.timetableService.timetableAddEvent.pipe(take(1)).subscribe(value => {
            this.selection.select(value);
            console.log(this.selection.selected);
            this.dataSource.data = this.selection.selected;
            console.log(this.dataSource.data);
            this.dialog.closeAll();
         }
      );
      this.timetableService.timetableCloseUpdateEvent.pipe(take(1)).subscribe(value => {
            this.dialog.closeAll();
         }
      );
   }

   editTimetable(row: TimetableModel): void {
      this.selection.deselect(row);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '70%';
      dialogConfig.height = '700px';
      dialogConfig.data = row;
      this.dialog.open(EditSectionTimetableComponent, dialogConfig);
      this.timetableService.timetableUpdateEvent.pipe(take(1)).subscribe(value => {
            this.selection.select(value);
            console.log(this.selection.selected);
            this.dataSource.data = this.selection.selected;
            console.log(this.dataSource.data);
            this.dialog.closeAll();
         }
      );
   }

   deleteTimetable(row: TimetableModel): void {
      this.modalService.show(DeleteTimetableComponent, {
         backdrop: 'static',
         ignoreBackdropClick: true,
         keyboard: false
      });
      this.timetableService.timetableDeleteEvent.pipe(take(1)).subscribe(_ => {
         this.deletedTimes.push(row.id);
         this.selection.deselect(row);
         console.log(this.selection.selected);
         this.dataSource.data = this.selection.selected;
      }, error => {
      });
   }

   update(): void {
      if (this.form.valid) {
         this.section.academicYearDTO.id = this.form.get('academicYearMenu')?.value;
         this.section.academicTermDTO.id = this.form.get('academicTermMenu')?.value;
         this.section.collegeDTO.id = this.form.get('collegeMenu')?.value;
         this.section.departmentDTO.id = this.form.get('departmentMenu')?.value;
         this.section.majorDTO.id = this.form.get('majorMenu')?.value;
         this.section.studyTypeDTO.id = this.form.get('studyTypeMenu')?.value;
         this.section.courseDTO.id = this.form.get('courseMenu')?.value;
         this.section.sectionNumber = this.form.get('sectionNumber')?.value;
         this.section.theoreticalLectures = this.form.get('theoreticalLectures')?.value;
         this.section.practicalLectures = this.form.get('practicalLectures')?.value;
         this.section.exercisesLectures = this.form.get('exercisesLectures')?.value;
         this.section.capacity = this.form.get('capacity')?.value;
         console.log(this.section);
      }

      console.log(this.section);

      this.sectionManagementService.update(this.section).subscribe((Response) => {

            for (const timetable of this.selection.selected) {
               timetable.sectionDTO = Response; // Response = sectionDTO
               timetable.academicYearDTO = Response.academicYearDTO;
               timetable.academicTermDTO = Response.academicTermDTO;
               timetable.collegeDTO = Response.collegeDTO;
               timetable.departmentDTO = Response.departmentDTO;
               timetable.courseDTO = Response.courseDTO;
            }

            for (const time of this.deletedTimes) {
               this.timetableService.deleteTimetable(time).subscribe(value => {
               });
            }

            this.timetableService.saveTimetables(this.selection.selected).subscribe((Response2) => {
                  this.snackBar.open('Timetables updated Successfully', undefined, {
                     duration: 2000,
                     panelClass: 'successSnackBar'
                  });
                  console.log(this.selection.selected);
                  this.timetableService.timetableCloseUpdateEvent.next();
               }, error => {
                  console.log(this.selection.selected);
                  const formControl = this.form.get(error.error.field);
                  this.errorMessage = error.error.message;
                  if (formControl) {
                     formControl.setErrors({
                        serverError: true
                     });
                  }
                  this.snackBar.open('Failed To update Timetables', undefined, {duration: 2000});
               }
            );

            this.snackBar.open('Section Updated Successfully', undefined, {
               duration: 2000,
               panelClass: 'successSnackBar'
            });
            this.route.navigate(['/sections-management', 'section-list']);
         }, error => {
            console.log(this.section);
            console.log(error);
            const formControl = this.form.get(error.error.field);
            this.errorMessage = error.error.message;
            if (formControl) {
               formControl.setErrors({
                  serverError: true
               });
            }
            this.snackBar.open('Failed To Update Section', undefined, {duration: 2000});
         }
      );
   }

   cancel(): void {
      this.route.navigate(['/sections-management', 'section-list']);
   }

   ngOnDestroy(): void {
      sessionStorage.removeItem('sectionData');
   }

}
