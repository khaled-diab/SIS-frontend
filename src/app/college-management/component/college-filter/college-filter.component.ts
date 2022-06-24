import {Component, OnInit} from '@angular/core';
import {CollegeRequestModel} from '../../../shared/model/college-management/college-request-model';
import {CollegeManagementService} from '../../service/college-management.service';

@Component({
  selector: 'app-college-filter',
  templateUrl: './college-filter.component.html',
  styleUrls: ['./college-filter.component.css']
})
export class CollegeFilterComponent implements OnInit {
  collegeRequestModel: CollegeRequestModel = new CollegeRequestModel();

  constructor(private collegeManagementService: CollegeManagementService) {
  }

  ngOnInit(): void {
  }

  applyFilter(): void {
    this.collegeManagementService.collegeFilterEvent.next(this.collegeRequestModel);
  }

  resetFilter(): void {
    this.collegeRequestModel = new CollegeRequestModel();
    this.collegeManagementService.collegeFilterEvent.next(this.collegeRequestModel);
  }
}
