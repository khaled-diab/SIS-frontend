import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { CollegeManagementService } from 'src/app/college-management/service/college-management.service';
import { CollegeModel } from 'src/app/shared/model/college-management/college-model';
import { DepartmentRequestModel } from 'src/app/shared/model/department-management/department-request-model';
import { DepartmentService } from '../../service/department.service';

@Component({
  selector: 'app-department-filter',
  templateUrl: './department-filter.component.html',
  styleUrls: ['./department-filter.component.css']
})
export class DepartmentFilterComponent implements OnInit {
  departmentRequestModel: DepartmentRequestModel = new DepartmentRequestModel();
  searchValue = '';
  filterCollege: null;
  colleges: CollegeModel[];
  @ViewChild('collegeSelect', {static: true})  collegeSelect: MatSelect;
  constructor(private department: DepartmentService,
              private collegeService: CollegeManagementService) { }

  ngOnInit(): void {
    this.collegeService.getColleges().subscribe(Response => {
      this.colleges = Response;
      console.log(Response);
    });
  }
  applyFilter(): void {
    this.department.departmentFilterEvent.next([this.searchValue, this.filterCollege]);
  }

  resetFilter(): void {
    this.collegeSelect.value = undefined;
    this.searchValue = '';
    this.department.departmentFilterEvent.next(['', null]);
  }

  ngAfterViewInit(): void {
    this.collegeSelect.valueChange.subscribe(value => {

      this.filterCollege = value;
      this.department.departmentFilterEvent.next([this.searchValue, this.filterCollege]);
    });

  }
}
