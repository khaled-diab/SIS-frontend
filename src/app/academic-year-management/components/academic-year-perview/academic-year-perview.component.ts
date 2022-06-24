import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Constants } from 'src/app/shared/constants';
import { AcademicYear } from 'src/app/shared/model/academicYear-Management/academic-year';
import { AcademicYearService } from '../../service/academic-year.service';

@Component({
  selector: 'app-academic-year-perview',
  templateUrl: './academic-year-perview.component.html',
  styleUrls: ['./academic-year-perview.component.css']
})
export class AcademicYearPerviewComponent implements OnInit,AfterViewInit {
  academicYearModel: AcademicYear;
  readOnly: boolean;
  form: FormGroup;
  errorMessage: string;
  constructor(public academicYearService:AcademicYearService,
    private snackBar: MatSnackBar,
    private route: Router,
    private breakpointObserver: BreakpointObserver,
    @Inject(MAT_DIALOG_DATA) public data: AcademicYear) { }
    ngAfterViewInit(): void {
   
      this.academicYearService.postAcademicYear(this.academicYearModel).subscribe(response => {
        console.log(response);
      });
  }
  add(): void {
    if (this.form.valid) {
      this.academicYearModel.code = this.form.get('code')?.value;
      this.academicYearModel.name = this.form.get('name')?.value;
      this.academicYearModel.start_date = this.form.get('start_date')?.value;
      this.academicYearModel.end_date = this.form.get('end_date')?.value ;
     
    }
    this.academicYearService.postAcademicYear(this.academicYearModel).subscribe((Response) => {
        this.snackBar.open('Academic Year Edited Successfully', undefined, {duration: 2000, panelClass: 'successSnackBar'});
        this.route.navigate(['/academicyears-management', 'academic-year-list']);
        this.academicYearService.closeSaveEvent.next();
      }, error => {
        const formControl = this.form.get(error.error.field);
        this.errorMessage = error.error.message;
        if (formControl) {
          formControl.setErrors({
            serverError: true
          });
        }
        this.snackBar.open('Failed To Edit Academic Year', undefined, {duration: 2000});
      }
    );
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(undefined, Validators.compose([Validators.required,
        Validators.pattern(Constants.ENGLISH_CHARACTERS_AND_DIGITS)])),
        code: new FormControl(undefined, Validators.compose([Validators.required,
          Validators.pattern(Constants.ENGLISH_CHARACTERS_AND_DIGITS)])),
          start_date: new FormControl(undefined, Validators.required),

         end_date: new FormControl(undefined, Validators.required),
    }
    );
    this.academicYearModel = this.data;
 
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe(value => {
      if (value.matches) {
        this.fetchDataFromRouter(history.state);
      } else {
        this.academicYearModel = {...this.data};
        this.form.get('name')?.setValue(this.academicYearModel.name);
        this.form.get('start_date')?.setValue(this.academicYearModel.start_date);
        this.form.get('code')?.setValue(this.academicYearModel.code);
        this.form.get('end_date')?.setValue(this.academicYearModel.end_date);
      
      }
    });
    console.log('academic year model', this.academicYearModel);
    this.readOnly = true;
    this.form.disable();
  }

  save(): void {
    this.academicYearService.postAcademicYear(this.academicYearModel).subscribe(value => {
        this.academicYearService.closeSaveEvent.next();
    });
  }
  cancel(): void{
    this.academicYearService.closeSaveEvent.next('Cancel');
    // this.route.navigate(['/academicYears-management', 'academic-year-list']);

  }
  edit(): void{
    this.readOnly = false;
    this.form.enable();
  }
  private fetchDataFromRouter(data: any): void {
    if (data.id === undefined) {
      this.academicYearModel = new AcademicYear();
    } else {
      this.academicYearModel = {...history.state};
    }
  }
}
