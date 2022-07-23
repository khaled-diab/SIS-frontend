import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSelect} from '@angular/material/select';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {AcademicYearService} from 'src/app/academic-year-management/service/academic-year.service';
import {AcademicTermModel} from 'src/app/shared/model/academicTerm-management/academic-term-model';
import {AcademicYear} from 'src/app/shared/model/academicYear-Management/academic-year';
import {AcademicTermService} from '../../service/academic-term.service';

@Component({
  selector: 'app-create-academic-term',
  templateUrl: './create-academic-term.component.html',
  styleUrls: ['./create-academic-term.component.css']
})
export class CreateAcademicTermComponent implements OnInit {
  academicTerm: AcademicTermModel;
  academicYears: AcademicYear[];
  @ViewChild('academicYearMenu', {static: true}) academicYearMenu: MatSelect;
  form: FormGroup;
  errorMessage: string;
  academicYearSelectValue: number;

  constructor(private breakpointObserver: BreakpointObserver,
              @Inject(MAT_DIALOG_DATA) public data: AcademicTermModel,
              private academicYear: AcademicYearService,
              private academicterm: AcademicTermService,
              private snackBar: MatSnackBar,
              private route: Router) {
  }

  add(): void {
    if (this.form.valid) {
      this.academicTerm.name = this.form.get('name')?.value;
      this.academicTerm.code = this.form.get('code')?.value;
      this.academicTerm.start_date = this.form.get('start_date')?.value;
      this.academicTerm.end_date = this.form.get('end_date')?.value;
       this.academicTerm.status = this.form.get('status')?.value;

       this.academicTerm.academicYearDTO = new AcademicTermModel();
      this.academicTerm.academicYearDTO.id = this.form.get('academicYearMenu')?.value;
    }
    if (this.form.get('start_date')?.value > this.form.get('end_date')?.value) {
      this.snackBar.open('End Date must be greater than Start Date!', undefined, {duration: 3500});
      return;
   }

    this.academicterm.postAcademicTerm(this.academicTerm).subscribe((Response) => {
        this.snackBar.open('Academic Term Added Successfully', undefined, {duration: 2000, panelClass: 'successSnackBar'});
        this.academicterm.closeSaveEvent.next();
      }, error => {
        const formControl = this.form.get(error.error.field);
        this.errorMessage = error.error.message;
        if (formControl) {
          formControl.setErrors({
            serverError: true
          });
        }
        this.snackBar.open('Failed To Add Academic Term', undefined, {duration: 2000});
      }
    );
  }

  ngAfterViewInit(): void {
    this.form.get('academicYearMenu')?.valueChanges.subscribe(value => {
      this.academicTerm.academicYearDTO = new AcademicTermModel();
      this.academicTerm.academicYearDTO.id = value;
      console.log('value= ', value);
      this.academicterm.academicTermSaveEvent.next();
    });
  }

  ngOnInit(): void {
    this.academicYearSelectValue = 0;
    this.academicTerm = new AcademicTermModel();
    this.academicTerm.academicYearDTO = new AcademicYear();

    this.form = new FormGroup({
        name: new FormControl(undefined, Validators.required),
        academicYearMenu: new FormControl(undefined, Validators.required),
        code: new FormControl(undefined, Validators.required),
        start_date: new FormControl(undefined, Validators.required),
        end_date: new FormControl(undefined, Validators.required),
          status: new FormControl(false),

       }
    );
    // this.academicYear.getAcademicYears().subscribe(Response => {
      this.academicYears = AcademicYearService.yearsList;
      // console.log(Response);
    // });
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe(value => {
      if (value.matches) {
        this.fetchDataFromRouter(history.state);
        console.log('here 1');
      } else {
        console.log('here 2');
        this.academicTerm = {...this.data};
        this.form.get('name')?.setValue(this.academicTerm.name);
        this.form.get('start_date')?.setValue(this.academicTerm.start_date);
        this.form.get('code')?.setValue(this.academicTerm.code);
        this.form.get('end_date')?.setValue(this.academicTerm.end_date);
         this.form.get('status')?.setValue(this.academicTerm.status);

         if (this.academicTerm.academicYearDTO === undefined) {
          this.academicTerm.academicYearDTO = new AcademicYear();
          this.academicYearSelectValue = 0;
        } else {
          this.academicYearSelectValue = this.academicTerm.academicYearDTO.id;
        }
        this.form.get('academicYearMenu')?.setValue(this.academicTerm.academicYearDTO.id);
      }
    });
    console.log('Academic Year model', this.academicTerm);
  }

  save(): void {
    console.log('Academic Term model', this.academicTerm);
    this.academicTerm.academicYearDTO = new AcademicYear();
    this.academicTerm.academicYearDTO.id = 1;
    this.academicterm.postAcademicTerm(this.academicTerm).subscribe(value => {
      this.academicterm.closeSaveEvent.next();
    });
  }

  cancel(): void {

    // this.route.navigate(['/academicterms-management' , 'academic-term-list']);
    this.academicterm.closeSaveEvent.next('Cancel');
  }

  private fetchDataFromRouter(data: any): void {
    if (data.id === undefined) {
      this.academicTerm = new AcademicTermModel();
    } else {
      this.academicTerm = {...history.state};
    }
  }
}
