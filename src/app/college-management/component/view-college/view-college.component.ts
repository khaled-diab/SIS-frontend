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
   selector: 'app-view-college',
   templateUrl: './view-college.component.html',
   styleUrls: ['./view-college.component.css']
})
export class ViewCollegeComponent implements OnInit {

   collegeModel: CollegeModel;
   form: FormGroup;
   errorMessage: string;
   readOnly: boolean;

   constructor(@Inject(MAT_DIALOG_DATA) public data: CollegeModel,
               private snackBar: MatSnackBar,
               private route: Router,
               private breakpointObserver: BreakpointObserver,
               private collegeManagementService: CollegeManagementService) {
   }

   ngOnInit(): void {
      this.form = new FormGroup({
            nameAr: new FormControl(undefined, Validators.compose([Validators.required,
               Validators.pattern(Constants.ARABIC_CHARACTERS)])),
            nameEn: new FormControl(undefined, Validators.compose([Validators.required,
               Validators.pattern(Constants.ENGLISH_CHARACTERS)])),
            code: new FormControl(undefined, Validators.required),
         }
      );
      this.collegeModel = this.data;
      this.breakpointObserver.observe(Breakpoints.Handset).subscribe(value => {
            this.collegeModel = {...this.data};
            this.form.get('nameAr')?.setValue(this.collegeModel.nameAr);
            this.form.get('nameEn')?.setValue(this.collegeModel.nameEn);
            this.form.get('code')?.setValue(this.collegeModel.code);
      });
      this.readOnly = true;
      this.form.disable();
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

   edit(): void {
      this.readOnly = false;
      this.form.enable();
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
