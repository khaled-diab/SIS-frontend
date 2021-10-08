import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {CollegeManagementService} from '../../service/college-management.service';
import {CollegePage} from '../../model/college-page';
import {Subscription} from 'rxjs';
import {CollegeFilterModel} from '../../model/college-filter-model';

@Component({
  selector: 'app-colleges-list',
  templateUrl: './colleges-list.component.html',
  styleUrls: ['./colleges-list.component.css']
})
export class CollegesListComponent implements OnInit {

  @ViewChild('paginator') paginator: MatPaginator;
  tableData: CollegePage;
  filterObject: CollegeFilterModel = new CollegeFilterModel();
  displayedColumns = ['ID', 'EnglishName', 'ArabicName', 'Status', 'Code', 'Actions'];
  pageIndex = 0;

  constructor(private collegeManagementService: CollegeManagementService) {
  }

  ngOnInit(): void {
    this.subscriptions();
  }


  pageChangeEvent(event: PageEvent): void {
    this.collegeManagementService.getCollegePage(event.pageIndex, event.pageSize, this.filterObject)
      .subscribe(value => {
        this.tableData = value;
      });
  }


  private subscriptions(): Subscription[] {
    const subscriptions = [];
    subscriptions.push(this.initialDataSubscription());
    subscriptions.push(this.filterEventSubscription());
    return subscriptions;
  }

  private filterEventSubscription(): Subscription {
    return this.collegeManagementService.departmentFilterEvent
      .subscribe(value => {
        this.filterObject = value;
        this.paginator.pageIndex = 0;
        this.collegeManagementService
          .getCollegePage(0, 5, this.filterObject)
          .subscribe(filteredData => {
            this.tableData = filteredData;
          });
      });
  }

  private initialDataSubscription(): Subscription {
    return this.collegeManagementService
      .getCollegePage(0, 5, this.filterObject)
      .subscribe(value => {
        this.tableData = value;
      });
  }
}
