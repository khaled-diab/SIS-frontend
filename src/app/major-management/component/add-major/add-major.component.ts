import {Component, OnInit, ViewChild} from '@angular/core';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {DepartmentModel} from '../../../shared/model/department-management/department-model';
import {FormControl, FormGroup, NgModel, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {Constants} from '../../../shared/constants';
import {CollegeManagementService} from '../../../college-management/service/college-management.service';
import {HttpClient} from '@angular/common/http';
import {MatSelect} from '@angular/material/select';
import {DepartmentService} from '../../../department-management/service/department.service';
import {MajorManagementServiceModule} from '../../service/major-management-service.module';
import {MajorModel} from '../../../shared/model/major-management/major-model';

@Component({
   selector: 'app-add-major',
   templateUrl: './add-major.component.html',
   styleUrls: ['./add-major.component.css']
})
export class AddMajorComponent implements OnInit {

   private httpClient: HttpClient;
   majorModel = new MajorModel();
   colleges: CollegeModel[];
   college = new CollegeModel();
   departments: DepartmentModel[];
   errorMessage: string;
   @ViewChild('collegeSelect', {static: true}) collegeSelect: MatSelect;
   @ViewChild('departmentSelect', {static: true}) departmentSelect: MatSelect;
   @ViewChild('arabicName') arabicName: NgModel;
   form: FormGroup;

   constructor(private majorManagementServiceModule: MajorManagementServiceModule,
               private snackBar: MatSnackBar,
               private route: Router,
               private collegeManagementService: CollegeManagementService,
               private departmentService: DepartmentService,
               http: HttpClient) {
      this.httpClient = http;
   }

   ngOnInit(): void {
      this.form = new FormGroup({
            nameEn: new FormControl(undefined, Validators.compose([Validators.required,
               Validators.pattern(Constants.ENGLISH_CHARACTERS)])),
            nameAr: new FormControl(undefined, Validators.compose([Validators.required,
               Validators.pattern(Constants.ARABIC_CHARACTERS)])),
            collegeMenu: new FormControl(undefined, Validators.required),
            departmentMenu: new FormControl(undefined, Validators.required),
         }
      );
      this.collegeManagementService.getAllColleges().subscribe(Response => {
         this.colleges = Response;
      });
   }

   ngAfterViewInit(): void {
      this.collegeSelect.valueChange.subscribe(value => {
         if (this.collegeSelect.value !== undefined) {
            this.departmentSelect.setDisabledState(false);
            this.departments = this.departmentService.getDepartmentsByCollege(this.collegeSelect.value.id);
         } else {
            this.departmentSelect.setDisabledState(true);
         }
      });
   }

   add(): void {
      if (this.form.valid) {
         this.majorModel.nameEn = this.form.get('nameEn')?.value;
         this.majorModel.nameAr = this.form.get('nameAr')?.value;
         this.majorModel.collegeDTO = new CollegeModel();
         this.majorModel.collegeDTO = this.form.get('collegeMenu')?.value;
         this.majorModel.departmentDTO = new DepartmentModel();
         this.majorModel.departmentDTO = this.form.get('departmentMenu')?.value;
      }

      this.majorManagementServiceModule.addMajor(this.majorModel).subscribe((Response) => {
            this.snackBar.open('Major Added Successfully', undefined, {
               duration: 2000,
               panelClass: 'successSnackBar'
            });
            this.majorManagementServiceModule.majorCloseUpdateEvent.next();
         }, error => {
            const formControl = this.form.get(error.error.field);
            this.errorMessage = error.error.message;
            if (formControl) {
               formControl.setErrors({
                  serverError: true
               });
            }
            this.snackBar.open('Failed To Add Major', undefined, {duration: 2000});
         }
      );
   }

   cancel(): void {
      this.majorManagementServiceModule.majorCloseUpdateEvent.next();
   }
}
