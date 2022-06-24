import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { CollegeManagementService } from 'src/app/college-management/service/college-management.service';
import { DepartmentService } from 'src/app/department-management/service/department.service';
import { AcademicProgramRequestModel } from 'src/app/shared/model/academicProgram-management/academic-program-request-model';
import { CollegeModel } from 'src/app/shared/model/college-management/college-model';
import { DepartmentModel } from 'src/app/shared/model/department-management/department-model';
import { AcademicProgramService } from '../../service/academic-program.service';

@Component({
  selector: 'app-academic-program-filter',
  templateUrl: './academic-program-filter.component.html',
  styleUrls: ['./academic-program-filter.component.css']
})
export class AcademicProgramFilterComponent implements OnInit {
  academicProgramRequestModel: AcademicProgramRequestModel = new AcademicProgramRequestModel();
  colleges: CollegeModel [];
  departments: DepartmentModel[];
  collegeSelectValue:number;
  departmentSelectValur:number;
  searchValue:string;
  filterValue:null;
  collegeFilter:null;
  departmentFilter?:null;
  @ViewChild('collegeSelect', {static: true}) collegeSelect: MatSelect;
  @ViewChild('departmentSelect', {static: true}) departmentSelect: MatSelect;

  constructor(private academicProgramService: AcademicProgramService,
              private collegeManagementService: CollegeManagementService,
              private departmentService: DepartmentService) {
  }

  ngOnInit(): void {
    this.searchValue = '';
    this.collegeManagementService.getAllColleges().subscribe(Response => {
      this.colleges = Response;
    });
    this.departmentService.getDepartments();
  }

  // ngAfterViewInit(): void {
  //   this.collegeSelect.valueChange.subscribe(value => {
  //     if (this.collegeSelect.value !== undefined) {
  //       this.departmentSelect.setDisabledState(false);
  //       this.departments = this.departmentService.getDepartmentsByCollege(this.collegeSelect.value);
  //     } else {
  //       this.resetFilter();
  //       this.departmentSelect.setDisabledState(true);
  //     }
  //     this.academicProgramRequestModel.filterCollege = value;
  //     this.collegeFilter=value;
  //     this.academicProgramService.academicProgramFilterEvent.next(this.academicProgramRequestModel);
  //     this.academicProgramService.academicProgramFilterEvent.next([this.searchValue, value]);

  //   });

  //   this.departmentSelect.valueChange.subscribe(value => {
  //     this.academicProgramRequestModel.filterDepartment = value;
  //     this.departmentFilter=value;
  //     console.log(value);
  //     this.academicProgramService.academicProgramFilterEvent.next(this.academicProgramRequestModel);
  //     this.academicProgramService.academicProgramFilterEvent.next([this.searchValue,this.collegeFilter,value]);

  //   });
  // }
  ngAfterViewInit(): void {
    this.collegeSelect.valueChange.subscribe(value => {
      if (this.collegeSelect.value !== undefined){
        this.departmentSelect.setDisabledState(false);
        this.departments = this.departmentService.getDepartmentsByCollege(this.collegeSelect.value);

      }else{
        this.departmentSelect.setDisabledState(true);
        this.departmentSelect.value = undefined;
        this.departmentFilter = undefined;
      }
      this.collegeFilter = value;
      this.academicProgramService.academicProgramFilterEvent.next([this.searchValue, value, this.departmentFilter]);
    });
    this.departmentSelect.valueChange.subscribe(value => {
      this.departmentFilter = value;
      this.academicProgramService.academicProgramFilterEvent.next([this.searchValue, this.collegeFilter, value]);
    });
  }

  applyFilter(): void {
    // this.academicProgramService.academicProgramFilterEvent.next(this.academicProgramRequestModel);
    this.academicProgramService.academicProgramFilterEvent.next([this.searchValue,this.filterValue]);
  }

  resetFilter(): void {
    this.collegeSelect.value = undefined;
    this.departmentSelect.value = undefined;
    this.departmentSelect.setDisabledState(true);
    this.academicProgramRequestModel = new AcademicProgramRequestModel();
    this.academicProgramService.academicProgramFilterEvent.next(this.academicProgramRequestModel);
    this.searchValue = ' ';
    this.filterValue = null;
    this.academicProgramService.academicProgramFilterEvent.next([' ', null]);
  }
}
