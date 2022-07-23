import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {BuildingModel} from '../../../shared/model/building-management/building-model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {BuildingManagementService} from '../../service/building-management.service';
import {MatSelect} from '@angular/material/select';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {DepartmentModel} from '../../../shared/model/department-management/department-model';
import {DepartmentService} from '../../../department-management/service/department.service';

@Component({
   selector: 'app-create-building',
   templateUrl: './save-building.component.html',
   styleUrls: ['./save-building.component.css']
})
export class SaveBuildingComponent implements OnInit, AfterViewInit {
   buildingModel: BuildingModel;
   colleges: CollegeModel[];
   departments: DepartmentModel[];
   form: FormGroup;
   errorMessage: string;
   @ViewChild('collegeMenu', {static: true}) collegeSelect: MatSelect;
   @ViewChild('departmentMenu', {static: true}) departmentSelect: MatSelect;
   collegeSelectValue: number;
   title = '';

   constructor(private breakpointObserver: BreakpointObserver,
               @Inject(MAT_DIALOG_DATA) public data: any[],
               private buildingManagementService: BuildingManagementService,
               private snackBar: MatSnackBar,
               private route: Router,
               private departmentService: DepartmentService,
               private activatedRoute: ActivatedRoute) {
   }

   add(): void {
      if (this.form.valid) {
         this.buildingModel.name = this.form.get('name')?.value;
         this.buildingModel.code = this.form.get('code')?.value;
         this.buildingModel.status = this.form.get('status')?.value ? 1 : 0;
         console.log(this.buildingModel.code);
         this.buildingModel.collegeDTO = new CollegeModel();
         this.buildingModel.collegeDTO.id = this.form.get('collegeMenu')?.value;
         console.log(this.buildingModel.collegeDTO.id);
         if (this.form.get('departmentMenu')?.value !== undefined && this.form.get('departmentMenu')?.value != null) {
            this.buildingModel.departmentDTO = new DepartmentModel();
            this.buildingModel.departmentDTO.id = this.form.get('departmentMenu')?.value;
         } else {
            // @ts-ignore
            this.buildingModel.departmentDTO = null;
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
   }

   ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe(value => {

      });

      this.form = new FormGroup({
            name: new FormControl(undefined, Validators.required),
            departmentMenu: new FormControl(undefined),
            collegeMenu: new FormControl(undefined, Validators.required),
            code: new FormControl(undefined, Validators.required),
            status: new FormControl(undefined),
         }
      );
      this.buildingManagementService.getColleges().subscribe(Response => {
         this.colleges = Response;
         console.log(Response);
      });
      // this.buildingManagementService.getDepartments().subscribe(Response => {
      //    this.departments = Response;
      //    console.log(Response);
      // });
      this.breakpointObserver.observe(Breakpoints.Handset).subscribe(value => {
         if (this.data[1] == 'save') {
            this.title = 'Save Building';
            this.fetchDataFromRouter(history.state);
         } else {
            this.title = 'Edit Building';
            this.buildingModel = {...this.data[0]};
            this.form.get('name')?.setValue(this.buildingModel.name);
            this.form.get('code')?.setValue(this.buildingModel.code);
            this.form.get('status')?.setValue(this.buildingModel.status);
            if (this.buildingModel.collegeDTO === undefined) {
               this.buildingModel.collegeDTO = new CollegeModel();
               this.collegeSelectValue = 0;
            } else {
               this.collegeSelectValue = this.buildingModel.collegeDTO.id;
               console.log('collegeMenu: ', this.form.get('collegeMenu')?.value);

            }
            this.form.get('collegeMenu')?.setValue(this.buildingModel.collegeDTO.id);
            this.departments = this.departmentService.getDepartmentsByCollege(this.buildingModel.collegeDTO.id);
            if (this.buildingModel.departmentDTO === null) {
               // this.buildingModel.departmentDTO = new DepartmentModel();
            } else {
               console.log(this.buildingModel.departmentDTO.id);
               this.form.get('departmentMenu')?.setValue(this.buildingModel.departmentDTO.id);
            }
         }
      });
      console.log('building model', this.buildingModel);
   }

   /*save(): void {
     this.buildingManagementService.saveBuilding(this.buildingModel).subscribe(value => {
       this.buildingManagementService.closeSaveEvent.next();
     });
   }*/

   cancel(): void {
      this.buildingManagementService.closeSaveEvent.next('Cancel');
   }

   private fetchDataFromRouter(data: any): void {
      if (data.id === undefined) {
         this.buildingModel = new BuildingModel();
      } else {
         this.buildingModel = {...history.state};
      }
   }

   ngAfterViewInit(): void {
      this.form.get('collegeMenu')?.valueChanges.subscribe(value => {
         this.buildingModel.collegeDTO = new CollegeModel();
         this.buildingModel.collegeDTO.id = value;
         console.log(value);
         this.departments = this.departmentService.getDepartmentsByCollege(value);
         console.log('value= ', value);
         this.buildingManagementService.buildingSaveEvent.next();
      });
      this.form.get('departmentMenu')?.valueChanges.subscribe(value => {
         this.buildingModel.departmentDTO = new DepartmentModel();
         this.buildingModel.departmentDTO.id = value;
         console.log('value= ', value);
         this.buildingManagementService.buildingSaveEvent.next();
      });
   }
}
