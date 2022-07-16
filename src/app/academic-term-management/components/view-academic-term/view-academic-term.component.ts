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
  selector: 'app-view-academic-term',
  templateUrl: './view-academic-term.component.html',
  styleUrls: ['./view-academic-term.component.css']
})
export class ViewAcademicTermComponent implements OnInit {
  academicTermModel: AcademicTermModel;
  academicYears: AcademicYear[];
  readOnly: boolean;
  form: FormGroup;
  errorMessage: string;
  @ViewChild('academicYearMenu', {static: true}) academicYearMenu: MatSelect;

  constructor(@Inject(MAT_DIALOG_DATA) public data: AcademicTermModel,
              private academicTermService: AcademicTermService,
              private academicYearService: AcademicYearService,
              private breakpointObserver: BreakpointObserver,
              private snackBar: MatSnackBar,
              private route: Router) {
  }

  ngOnInit(): void {
    this.academicTermModel = new AcademicTermModel();
    this.academicTermModel.academicYearDTO = new AcademicYear();
    this.academicTermModel.academicYearDTO.id = 0;
    this.form = new FormGroup({
        name: new FormControl(undefined, Validators.required),
        academicYearMenu: new FormControl(undefined, Validators.required),
        code: new FormControl(undefined, Validators.required),
        start_date: new FormControl(undefined, Validators.required),
        end_date: new FormControl(undefined, Validators.required),

      }
    );
    this.academicYearService.getAcademicYears().subscribe(Response => {
      this.academicYears = Response;
      console.log(Response);
    });
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe(value => {
      if (value.matches) {
        this.fetchDataFromRouter(history.state);
        console.log('here 1');
      } else {
        console.log('here 2');
        this.academicTermModel = {...this.data};
        this.form.get('name')?.setValue(this.academicTermModel.name);
        this.form.get('start_date')?.setValue(this.academicTermModel.start_date);
        this.form.get('code')?.setValue(this.academicTermModel.code);
        this.form.get('end_date')?.setValue(this.academicTermModel.end_date);
        if (this.academicTermModel.academicYearDTO === undefined) {
          this.academicTermModel.academicYearDTO = new AcademicYear();

        } else {
        }
        this.form.get('academicYearMenu')?.setValue(this.academicTermModel.academicYearDTO.id);
      }
    });
    console.log('academicTerm model', this.academicTermModel);
    this.readOnly = true;
    this.form.disable();
    console.log('academicTerm model', this.academicTermModel);
  }

  add(): void {
    if (this.form.valid) {
      this.academicTermModel.name = this.form.get('name')?.value;
      this.academicTermModel.start_date = this.form.get('start_date')?.value;
      this.academicTermModel.code = this.form.get('code')?.value;
      this.academicTermModel.end_date = this.form.get('end_date')?.value;

      this.academicTermModel.academicYearDTO = new AcademicYear();
      this.academicTermModel.academicYearDTO.id = this.form.get('academicYearMenu')?.value;

    }
    if (this.form.get('start_date')?.value > this.form.get('end_date')?.value) {
      this.snackBar.open('End Date must be greater than Start Date!', undefined, {duration: 3500});
      return;
   }
    this.academicTermService.postAcademicTerm(this.academicTermModel).subscribe((Response) => {
        this.snackBar.open('AcademicTerm Added Successfully', undefined, {duration: 2000, panelClass: 'successSnackBar'});
        this.route.navigate(['/academics-term-management', 'academic-term-list']);
        this.academicTermService.closeSaveEvent.next();
      }, error => {
        const formControl = this.form.get(error.error.field);
        this.errorMessage = error.error.message;
        if (formControl) {
          formControl.setErrors({
            serverError: true
          });
        }
        this.snackBar.open('Failed To Add AcademicTerm', undefined, {duration: 2000});
      }
    );
  }

  save(): void {
    console.log('academicTerm model', this.academicTermModel);
    this.academicTermModel.academicYearDTO = new AcademicYear();
    this.academicTermModel.academicYearDTO.id = 1;
    console.log(this.academicTermModel.academicYearDTO.id);
    this.academicTermService.postAcademicTerm(this.academicTermModel).subscribe(value => {
      this.academicTermService.closeSaveEvent.next();
    });
  }

  cancel(): void {
    // this.route.navigate(['/academicterms-management' , 'academic-term-list']);

    this.academicTermService.closeSaveEvent.next('Cancel');
  }

  edit(): void {
    this.readOnly = false;
    this.form.enable();
  }

  ngAfterViewInit(): void {
    this.form.get('academicYearMenu')?.valueChanges.subscribe(value => {
      this.academicTermModel.academicYearDTO = new AcademicYear();
      this.academicTermModel.academicYearDTO.id = value;
      console.log('value= ', value);
      this.academicTermService.academicTermSaveEvent.next();
    });
  }

  private fetchDataFromRouter(data: any): void {
    if (data.id === undefined) {
      this.academicTermModel = new AcademicTermModel();
    } else {
      this.academicTermModel = {...history.state};
    }
  }

}
