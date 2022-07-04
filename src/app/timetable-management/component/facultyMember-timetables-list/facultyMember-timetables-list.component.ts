import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageRequest} from '../../../shared/model/page-request';
import {Subscription} from 'rxjs';
import {TimetableManagementService} from '../../service/timetable-management.service';
import {TimetableModel} from '../../../shared/model/timetable-management/timetable-model';
import {TimetableRequestModel} from '../../../shared/model/timetable-management/timetable-request-model';

@Component({
  selector: 'app-facultyMember-timetables-list',
  templateUrl: './facultyMember-timetables-list.component.html',
  styleUrls: ['./facultyMember-timetables-list.component.css']
})
export class FacultyMemberTimetablesListComponent implements OnInit, OnDestroy {


  tableData: PageRequest<TimetableModel>;
  timetableRequestModel: TimetableRequestModel = new TimetableRequestModel();
  displayedColumns = ['No.', 'startTime', 'endTime', 'section', 'lectureTypeId',  'buildingId', 'classroomId'];
  pageIndex = 0;
  defaultPgeSize = 50;
  subscriptionList: Subscription[] = [];

  constructor(private timetableManagementService: TimetableManagementService) {
    this.timetableRequestModel.filterFacultyMember = 1;
  }

  ngOnInit(): void {
    this.subscriptionList = this.subscriptions();
  }

  private subscriptions(): Subscription[] {
    const subscriptions = [];
    subscriptions.push(this.initialDataSubscription());
    subscriptions.push(this.filterEventSubscription());
    return subscriptions;
  }

  private filterEventSubscription(): Subscription {
    return this.timetableManagementService.timetableFilterEvent
      .subscribe(value => {
        this.timetableRequestModel = value;
        this.timetableManagementService.searchTimetables
        (this.pageIndex, this.defaultPgeSize, this.timetableRequestModel)
          .subscribe(filteredData => {
            this.tableData = filteredData;
          });
      });
  }

  private initialDataSubscription(): Subscription {
    this.timetableRequestModel.filterFacultyMember = 1;
    this.timetableRequestModel.filterDay = 'Saturday';
    return this.timetableManagementService
      .searchTimetables(this.pageIndex, this.defaultPgeSize, this.timetableRequestModel).subscribe(value => {
        this.tableData = value;
      });
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach(sub => sub.unsubscribe());
  }

}
