import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {StudentRequestModel} from '../../../shared/model/student-management/student-request-model';
import {StudentManagementService} from '../../service/student-management.service';
import {CollegeManagementService} from '../../../college-management/service/college-management.service';
import {MatSelect} from '@angular/material/select';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {DepartmentModel} from '../../../shared/model/department-management/department-model';
import {DepartmentService} from '../../../department-management/service/department.service';

@Component({
  selector: 'app-student-filter',
  templateUrl: './student-filter.component.html',
  styleUrls: ['./student-filter.component.css']
})
export class StudentFilterComponent implements OnInit, AfterViewInit {
  studentFilterModel: StudentRequestModel = new StudentRequestModel();
  @ViewChild('collegeMenu', {static: true}) collegeMenu: MatSelect;
  @ViewChild('departmentMenu', {static: true}) departmentMenu: MatSelect;

  colleges: CollegeModel[];
  departments: DepartmentModel[];

  constructor(private studentManagementService: StudentManagementService, private collegeManagementService: CollegeManagementService,
              private departmentService: DepartmentService){}



  ngOnInit(): void {

    this.collegeManagementService.getAllColleges().subscribe(Response => {
      this.colleges = Response;
    });
  }

  ngAfterViewInit(): void {
    this.collegeMenu.valueChange.subscribe(value => {
         this.departmentMenu.setDisabledState(false);
         this.departments = this.departmentService.getDepartmentsByCollege(this.collegeMenu.value);
         this.studentFilterModel.collegeId = value;
         this.studentFilterModel.departmentId = null;
         this.departmentMenu.value = null;
         this.studentManagementService.studentFilterEvent.next(this.studentFilterModel);

    });

    this.departmentMenu.valueChange.subscribe(value => {

      this.studentFilterModel.departmentId = value;

      this.studentManagementService.studentFilterEvent.next(this.studentFilterModel);

    });
  }

  applyFilter(): void {
    this.studentManagementService.studentFilterEvent.next(this.studentFilterModel);
  }

  resetFilter(): void {
    this.studentFilterModel = new StudentRequestModel();
    this.studentManagementService.studentFilterEvent.next(this.studentFilterModel);
  }
}
