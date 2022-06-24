import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CourseModel} from '../../../shared/model/course-management/course-model';
import {CourseManagementService} from '../../service/course-management.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {DepartmentModel} from '../../../shared/model/department-management/department-model';
import {Constants} from '../../../shared/constants';
import {CollegeManagementService} from '../../../college-management/service/college-management.service';
import {DepartmentService} from '../../../department-management/service/department.service';
import {MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-course-save',
  templateUrl: './save-course.component.html',
  styleUrls: ['./save-course.component.css']
})
export class SaveCourseComponent implements OnInit, AfterViewInit {

  courseModel: CourseModel;
  form: FormGroup;
  errorMessage: string;
  college = new CollegeModel();
  colleges: CollegeModel[];
  departments: DepartmentModel[];
  @ViewChild('collegeSelect', {static: true}) collegeSelect: MatSelect;
  @ViewChild('departmentSelect', {static: true}) departmentSelect: MatSelect;

  constructor(private breakpointObserver: BreakpointObserver,
              @Inject(MAT_DIALOG_DATA) public data: CourseModel,
              private courseManagementService: CourseManagementService,
              private snackBar: MatSnackBar,
              private collegeManagementService: CollegeManagementService,
              private departmentService: DepartmentService) {
  }

  ngOnInit(): void {
    this.college = this.data.collegeDTO;
    this.form = new FormGroup({
        code: new FormControl(undefined, Validators.required),
        nameAr: new FormControl(undefined, Validators.compose([Validators.required,
          Validators.pattern(Constants.ARABIC_CHARACTERS)])),
        nameEn: new FormControl(undefined, Validators.compose([Validators.required,
          Validators.pattern(Constants.ENGLISH_CHARACTERS)])),
        totalHours: new FormControl(undefined, Validators.compose([Validators.required,
          Validators.pattern(Constants.FLOAT_NUMBERS)])),
        theoreticalHours: new FormControl(undefined, Validators.compose([Validators.required,
          Validators.pattern(Constants.FLOAT_NUMBERS)])),
        exercisesHours: new FormControl(undefined, Validators.compose([Validators.required,
          Validators.pattern(Constants.FLOAT_NUMBERS)])),
        practicalHours: new FormControl(undefined, Validators.compose([Validators.required,
          Validators.pattern(Constants.FLOAT_NUMBERS)])),
        weeks: new FormControl(undefined, Validators.compose([Validators.required,
          Validators.pattern(Constants.DIGITS_ONLY)])),
        finalGrade: new FormControl(undefined, Validators.compose([Validators.required,
          Validators.pattern(Constants.FLOAT_NUMBERS)])),
        finalExamGrade: new FormControl(undefined, Validators.compose([Validators.required,
          Validators.pattern(Constants.FLOAT_NUMBERS)])),
        practicalGrade: new FormControl(undefined, Validators.compose([Validators.required,
          Validators.pattern(Constants.FLOAT_NUMBERS)])),
        oralGrade: new FormControl(undefined, Validators.compose([Validators.required,
          Validators.pattern(Constants.FLOAT_NUMBERS)])),
        midGrade: new FormControl(undefined, Validators.compose([Validators.required,
          Validators.pattern(Constants.FLOAT_NUMBERS)])),
        collegeMenu: new FormControl(undefined, Validators.required),
        departmentMenu: new FormControl(undefined, Validators.required),
      }
    );

    this.breakpointObserver.observe(Breakpoints.Handset).subscribe(value => {
      if (value.matches) {
        console.log('value matches');
        this.fetchDataFromRouter(history.state);
      } else {
        this.courseModel = {...this.data};
        this.form.get('code')?.setValue(this.courseModel.code);
        this.form.get('nameAr')?.setValue(this.courseModel.nameAr);
        this.form.get('nameEn')?.setValue(this.courseModel.nameEn);
        this.form.get('totalHours')?.setValue(this.courseModel.totalHours);
        this.form.get('theoreticalHours')?.setValue(this.courseModel.theoreticalHours);
        this.form.get('exercisesHours')?.setValue(this.courseModel.exercisesHours);
        this.form.get('practicalHours')?.setValue(this.courseModel.practicalHours);
        this.form.get('weeks')?.setValue(this.courseModel.weeks);
        this.form.get('finalGrade')?.setValue(this.courseModel.finalGrade);
        this.form.get('finalExamGrade')?.setValue(this.courseModel.finalExamGrade);
        this.form.get('midGrade')?.setValue(this.courseModel.midGrade);
        this.form.get('oralGrade')?.setValue(this.courseModel.oralGrade);
        this.form.get('practicalGrade')?.setValue(this.courseModel.practicalGrade);
        this.form.get('collegeMenu')?.setValue(this.courseModel.collegeDTO.id);
        this.form.get('departmentMenu')?.setValue(this.courseModel.departmentDTO.id);
        console.log(this.courseModel.collegeDTO.id);
        console.log(this.courseModel.departmentDTO.id);
      }
    });
    this.collegeManagementService.getAllColleges().subscribe(Response => {
      this.colleges = Response;
      this.departments = this.departmentService.getDepartmentsByCollege(this.college.id);
    });
  }

