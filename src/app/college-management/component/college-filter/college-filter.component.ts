import {Component, OnInit} from '@angular/core';
import {CollegeFilterModel} from '../../../shared/model/college-management/college-filter-model';
import {StatusType} from '../../../shared/model/college-management/status-Type';
import {CollegeManagementService} from '../../service/college-management.service';

@Component({
  selector: 'app-college-filter',
  templateUrl: './college-filter.component.html',
  styleUrls: ['./college-filter.component.css']
})
export class CollegeFilterComponent implements OnInit {
  collegeFilterModel: CollegeFilterModel = new CollegeFilterModel();
  statusTypes: StatusType[] = [
    {value: 'Active', viewValue: 'Active'},
    {value: 'Inactive', viewValue: 'Inactive'}
  ];

  constructor(private collegeManagementService: CollegeManagementService) {
  }

  ngOnInit(): void {
  }

  applyFilter(): void {
    this.collegeManagementService.departmentFilterEvent.next(this.collegeFilterModel);
  }

  resetFilter(): void {
    this.collegeFilterModel = new CollegeFilterModel();
    this.collegeManagementService.departmentFilterEvent.next(this.collegeFilterModel);
  }
}
