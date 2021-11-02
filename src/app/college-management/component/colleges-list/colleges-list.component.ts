import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {CollegeManagementService} from '../../service/college-management.service';
import {Subscription} from 'rxjs';
import {CollegeFilterModel} from '../../../shared/model/college-management/college-filter-model';
import {PageRequest} from '../../../shared/model/page-request';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {Constants} from '../../../shared/constants';

@Component({
  selector: 'app-colleges-list',
  templateUrl: './colleges-list.component.html',
  styleUrls: ['./colleges-list.component.css']
})
export class CollegesListComponent implements OnInit {

  @ViewChild('paginator') paginator: MatPaginator;
  tableData: PageRequest<CollegeModel>;
   x:number;
  filterObject: CollegeFilterModel = new CollegeFilterModel();
  displayedColumns = ['ID', 'EnglishName', 'ArabicName', 'Code', 'Actions'];
  pageIndex = 0;
  idSortIcon = Constants.sortASCIcon;
  englishNameSortIcon = Constants.sortASCIcon;
  arabicNameSortIcon = Constants.sortDESCIcon;
  codeSortIcon = Constants.sortASCIcon;
  sortASCHint = Constants.sortASCHint;
  sortDESCHint = Constants.sortDescHint;

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

  idSortAction(): void {

  }

  englishNameSortAction(): void {

  }

  arabicNameSortAction(): void {
  }

  codeSortAction(): void {

  }
}
