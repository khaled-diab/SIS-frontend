import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {ClassroomModel} from '../../../shared/model/classroom-management/classroom-model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ClassroomManagementService} from '../../service/classroom-management.service';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {BuildingModel} from '../../../shared/model/building-management/building-model';
import {BuildingManagementService} from '../../../building-management/service/building-management.service';
import {MatSelect} from '@angular/material/select';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {DepartmentModel} from '../../../shared/model/department-management/department-model';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {DepartmentService} from '../../../department-management/service/department.service';

@Component({
  selector: 'app-view-classroom',
  templateUrl: './view-classroom.component.html',
  styleUrls: ['./view-classroom.component.css']
})

export class ViewClassroomComponent implements OnInit, AfterViewInit {
  classroomModel: ClassroomModel;
  departments: DepartmentModel[];
  buildings: BuildingModel[];
  readOnly: boolean;
  form: FormGroup;
  errorMessage: string;
  @ViewChild('buildingMenu', {static: true}) buildingMenu: MatSelect;
  @ViewChild('departmentMenu', {static: true}) departmentMenu: MatSelect;

  // @ViewChild('departmentSelect', {static: true})  departmentSelect: MatSelect;
  constructor(@Inject(MAT_DIALOG_DATA) public data: ClassroomModel,
              private classroomManagementService: ClassroomManagementService,
              private buildingManagementService: BuildingManagementService,
              private departmentService: DepartmentService,
              private breakpointObserver: BreakpointObserver,
              private snackBar: MatSnackBar,
              private route: Router) {
  }

  ngOnInit(): void {
    this.classroomModel = new ClassroomModel();
    this.classroomModel.buildingDTO = new BuildingModel();
    this.classroomModel.buildingDTO.collegeDTO = new CollegeModel();
    this.classroomModel.buildingDTO.id = 0;
    this.classroomModel.buildingDTO.collegeDTO.id = 0;
    this.classroomModel.departmentDTO = new DepartmentModel();
    this.classroomModel.departmentDTO.id = 0;
    this.form = new FormGroup({
        nameEn: new FormControl(undefined, Validators.compose([Validators.required,
          Validators.pattern('^[a-zA-Z \\d]+$')])),
        nameAr: new FormControl(undefined, Validators.compose([Validators.required,
          Validators.pattern('^[\\u0621-\\u064A \\d]+$')])),
        buildingMenu: new FormControl(undefined, Validators.required),
        departmentMenu: new FormControl(undefined, Validators.required),
        code: new FormControl(undefined, Validators.required),
        status: new FormControl(undefined, Validators.required),
        capacity: new FormControl(undefined, Validators.required),
      }
    );
    this.buildingManagementService.getBuildings().subscribe(Response => {
      this.buildings = Response;
      console.log(Response);
    });
    this.departmentService.getDepartments().subscribe(Response => {
      this.departments = Response;
      console.log(Response);
    });
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe(value => {
      if (value.matches) {
        this.fetchDataFromRouter(history.state);
        console.log('here 1');
      } else {
        console.log('here 2');
        this.classroomModel = {...this.data};
        this.form.get('nameEn')?.setValue(this.classroomModel.nameEn);
        this.form.get('nameAr')?.setValue(this.classroomModel.nameAr);
        this.form.get('code')?.setValue(this.classroomModel.code);
        this.form.get('status')?.setValue(this.classroomModel.status);
        this.form.get('capacity')?.setValue(this.classroomModel.capacity);
        if (this.classroomModel.buildingDTO === undefined) {
          this.classroomModel.buildingDTO = new BuildingModel();
          this.classroomModel.buildingDTO.collegeDTO = new CollegeModel();
          this.classroomModel.departmentDTO = new DepartmentModel();
        } else {
        }
        this.form.get('buildingMenu')?.setValue(this.classroomModel.buildingDTO.id);
        this.form.get('departmentMenu')?.setValue(this.classroomModel.departmentDTO.id);
      }
    });
    console.log('classroom model', this.classroomModel);
    this.readOnly = true;
    this.form.disable();
    console.log('classroom model', this.classroomModel);
  }

  add(): void {
    if (this.form.valid) {
      this.classroomModel.nameEn = this.form.get('nameEn')?.value;
      this.classroomModel.nameAr = this.form.get('nameAr')?.value;
      this.classroomModel.code = this.form.get('code')?.value;
      this.classroomModel.capacity = this.form.get('capacity')?.value;
      this.classroomModel.status = this.form.get('status')?.value ? 1 : 0;
      this.classroomModel.buildingDTO = new BuildingModel();
      this.classroomModel.buildingDTO.id = this.form.get('buildingMenu')?.value;
      // this.classroomModel.buildingDTO.collegeDTO = new CollegeModel();
      // this.classroomModel.buildingDTO.collegeDTO.id = 1;
      this.classroomModel.departmentDTO = new DepartmentModel();
      this.classroomModel.departmentDTO.id = this.form.get('departmentMenu')?.value;;
    }
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

 /* save(): void {
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

  edit(): void {
    this.readOnly = false;
    this.form.enable();
  }

  ngAfterViewInit(): void {
    this.form.get('buildingMenu')?.valueChanges.subscribe(value => {
      this.classroomModel.buildingDTO = new BuildingModel();
      this.classroomModel.buildingDTO.id = value;
      console.log('value= ', value);
      this.classroomManagementService.classroomSaveEvent.next();
    });
    this.form.get('departmentMenu')?.valueChanges.subscribe(value => {
      this.classroomModel.departmentDTO = new DepartmentModel();
      this.classroomModel.departmentDTO.id = value;
      console.log('value= ', value);
      this.classroomManagementService.classroomSaveEvent.next();
    });
  }

  private fetchDataFromRouter(data: any): void {
    if (data.id === undefined) {
      this.classroomModel = new ClassroomModel();
    } else {
      this.classroomModel = {...history.state};
    }
  }
}
