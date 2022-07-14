import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {ClassroomModel} from '../../../shared/model/classroom-management/classroom-model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ClassroomManagementService} from '../../service/classroom-management.service';
import {BuildingModel} from '../../../shared/model/building-management/building-model';
import {BuildingManagementService} from '../../../building-management/service/building-management.service';
import {MatSelect} from '@angular/material/select';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {DepartmentModel} from '../../../shared/model/department-management/department-model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {CollegeManagementService} from '../../../college-management/service/college-management.service';

@Component({
   selector: 'app-create-classroom',
   templateUrl: './save-classroom.component.html',
   styleUrls: ['./save-classroom.component.css']
})

export class SaveClassroomComponent implements OnInit, AfterViewInit {
   classroomModel: ClassroomModel;
   buildings: BuildingModel[];
   departments: DepartmentModel[];
   colleges: CollegeModel[];
   @ViewChild('buildingMenu', {static: true}) buildingMenu: MatSelect;
   @ViewChild('collegeMenu', {static: true}) collegeMenu: MatSelect;
   form: FormGroup;
   errorMessage: string;

   constructor(private breakpointObserver: BreakpointObserver,
               @Inject(MAT_DIALOG_DATA) public data: ClassroomModel,
               private classroomManagementService: ClassroomManagementService,
               private buildingManagementService: BuildingManagementService,
               private collegeService: CollegeManagementService,
               private snackBar: MatSnackBar,
               private route: Router) {
   }

   add(): void {
      if (this.form.valid) {
         this.classroomModel.name = this.form.get('name')?.value;
         this.classroomModel.code = this.form.get('code')?.value;
         this.classroomModel.capacity = this.form.get('capacity')?.value;
         this.classroomModel.status = this.form.get('status')?.value ? 1 : 0;
         this.classroomModel.buildingDTO = new BuildingModel();
         this.classroomModel.buildingDTO.id = this.form.get('buildingMenu')?.value;
         this.classroomModel.collegeDTO = new CollegeModel();
         this.classroomModel.collegeDTO.id = this.form.get('collegeMenu')?.value;
      }
      console.log('Building', this.form.get('buildingMenu')?.value);
      console.log('Classroom', this.classroomModel);
      this.classroomManagementService.saveClassroom(this.classroomModel).subscribe((Response) => {
            this.snackBar.open('Classroom Added Successfully', undefined, {duration: 2000, panelClass: 'successSnackBar'});
            this.route.navigate(['/classrooms-management', 'classroom-list']);
            this.classroomManagementService.closeSaveEvent.next();
         }, error => {
            const formControl = this.form.get(error.error.field);
            this.errorMessage = error.error.message;
            if (formControl) {
               formControl.setErrors({
                  serverError: true
               });
            }
            this.snackBar.open('Failed To Add Classroom', undefined, {duration: 2000});
         }
      );
   }

   ngAfterViewInit(): void {
      this.form.get('buildingMenu')?.valueChanges.subscribe(value => {
         // this.classroomModel.buildingDTO = new BuildingModel();
         // this.classroomModel.buildingDTO.collegeDTO = new CollegeModel();
         this.classroomModel.buildingDTO.id = value;
         console.log('value= ', value);
         this.classroomManagementService.classroomSaveEvent.next();
      });
      this.form.get('collegeMenu')?.valueChanges.subscribe(value => {
         this.classroomModel.collegeDTO.id = value;
         console.log('value= ', value);
         this.classroomManagementService.classroomSaveEvent.next();
      });
   }

   ngOnInit(): void {
      this.classroomModel = new ClassroomModel();
      this.classroomModel.buildingDTO = new BuildingModel();
      this.classroomModel.collegeDTO = new CollegeModel();
      this.classroomModel.buildingDTO.id = 0;
      this.classroomModel.buildingDTO.collegeDTO.id = 0;
      this.classroomModel.collegeDTO.id = 1;
      this.form = new FormGroup({
            name: new FormControl(undefined, Validators.required),
            buildingMenu: new FormControl(undefined, Validators.required),
            collegeMenu: new FormControl(undefined, Validators.required),
            code: new FormControl(undefined, Validators.required),
            status: new FormControl(undefined, Validators.required),
            capacity: new FormControl(undefined, Validators.required),
         }
      );
      this.buildingManagementService.getBuildings().subscribe(Response => {
         this.buildings = Response;
         console.log(Response);
      });
      this.collegeService.getAllColleges().subscribe(Response => {
         this.colleges = Response;
         console.log(Response);
      });
      this.breakpointObserver.observe(Breakpoints.Handset).subscribe(value => {
         if (value.matches) {
            this.fetchDataFromRouter(history.state);
         } else {
            this.classroomModel = {...this.data};
            this.form.get('name')?.setValue(this.classroomModel.name);
            this.form.get('code')?.setValue(this.classroomModel.code);
            this.form.get('status')?.setValue(this.classroomModel.status);
            this.form.get('capacity')?.setValue(this.classroomModel.capacity);
            if (this.classroomModel.buildingDTO === undefined) {
               this.classroomModel.buildingDTO = new BuildingModel();
               this.classroomModel.collegeDTO = new CollegeModel();
               this.classroomModel.buildingDTO.collegeDTO = new CollegeModel();
            } else {
               // this.form.get('')
            }
            this.form.get('buildingMenu')?.setValue(this.classroomModel.buildingDTO.id);
            this.form.get('collegeMenu')?.setValue(this.classroomModel.collegeDTO.id);
         }
      });
      console.log('classroom model', this.classroomModel);
   }

   /*save(): void {
     console.log('classroom model', this.classroomModel);
     this.classroomModel.departmentDTO = new DepartmentModel();
     this.classroomModel.departmentDTO.id = 1;
     this.classroomModel.buildingDTO.collegeDTO = new CollegeModel();
     this.classroomModel.buildingDTO.collegeDTO.id = 1;
     console.log(this.classroomModel.departmentDTO.id);
     this.classroomManagementService.saveClassroom(this.classroomModel).subscribe(value => {
       this.classroomManagementService.closeSaveEvent.next();
     });
   }*/

   cancel(): void {
      this.classroomManagementService.closeSaveEvent.next('Cancel');
   }

   private fetchDataFromRouter(data: any): void {
      if (data.id === undefined) {
         this.classroomModel = new ClassroomModel();
      } else {
         this.classroomModel = {...history.state};
      }
   }
}
