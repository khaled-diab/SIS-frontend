import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSelect} from '@angular/material/select';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {CollegeManagementService} from 'src/app/college-management/service/college-management.service';
import { Constants } from 'src/app/shared/constants';
import {CollegeModel} from 'src/app/shared/model/college-management/college-model';
import {DepartmentModel} from 'src/app/shared/model/department-management/department-model';
import {DepartmentService} from '../../service/department.service';

@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrls: ['./view-department.component.css']
})
export class ViewDepartmentComponent implements OnInit {
  departmentModel: DepartmentModel;
  colleges: CollegeModel[];
  readOnly: boolean;
  form: FormGroup;
  errorMessage: string;
  @ViewChild('departmentMenu', {static: true}) departmentMenu: MatSelect;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DepartmentModel,
              private departmentService: DepartmentService,
              private collegeService: CollegeManagementService,
              private breakpointObserver: BreakpointObserver,
              private snackBar: MatSnackBar,
              private route: Router) {
  }

  ngOnInit(): void {
    this.departmentModel = new DepartmentModel();
    this.departmentModel.collegeDTO = new CollegeModel();
    this.departmentModel.collegeDTO.id = 0;
    this.form = new FormGroup({
      nameEn: new FormControl(undefined, Validators.compose([Validators.required,
        Validators.pattern(Constants.ENGLISH_CHARACTERS)])),
      nameAr: new FormControl(undefined, Validators.compose([Validators.required,
        Validators.pattern(Constants.ARABIC_CHARACTERS)])),
      collegeMenu: new FormControl(undefined, Validators.required),
      // departmentMenu: new FormControl(undefined, Validators.required),
      code: new FormControl(undefined, Validators.compose([Validators.required,
      Validators.pattern(Constants.ENGLISH_CHARACTERS_AND_DIGITS)])),

    }
    );
    this.collegeService.getColleges().subscribe(Response => {
      this.colleges = Response;
      console.log(Response);
    });
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe(value => {
      if (value.matches) {
        this.fetchDataFromRouter(history.state);
        console.log('here 1');
      } else {
        console.log('here 2');
        this.departmentModel = {...this.data};
        this.form.get('nameEn')?.setValue(this.departmentModel.nameEn);
        this.form.get('nameAr')?.setValue(this.departmentModel.nameAr);
        this.form.get('code')?.setValue(this.departmentModel.code);
        if (this.departmentModel.collegeDTO === undefined) {
          this.departmentModel.collegeDTO = new CollegeModel();
          this.departmentModel.collegeDTO.id = 1;
        } else {
        }
        this.form.get('collegeMenu')?.setValue(this.departmentModel.collegeDTO?.id);
      }
    });
    console.log('classroom model', this.departmentModel);
    this.readOnly = true;
    this.form.disable();
    console.log('classroom model', this.departmentModel);
  }

  add(): void {
    if (this.form.valid) {
      this.departmentModel.nameEn = this.form.get('nameEn')?.value;
      this.departmentModel.nameAr = this.form.get('nameAr')?.value;
      this.departmentModel.code = this.form.get('code')?.value;
      this.departmentModel.collegeDTO = new CollegeModel();
      this.departmentModel.collegeDTO.id = this.form.get('collegeMenu')?.value;
    }

    this.departmentService.saveDepartment(this.departmentModel).subscribe((Response) => {
        this.snackBar.open('Department Added Successfully', undefined, {duration: 2000, panelClass: 'successSnackBar'});
        this.route.navigate(['/departments-management', 'department-list']);
        this.departmentService.closeSaveEvent.next();
      }, error => {
        const formControl = this.form.get(error.error.field);
        this.errorMessage = error.error.message;
        if (formControl) {
          formControl.setErrors({
            serverError: true
          });
        }
        this.snackBar.open('Failed To Add Department', undefined, {duration: 2000});
      }
    );
  }

  save(): void {
    console.log('department model', this.departmentModel);
    /*this.departmentModel.collegeDTO = new CollegeModel();
    this.departmentModel.collegeDTO.id = 1;
    console.log(this.departmentModel.collegeDTO.id);*/
    this.departmentService.saveDepartment(this.departmentModel).subscribe(value => {
      this.departmentService.closeSaveEvent.next();
    });
  }

  cancel(): void {
    this.departmentService.closeSaveEvent.next('Cancel');
    // this.route.navigate(['/departments-management', 'department-list']);

  }

  edit(): void {
    this.readOnly = false;
    this.form.enable();
  }

  ngAfterViewInit(): void {
    this.form.get('buildingMenu')?.valueChanges.subscribe(value => {
      this.departmentModel.collegeDTO = new CollegeModel();
      this.departmentModel.collegeDTO.id = value;
      console.log('value= ', value);
      this.departmentService.departmentSaveEvent.next();
    });
  }

  private fetchDataFromRouter(data: any): void {
    if (data.id === undefined) {
      this.departmentModel = new DepartmentModel();
      this.departmentModel.collegeDTO = new CollegeModel();
    } else {
      this.departmentModel = {...history.state};
    }
  }
}
