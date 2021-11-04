import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {CollegeManagementService} from '../../service/college-management.service';
import {Subscription} from 'rxjs';
import {CollegeRequestModel} from '../../../shared/model/college-management/college-request-model';
import {PageRequest} from '../../../shared/model/page-request';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {Sort} from '@angular/material/sort';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-colleges-list',
  templateUrl: './colleges-list.component.html',
  styleUrls: ['./colleges-list.component.css']
})
export class CollegesListComponent implements OnInit {

  @ViewChild('paginator') paginator: MatPaginator;
  tableData: PageRequest<CollegeModel>;
  collegeRequestModel: CollegeRequestModel = new CollegeRequestModel();
  displayedColumns = ['id', 'nameEn', 'nameAr', 'code', 'Actions'];
  pageIndex = 0;

  constructor(private collegeManagementService: CollegeManagementService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.subscriptions();
  }


  pageChangeEvent(event: PageEvent): void {
    this.collegeManagementService.getCollegePage(event.pageIndex, event.pageSize, this.collegeRequestModel)
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

  sortEvent($event: Sort): void {
    this.collegeRequestModel = this.collegeManagementService.constructCollegeRequestObject($event, this.collegeRequestModel);
    this.collegeManagementService.getCollegePage(0, 5, this.collegeRequestModel).subscribe(value => {
      this.tableData = value;
    });
  }

  viewCollege(row: CollegeModel): void {

  }

  editCollege(row: CollegeModel): void {

  }

  deleteCollege(row: CollegeModel): void {
    this.snackBar.open('college deleted successfully', '',);
    console.log(row);
  }

  private filterEventSubscription(): Subscription {
    return this.collegeManagementService.departmentFilterEvent
      .subscribe(value => {
        this.collegeRequestModel = value;
        this.paginator.pageIndex = 0;
        this.collegeManagementService
          .getCollegePage(0, 5, this.collegeRequestModel)
          .subscribe(filteredData => {
            this.tableData = filteredData;
          });
      });
  }

  private initialDataSubscription(): Subscription {
    return this.collegeManagementService
      .getCollegePage(0, 5, this.collegeRequestModel)
      .subscribe(value => {
        this.tableData = value;
      });
  }
}
