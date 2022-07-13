import {Component, OnInit} from '@angular/core';
import {GeneralSearchRequest} from '../../../shared/model/general-search-request';
import {CollegeManagementService} from '../../service/college-management.service';

@Component({
  selector: 'app-college-filter',
  templateUrl: './college-filter.component.html',
  styleUrls: ['./college-filter.component.css']
})
export class CollegeFilterComponent implements OnInit {
  collegeRequestModel: GeneralSearchRequest = new GeneralSearchRequest();

  constructor(private collegeManagementService: CollegeManagementService) {
  }

  ngOnInit(): void {
  }

  applyFilter(): void {
    this.collegeManagementService.collegeFilterEvent.next(this.collegeRequestModel);
  }

  resetFilter(): void {
    this.collegeRequestModel = new GeneralSearchRequest();
    this.collegeManagementService.collegeFilterEvent.next(this.collegeRequestModel);
  }
}
