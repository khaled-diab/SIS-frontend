import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {PageRequest} from '../../../shared/model/page-request';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {CollegeFilterModel} from '../../../shared/model/college-management/college-filter-model';
import {Constants} from '../../../shared/constants';
import {CollegeManagementService} from '../../../college-management/service/college-management.service';
import {Subscription} from 'rxjs';
import {StudentManagementService} from '../../service/student-management.service';
import {StudentModel} from '../../../shared/model/student-management/student-model';
import {StudentFilterModel} from '../../../shared/model/student-management/student-filter-model';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {


  @ViewChild('paginator') paginator: MatPaginator;
  tableData: PageRequest<StudentModel>;
  x: number;
  filterObject: StudentFilterModel = new StudentFilterModel();
  displayedColumns = ['UniversityId', 'EnglishName', 'ArabicName', 'Level', 'Actions'];
  pageIndex = 0;
  idSortIcon = Constants.sortASCIcon;
  englishNameSortIcon = Constants.sortASCIcon;
  arabicNameSortIcon = Constants.sortDESCIcon;
  codeSortIcon = Constants.sortASCIcon;
  sortASCHint = Constants.sortASCHint;
  sortDESCHint = Constants.sortDescHint;

  constructor(private studentManagementService: StudentManagementService) {
  }

  ngOnInit(): void {
    this.subscriptions();
  }


  pageChangeEvent(event: PageEvent): void {
    this.studentManagementService.getStudentsPage(event.pageIndex, event.pageSize)
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
    return this.studentManagementService.studentFilterEvent
      .subscribe(value => {
        this.filterObject = value;
        this.paginator.pageIndex = 0;
        this.studentManagementService
          .searchStudents(this.filterObject.filterValue, 1, 1, 0, this.paginator.pageSize, this.filterObject )
          .subscribe(filteredData => {
            this.tableData = filteredData;
            console.log('filter');
          });
      });
  }

  private initialDataSubscription(): Subscription {
    const filter = new StudentFilterModel();

    return this.studentManagementService
      .searchStudents(this.filterObject.filterValue, -1, -1, 0, 5, this.filterObject )
      .subscribe(value => {
        this.tableData = value;
        console.log(value);
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