  ngAfterViewInit(): void {
    this.form.get('collegeMenu')?.valueChanges.subscribe(value => {
      this.courseModel.collegeDTO = new CollegeModel();
      this.courseModel.collegeDTO.id = value;
      console.log('value= ', value);
    });
    this.form.get('departmentMenu')?.valueChanges.subscribe(value => {
      this.courseModel.departmentDTO = new DepartmentModel();
      this.courseModel.departmentDTO.id = value;
      console.log('value= ', value);
      this.courseManagementService.courseSaveEvent.next();
    });
    this.collegeSelect.valueChange.subscribe(value => {
      if (this.collegeSelect.value !== undefined) {
        this.departmentSelect.setDisabledState(false);
        this.departments = this.departmentService.getDepartmentsByCollege(this.collegeSelect.value);
      } else {
        this.departmentSelect.setDisabledState(true);
      }
    });
  }

  save(): void {
    if (this.form.valid) {
      this.courseModel.code = this.form.get('code')?.value;
      this.courseModel.nameAr = this.form.get('nameAr')?.value;
      this.courseModel.nameEn = this.form.get('nameEn')?.value;
      this.courseModel.totalHours = this.form.get('totalHours')?.value;
      this.courseModel.theoreticalHours = this.form.get('theoreticalHours')?.value;
      this.courseModel.exercisesHours = this.form.get('exercisesHours')?.value;
      this.courseModel.practicalHours = this.form.get('practicalHours')?.value;
      this.courseModel.weeks = this.form.get('weeks')?.value;
      this.courseModel.finalGrade = this.form.get('finalGrade')?.value;
      this.courseModel.finalExamGrade = this.form.get('finalExamGrade')?.value;
      this.courseModel.midGrade = this.form.get('midGrade')?.value;
      this.courseModel.oralGrade = this.form.get('oralGrade')?.value;
      this.courseModel.practicalGrade = this.form.get('practicalGrade')?.value;
      this.courseModel.collegeDTO.id = this.form.get('collegeMenu')?.value;
      this.courseModel.departmentDTO.id = this.form.get('departmentMenu')?.value;
      console.log('valid');
    }
    console.log(this.courseModel);
    console.log(this.form.get('finalGrade')?.value);

    this.courseManagementService.saveCourse(this.courseModel).subscribe(
      response => {
        this.snackBar.open('Course Saved Successfully', undefined, {duration: 4000, panelClass: 'successSnackBar'});
        this.courseManagementService.courseSaveCloseEvent.next();
      }, error => {
        const formControl = this.form.get(error.error.field);
        console.log(error.error.field);
        this.errorMessage = error.error.message;
        if (formControl) {
          formControl.setErrors({
            serverError: true
          });
        }
        this.snackBar.open('Course Saving Failed', undefined, {duration: 4000, panelClass: 'failedSnackBar'});
      }
    );
  }

  cancel(): void {
    this.courseManagementService.courseSaveCloseEvent.next('cancel');
  }

  private fetchDataFromRouter(data: any): void {
    if (data.id === undefined) {
      this.courseModel = new CourseModel();
    } else {
      this.courseModel = {...history.state};
    }
  }
}
