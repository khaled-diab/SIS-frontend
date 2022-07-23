import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {CollegeManagementService} from '../../service/college-management.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {Constants} from '../../../shared/constants';

@Component({
   selector: 'app-create-college',
   templateUrl: './save-college.component.html',
   styleUrls: ['./save-college.component.css']
})
export class SaveCollegeComponent implements OnInit {

   collegeModel: CollegeModel;
   form: FormGroup;
   errorMessage: string;
   title = '';

   constructor(@Inject(MAT_DIALOG_DATA) public data: any[],
               private snackBar: MatSnackBar,
               private route: Router,
               private activatedRoute: ActivatedRoute,
               private breakpointObserver: BreakpointObserver,
               private collegeManagementService: CollegeManagementService) {
   }

   ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe(value => {

      });
      this.form = new FormGroup({
            nameAr: new FormControl(undefined, Validators.compose([Validators.required,
               Validators.pattern(Constants.ARABIC_CHARACTERS)])),
            nameEn: new FormControl(undefined, Validators.compose([Validators.required,
               Validators.pattern(Constants.ENGLISH_CHARACTERS)])),
            code: new FormControl(undefined, Validators.required),
         }
      );
      this.breakpointObserver.observe(Breakpoints.Handset).subscribe(value => {
         if (this.data[1] === 'save') {
            this.title = 'Save College';
            this.fetchDataFromRouter(history.state);
         } else {
            this.title = 'Edit College';
            this.collegeModel = {...this.data[0]};
            this.form.get('nameAr')?.setValue(this.collegeModel.nameAr);
            this.form.get('nameEn')?.setValue(this.collegeModel.nameEn);
            this.form.get('code')?.setValue(this.collegeModel.code);
         }
      });
   }

   save(): void {
      if (this.form.valid) {
         this.collegeModel.nameAr = this.form.get('nameAr')?.value;
         this.collegeModel.nameEn = this.form.get('nameEn')?.value;
         this.collegeModel.code = this.form.get('code')?.value;
         this.collegeManagementService.checkCollegeCode(this.collegeModel.code).subscribe(value => {
            if (value.status === 200) {
               this.collegeManagementService.saveCollege(this.collegeModel).subscribe(() => {
                  this.collegeModel = new CollegeModel();
                  this.snackBar.open('College Added Successfully', undefined, {duration: 2000, panelClass: 'successSnackBar'});
                  this.route.navigate(['/colleges-management', 'college-list']);
                  this.collegeManagementService.closeSaveEvent.next();
               }, error => {
                  const formControl = this.form.get(error.error.field);
                  this.errorMessage = error.error.message;
                  if (formControl) {
                     formControl.setErrors({
                        serverError: true
                     });
                  }
                  this.snackBar.open('Failed To Add College', undefined, {duration: 2000});
               });
            } else {
               this.collegeModel.code = null;
            }
         });
      }else{
         console.log('form not valid');
      }
   }


   public cancel(): void {
      this.collegeManagementService.closeSaveEvent.next('Cancel');
   }

   private fetchDataFromRouter(data: any): void {
      if (data.id === undefined) {
         this.collegeModel = new CollegeModel();
      } else {
         this.collegeModel = {...history.state};
      }
   }
}
