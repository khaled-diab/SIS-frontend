import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {TimetableManagementService} from '../../service/timetable-management.service';
import {TimetableModel} from '../../../shared/model/timetable-management/timetable-model';
import {FacultyMemberModel} from '../../../shared/model/facultyMember-management/facultyMember-model';


@Component({
   selector: 'app-facultyMember-timetables-list',
   templateUrl: './facultyMember-timetables-list.component.html',
   styleUrls: ['./facultyMember-timetables-list.component.css']
})
export class FacultyMemberTimetablesListComponent implements OnInit, OnDestroy {

   tableData: TimetableModel[];
   displayedColumns = ['No.', 'startTime', 'endTime', 'section', 'lectureTypeId', 'buildingId', 'classroomId'];
   pageIndex = 0;
   defaultPgeSize = 50;
   subscriptionList: Subscription[] = [];
   facultyMember = new FacultyMemberModel();

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
      return this.timetableManagementService.timetableFilterByDayEvent
         .subscribe(value => {
            this.tableData = value;
            // console.log(value);
         });
   }

   ngOnDestroy(): void {
      this.subscriptionList.forEach(sub => sub.unsubscribe());
   }

}
