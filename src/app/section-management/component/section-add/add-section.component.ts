import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
import {TimetableModel} from '../../../shared/model/timetable-management/timetable-model';
import {Constants} from '../../../shared/constants';
import {StudentEnrollmentManagementService} from '../../../studentEnrollment-management/service/studentEnrollment-management.service';
import {CourseRequestModel} from '../../../shared/model/course-management/course-request-model';
import {MatTableDataSource} from '@angular/material/table';
import {TimetableManagementService} from '../../../timetable-management/service/timetable-management.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddTimetableComponent} from '../../../timetable-management/component/timetable-add/add-timetable.component';
import {take} from 'rxjs/operators';
import {DeleteTimetableComponent} from '../../../timetable-management/component/timetable-delete/delete-timetable.component';
import {EditSectionTimetableComponent} from '../../../timetable-management/component/section-timetable-edit/edit-section-timetable.component';
import {SelectionModel} from '@angular/cdk/collections';
import {BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-section-add',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.css']
})
export class AddSectionComponent implements OnInit {

  private httpClient: HttpClient;
  section = new SectionModel();
  sectionSearch = new SectionModel();
  colleges: CollegeModel[];
  departments: DepartmentModel[];
  academicYears: AcademicYear[];
  academicTerms: AcademicTermModel[];
  newAcademicTerms: AcademicTermModel[] = [];
  courses: CourseModel[];
  courseModelRequestModel = new CourseRequestModel();
  majors: MajorModel[];
  newMajors: MajorModel[] = [];
  studyTypes: StudyTypeModel[];
  selection = new SelectionModel<TimetableModel>(true, []);
  errorMessage: string;
  form: FormGroup;
  isDisabled = true;

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
              private majorService: StudentEnrollmentManagementService,
              private studyTypeService: StudentEnrollmentManagementService,
              private courseService: CourseManagementService,
              private timetableService: TimetableManagementService,
              http: HttpClient) {
    this.httpClient = http;
  }

  displayedColumns = ['No.', 'facultyMemberId', 'lectureTypeId', 'day',
    'startTime', 'endTime', 'buildingId', 'classroomId', 'Actions'];
  dataSource = new MatTableDataSource<TimetableModel>(this.selection.selected);

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<TimetableModel>();
    this.form = new FormGroup({
        academicYearMenu: new FormControl(undefined, Validators.required),
        academicTermMenu: new FormControl(undefined, Validators.required),
        collegeMenu: new FormControl(undefined, Validators.required),
        departmentMenu: new FormControl(undefined, Validators.required),
        majorMenu: new FormControl(undefined),
        studyTypeMenu: new FormControl(undefined, Validators.required),
        courseMenu: new FormControl(undefined, Validators.required),
        sectionNumber: new FormControl(undefined, Validators.compose([Validators.required,
          Validators.pattern(Constants.ENGLISH_CHARACTERS_AND_DIGITS_AND_DASH)])),
        theoreticalLectures: new FormControl(undefined, Validators.pattern(Constants.DIGITS_ONLY)),
        practicalLectures: new FormControl(undefined, Validators.pattern(Constants.DIGITS_ONLY)),
        exercisesLectures: new FormControl(undefined, Validators.pattern(Constants.DIGITS_ONLY))
      }
    );

    this.academicYearService.getAcademicYears().subscribe(Response => {
      this.academicYears = Response;
    });

    this.academicTermService.getAcademicTerms().subscribe(Response => {
      this.academicTerms = Response;
    });

    this.collegeManagementService.getAllColleges().subscribe(Response => {
      this.colleges = Response;
    });

    this.departmentService.getDepartments();

    this.majorService.getAllMajors().subscribe(Response => {
      this.majors = Response;
    });

    this.studyTypeService.getAllStudyTypes().subscribe(Response => {
      this.studyTypes = Response;
    });

  }

  ngAfterViewInit(): void {
    this.academicYearSelect.valueChange.subscribe(value => {
      if (this.academicYearSelect.value !== undefined) {
        this.newAcademicTerms = [];
        this.academicTermSelect.setDisabledState(!this.isDisabled);
        for (const academicTerm of this.academicTerms) {
          if (academicTerm.academicYearDTO.id === this.academicYearSelect.value.id) {
            this.newAcademicTerms.push(academicTerm);
          }
        }
      } else {
        this.academicTermSelect.setDisabledState(this.isDisabled);
      }
    });

    this.collegeSelect.valueChange.subscribe(value => {
      if (this.collegeSelect.value !== undefined) {
        this.departmentSelect.setDisabledState(!this.isDisabled);
        this.departments = this.departmentService.getDepartmentsByCollege(this.collegeSelect.value.id);
      } else {
        this.departmentSelect.setDisabledState(this.isDisabled);
      }
    });

    this.departmentSelect.valueChange.subscribe(value => {
      if (this.departmentSelect.value !== undefined) {
        this.courseSelect.setDisabledState(!this.isDisabled);
        this.courseModelRequestModel.filterCollege = this.collegeSelect.value.id;
        this.courseModelRequestModel.filterDepartment = this.departmentSelect.value.id;
        this.courseService.getCoursePage(1, 500, this.courseModelRequestModel).subscribe(Response => {
          this.courses = Response.data;
        });

        this.newMajors = [];
        this.majorSelect.setDisabledState(!this.isDisabled);
        for (const major of this.majors) {
          if (major.departmentDTO.id === this.departmentSelect.value.id) {
            this.newMajors.push(major);
          }
        }
      } else {
        this.courseSelect.setDisabledState(this.isDisabled);
        this.majorSelect.setDisabledState(this.isDisabled);
      }
    });

  }

  addTimetable(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.height = '700px';
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
      this.selection.deselect(row);
      console.log(this.selection.selected);
      this.dataSource.data = this.selection.selected;
    });
  }


  add(): void {
    if (this.form.valid) {
      this.section.academicYearDTO = this.form.get('academicYearMenu')?.value;
      this.section.academicTermDTO = this.form.get('academicTermMenu')?.value;
      this.section.collegeDTO = this.form.get('collegeMenu')?.value;
      this.section.departmentDTO = this.form.get('departmentMenu')?.value;
      this.section.majorDTO = this.form.get('majorMenu')?.value;
      this.section.studyTypeDTO = this.form.get('studyTypeMenu')?.value;
      this.section.courseDTO = this.form.get('courseMenu')?.value;
      this.section.sectionNumber = this.form.get('sectionNumber')?.value;
      this.section.theoreticalLectures = this.form.get('theoreticalLectures')?.value;
      this.section.practicalLectures = this.form.get('practicalLectures')?.value;
      this.section.exercisesLectures = this.form.get('exercisesLectures')?.value;
    }

    this.sectionManagementService.save(this.section).subscribe((Response) => {

        for (const timetable of this.selection.selected) {
          timetable.sectionDTO = Response; // Response = sectionDTO
          timetable.academicYearDTO = Response.academicYearDTO;
          timetable.academicTermDTO = Response.academicTermDTO;
          timetable.collegeDTO = Response.collegeDTO;
          timetable.departmentDTO = Response.departmentDTO;
          timetable.courseDTO = Response.courseDTO;
        }

        this.timetableService.saveTimetables(this.selection.selected).subscribe((Response2) => {
            this.snackBar.open('Timetables Added Successfully', undefined, {
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
            this.snackBar.open('Failed To Add Timetables', undefined, {duration: 2000});
          }
        );

        this.snackBar.open('Section Added Successfully', undefined, {
          duration: 2000,
          panelClass: 'successSnackBar'
        });
        this.route.navigate(['/sections-management', 'section-list']);
      }, error => {
        console.log(this.section);
        const formControl = this.form.get(error.error.field);
        this.errorMessage = error.error.message;
        if (formControl) {
          formControl.setErrors({
            serverError: true
          });
        }
        this.snackBar.open('Failed To Add Section', undefined, {duration: 2000});
      }
    );

  }

  cancel(): void {
    this.route.navigate(['/sections-management', 'section-list']);
  }

}
