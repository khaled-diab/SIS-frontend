import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {DepartmentModel} from '../../../shared/model/department-management/department-model';
import {FormControl, FormGroup, NgModel, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FacultyMemberModel} from '../../../shared/model/facultyMember-management/facultyMember-model';
import {Constants} from '../../../shared/constants';
import {CollegeManagementService} from '../../../college-management/service/college-management.service';
import {MatSelect} from '@angular/material/select';
import {DepartmentService} from '../../../department-management/service/department.service';
import {MajorModel} from '../../../shared/model/major-management/major-model';
import {MajorManagementServiceModule} from '../../service/major-management-service.module';

@Component({
   selector: 'app-edit-major',
   templateUrl: './edit-major.component.html',
   styleUrls: ['./edit-major.component.css']
})
export class EditMajorComponent implements OnInit {

   majorModel = new MajorModel();
   colleges: CollegeModel[];
   college = new CollegeModel();
   departments: DepartmentModel[];
   department: DepartmentModel;
   errorr = false;
   errorMessage: string;
   @ViewChild('collegeSelect', {static: true}) collegeSelect: MatSelect;
   @ViewChild('departmentSelect', {static: true}) departmentSelect: MatSelect;
   @ViewChild('arabicName') arabicName: NgModel;
   form: FormGroup;

   constructor(@Inject(MAT_DIALOG_DATA) public data: FacultyMemberModel,
               private majorManagementServiceModule: MajorManagementServiceModule,
               private snackBar: MatSnackBar,
               private collegeManagementService: CollegeManagementService,
               private departmentService: DepartmentService) {
   }

   ngOnInit(): void {
      this.majorModel = this.data;
      this.form = new FormGroup({
            nameEn: new FormControl(this.majorModel.nameEn, Validators.compose([Validators.required,
               Validators.pattern(Constants.ENGLISH_CHARACTERS)])),
            nameAr: new FormControl(this.majorModel.nameAr, Validators.compose([Validators.required,
               Validators.pattern(Constants.ARABIC_CHARACTERS)])),
            collegeMenu: new FormControl(this.majorModel.collegeDTO.id, Validators.required),
            departmentMenu: new FormControl(this.majorModel.departmentDTO.id, Validators.required),
         }
      );

      this.college = this.data.collegeDTO;
      this.department = this.majorModel.departmentDTO;
      this.collegeManagementService.getAllColleges().subscribe(Response => {
         this.colleges = Response;
      });
      this.departments = this.departmentService.getDepartmentsByCollege(this.college.id);
   }

   ngAfterViewInit(): void {
      this.collegeSelect.valueChange.subscribe(value => {
         if (this.collegeSelect.value !== undefined) {
            this.departmentSelect.setDisabledState(false);
            this.departments = this.departmentService.getDepartmentsByCollege(this.collegeSelect.value);
         } else {
            this.departmentSelect.setDisabledState(true);
         }
      });
   }

   update(): void {
      if (this.form.valid) {
         this.majorModel.nameEn = this.form.get('nameEn')?.value;
         this.majorModel.nameAr = this.form.get('nameAr')?.value;
         this.majorModel.collegeDTO.id = this.form.get('collegeMenu')?.value;
         this.majorModel.departmentDTO.id = this.form.get('departmentMenu')?.value;
      }
      console.log(this.majorModel);
      this.majorManagementServiceModule.updateMajor(this.majorModel).subscribe((Response) => {
            this.snackBar.open('Major Updated Successfully', undefined, {
               duration: 4000,
               panelClass: 'successSnackBar'
            });
            this.majorManagementServiceModule.majorCloseUpdateEvent.next();
         }, error => {
            console.log(error);
            const formControl = this.form.get(error.error.field);
            this.errorMessage = error.error.message;
            if (formControl) {
               formControl.setErrors({
                  serverError: true
               });
            }

            this.snackBar.open('Failed To Major', undefined, {duration: 4000});
            this.errorr = true;
         }
      );
   }

   cancel(): void {
      this.majorManagementServiceModule.majorCloseUpdateEvent.next();
   }

}
