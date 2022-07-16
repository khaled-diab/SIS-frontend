import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {TimetableManagementService} from '../../service/timetable-management.service';
import {TimetableTableRecordsModel} from '../../../shared/model/timetable-management/timetableTableRecords-model';

@Component({
   selector: 'app-student-timetables-list',
   templateUrl: './student-timetables-list.component.html',
   styleUrls: ['./student-timetables-list.component.css']
})
export class StudentTimetablesListComponent implements OnInit, OnDestroy {

   tableData: TimetableTableRecordsModel[] = [];
   displayedColumns = ['No.', 'startTime', 'endTime', 'sectionId', 'facultyMemberId', 'lectureTypeId',
      'buildingId', 'classroomId'];
   subscriptionList: Subscription[] = [];

   constructor(private timetableManagementService: TimetableManagementService) {
   }

   ngOnInit(): void {
      this.subscriptionList = this.subscriptions();
   }

   private subscriptions(): Subscription[] {
      const subscriptions = [];
      subscriptions.push(this.filterEventSubscription());
      return subscriptions;
   }

   private filterEventSubscription(): Subscription {
      return this.timetableManagementService.timetableFilterByDayEvent.subscribe(value => {
         this.tableData = value;
      });
   }

   ngOnDestroy(): void {
      this.subscriptionList.forEach(sub => sub.unsubscribe());
   }
}
