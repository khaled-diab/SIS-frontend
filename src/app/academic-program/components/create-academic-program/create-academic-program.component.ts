import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CollegeManagementService } from 'src/app/college-management/service/college-management.service';
import { DepartmentService } from 'src/app/department-management/service/department.service';
import { Constants } from 'src/app/shared/constants';
import { AcademicProgramModel } from 'src/app/shared/model/academicProgram-management/academicProgram-model';
import { CollegeModel } from 'src/app/shared/model/college-management/college-model';
import { DepartmentModel } from 'src/app/shared/model/department-management/department-model';
import { AcademicProgramService } from '../../service/academic-program.service';

@Component({
  selector: 'app-create-academic-program',
  templateUrl: './create-academic-program.component.html',
  styleUrls: ['./create-academic-program.component.css']
})
export class CreateAcademicProgramComponent implements OnInit {
  academicProgramModel: AcademicProgramModel;
  @ViewChild('departmentSelect', {static: true}) departmentSelect: MatSelect;
  @ViewChild('collegeSelect', {static: true}) collegeSelect: MatSelect;
  form: FormGroup;

  errorMessage: string;
  departments: DepartmentModel[];
  colleges: CollegeModel[] = [];
  college = new CollegeModel() ;

  constructor(public academicProgramService: AcademicProgramService,
              private breakpointObserver: BreakpointObserver,
              @Inject(MAT_DIALOG_DATA) public data: AcademicProgramModel,
              private departmentService: DepartmentService,
              private collegeService: CollegeManagementService,
              private snackBar: MatSnackBar,
              private route: Router,
              ) {
  }


  add(): void {
    if (this.form.valid) {
      this.academicProgramModel.name_ar = this.form.get('name_ar')?.value;
      this.academicProgramModel.name_en = this.form.get('name_en')?.value;
      this.academicProgramModel.code = this.form.get('code')?.value;
      this.academicProgramModel.departmentDTO = new DepartmentModel();
      this.academicProgramModel.departmentDTO.id = this.form.get('departmentMenu')?.value;
      this.academicProgramModel.collegeDTO = new CollegeModel();
      this.academicProgramModel.collegeDTO.id = this.form.get('collegeMenu')?.value;
      this.academicProgramModel.departmentDTO.collegeDTO = this.academicProgramModel.collegeDTO;
      // this.academicProgramModel.departmentDTO.id = 1;
    }
    this.academicProgramService.saveAcademicprogram(this.academicProgramModel).pipe(take(1)).subscribe((Response) => {
        this.snackBar.open('Academic Program Added Successfully', undefined, {duration: 2000, panelClass: 'successSnackBar'});
        // window.location.reload();
        this.academicProgramService.academicProgramSaveCloseEvent.next();
      }, error => {
        const formControl = this.form.get(error.error.field);
        this.errorMessage = error.error.message;
        if (formControl) {
          formControl.setErrors({
            serverError: true
          });
        }
        this.snackBar.open('Failed To Add Academic Program', undefined, {duration: 2000});
      }
    );
  }

  ngAfterViewInit(): void {

    this.form.get('collegeMenu')?.valueChanges.subscribe(value => {
      this.academicProgramModel.collegeDTO = new CollegeModel();
      this.academicProgramModel.collegeDTO.id = value;
      console.log('value= ', value);
    });
    this.form.get('departmentMenu')?.valueChanges.subscribe(value => {
      this.academicProgramModel.departmentDTO = new DepartmentModel();
      this.academicProgramModel.departmentDTO.id = value;
      console.log('value= ', value);
      this.academicProgramService.academicProgramSaveEvent.next();
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

  ngOnInit(): void {

    this.college = this.data.collegeDTO;

    this.form = new FormGroup({
        name_en: new FormControl(undefined, Validators.compose([Validators.required,
          Validators.pattern(Constants.ENGLISH_CHARACTERS)])),
        name_ar: new FormControl(undefined, Validators.compose([Validators.required,
          Validators.pattern(Constants.ARABIC_CHARACTERS)])),
          departmentMenu: new FormControl(undefined, Validators.required),
          collegeMenu: new FormControl(undefined, Validators.required),
        // departmentMenu: new FormControl(undefined, Validators.required),
        code: new FormControl(undefined, Validators.compose([Validators.required,
        Validators.pattern(Constants.ENGLISH_CHARACTERS_AND_DIGITS)])),
      }
    );
    this.collegeService.getAllColleges().subscribe(Response => {
      this.colleges = Response;
      console.log(Response);
    });
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe(value => {
      if (value.matches) {
        this.fetchDataFromRouter(history.state);
        console.log('here 1');
      } else {
        console.log('here 2');
        this.academicProgramModel = {...this.data};
        this.form.get('name_en')?.setValue(this.academicProgramModel.name_en);
        this.form.get('name_ar')?.setValue(this.academicProgramModel.name_ar);
        this.form.get('code')?.setValue(this.academicProgramModel.code);

        this.form.get('collegeMenu')?.setValue(this.academicProgramModel.collegeDTO!.id);
        this.form.get('departmentMenu')?.setValue(this.academicProgramModel.departmentDTO!.id);
      }
    });
    this.collegeService.getAllColleges().subscribe(Response => {
      this.colleges = Response;
      this.departments = this.departmentService.getDepartmentsByCollege(this.college.id);
    });
    console.log('academic Program model', this.academicProgramModel);
  }

  save(): void {
    if (this.form.valid) {
      this.academicProgramModel.code = this.form.get('code')?.value;
      this.academicProgramModel.name_ar = this.form.get('nameAr')?.value;
      this.academicProgramModel.name_en = this.form.get('nameEn')?.value;
      this.academicProgramModel.collegeDTO.id = this.form.get('collegeMenu')?.value;
      this.academicProgramModel.departmentDTO.id = this.form.get('departmentMenu')?.value;
      console.log('valid');
    }
    console.log(this.academicProgramModel);

    this.academicProgramService.saveAcademicprogram(this.academicProgramModel).subscribe(
      response => {
        this.snackBar.open('Academic Program Saved Successfully', undefined, {duration: 4000, panelClass: 'successSnackBar'});
        this.academicProgramService.academicProgramSaveEvent.next();
      }, error => {
        const formControl = this.form.get(error.error.field);
        console.log(error.error.field);
        this.errorMessage = error.error.message;
        if (formControl) {
          formControl.setErrors({
            serverError: true
          });
        }
        this.snackBar.open('Academic Program Saving Failed', undefined, {duration: 4000, panelClass: 'failedSnackBar'});
      }
    );

  }

  cancel(): void {
    this.academicProgramService.academicProgramSaveCloseEvent.next('Cancel');
    console.log('cancel');
  }

  private fetchDataFromRouter(data: any): void {
    if (data.id === undefined) {
      this.academicProgramModel = new AcademicProgramModel();
    } else {
      this.academicProgramModel = {...history.state};
    }
  }
}

