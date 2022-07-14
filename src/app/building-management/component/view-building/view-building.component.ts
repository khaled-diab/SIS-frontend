import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {BuildingModel} from '../../../shared/model/building-management/building-model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {BuildingManagementService} from '../../service/building-management.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSelect} from '@angular/material/select';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {DepartmentModel} from '../../../shared/model/department-management/department-model';

@Component({
   selector: 'app-view-building',
   templateUrl: './view-building.component.html',
   styleUrls: ['./view-building.component.css']
})
export class ViewBuildingComponent implements OnInit, AfterViewInit {

   buildingModel: BuildingModel;
   colleges: CollegeModel[];
   departments: DepartmentModel[];
   readOnly: boolean;
   form: FormGroup;
   errorMessage: string;
   @ViewChild('collegeMenu', {static: true}) collegeMenu: MatSelect;
   @ViewChild('departmentMenu', {static: true}) departmentMenu: MatSelect;

   constructor(@Inject(MAT_DIALOG_DATA) public data: BuildingModel,
               private buildingManagementService: BuildingManagementService,
               private snackBar: MatSnackBar,
               private route: Router,
               private breakpointObserver: BreakpointObserver) {
   }

   ngAfterViewInit(): void {
      this.form.get('collegeMenu')?.valueChanges.subscribe(value => {
         this.buildingModel.collegeDTO.id = value;
         console.log('value= ' + value);
         this.buildingManagementService.saveBuilding(this.buildingModel).subscribe(response => {
            console.log(response);
         });
      });
      this.form.get('departmentMenu')?.valueChanges.subscribe(value => {
         this.buildingModel.departmentDTO.id = value;
         console.log('value= ' + value);
         this.buildingManagementService.saveBuilding(this.buildingModel).subscribe(response => {
            console.log(response);
         });
      });
   }

   add(): void {
      if (this.form.valid) {
         this.buildingModel.name = this.form.get('name')?.value;
         this.buildingModel.code = this.form.get('code')?.value;
         this.buildingModel.status = this.form.get('status')?.value ? 1 : 0;
         console.log(this.buildingModel.code);
         this.buildingModel.collegeDTO = new CollegeModel();
         this.buildingModel.collegeDTO.id = this.form.get('collegeMenu')?.value;
         this.buildingModel.departmentDTO = new DepartmentModel();
         this.buildingModel.collegeDTO.id = this.form.get('departmentMenu')?.value;
      }
      this.buildingManagementService.saveBuilding(this.buildingModel).subscribe((Response) => {
            this.snackBar.open('Building Added Successfully', undefined, {duration: 2000, panelClass: 'successSnackBar'});
            this.route.navigate(['/buildings-management', 'building-list']);
            this.buildingManagementService.closeSaveEvent.next();
         }, error => {
            const formControl = this.form.get(error.error.field);
            this.errorMessage = error.error.message;
            if (formControl) {
               formControl.setErrors({
                  serverError: true
               });
            }
            this.snackBar.open('Failed To Add Building', undefined, {duration: 2000});
         }
      );
   }

   ngOnInit(): void {
      this.form = new FormGroup({
            nameAr: new FormControl(undefined, Validators.required),
            departmentMenu: new FormControl(undefined),
            collegeMenu: new FormControl(undefined, Validators.required),
            code: new FormControl(undefined, Validators.required),
            status: new FormControl(undefined, Validators.required),
         }
      );
      this.buildingModel = this.data;
      this.buildingManagementService.getColleges().subscribe(Response => {
         this.colleges = Response;
         console.log(Response);
      });
      this.buildingManagementService.getDepartments().subscribe(Response => {
         this.departments = Response;
         console.log(Response);
      });
      this.breakpointObserver.observe(Breakpoints.Handset).subscribe(value => {
         if (value.matches) {
            this.fetchDataFromRouter(history.state);
         } else {
            this.buildingModel = {...this.data};
            this.form.get('name')?.setValue(this.buildingModel.name);
            this.form.get('code')?.setValue(this.buildingModel.code);
            this.form.get('status')?.setValue(this.buildingModel.status);
            if (this.buildingModel.collegeDTO === undefined) {
               this.buildingModel.collegeDTO = new CollegeModel();
            } else {
               this.form.get('collegeMenu')?.setValue(this.buildingModel.collegeDTO.id);
               console.log('collegeMenu: ', this.form.get('collegeMenu')?.value);
            }
            if (this.buildingModel.collegeDTO === undefined) {
               this.buildingModel.departmentDTO = new DepartmentModel();
            } else {
               this.form.get('departmentMenu')?.setValue(this.buildingModel.departmentDTO.id);
            }
         }
      });
      console.log('building model', this.buildingModel);
      this.readOnly = true;
      this.form.disable();
   }

   save(): void {
      this.buildingManagementService.saveBuilding(this.buildingModel).subscribe(value => {
         this.buildingManagementService.closeSaveEvent.next();
      });
   }

   cancel(): void {
      this.buildingManagementService.closeSaveEvent.next('Cancel');
   }

   edit(): void {
      this.readOnly = false;
      this.form.enable();
   }

   private fetchDataFromRouter(data: any): void {
      if (data.id === undefined) {
         this.buildingModel = new BuildingModel();
      } else {
         this.buildingModel = {...history.state};
      }
   }
}
