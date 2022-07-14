import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {TimetableManagementService} from '../../service/timetable-management.service';
import {TimetableModel} from '../../../shared/model/timetable-management/timetable-model';
import {TimetableRequestModel} from '../../../shared/model/timetable-management/timetable-request-model';
import {SelectionModel} from '@angular/cdk/collections';
import {Constants} from '../../../shared/constants';
import {UserModel} from '../../../shared/model/security/user-model';

@Component({
   selector: 'app-student-timetables-list',
   templateUrl: './student-timetables-list.component.html',
   styleUrls: ['./student-timetables-list.component.css']
})
export class StudentTimetablesListComponent implements OnInit, OnDestroy {

   tableData: TimetableModel[] = [];
   selection = new SelectionModel<TimetableModel>(true, []);
   timetableRequestModel: TimetableRequestModel = new TimetableRequestModel();
   displayedColumns = ['No.', 'startTime', 'endTime', 'sectionId', 'facultyMemberId', 'lectureTypeId',
      'buildingId', 'classroomId'];
   subscriptionList: Subscription[] = [];
   loggedIn: any;

   constructor(private timetableManagementService: TimetableManagementService) {
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

   private initialDataSubscription(): Subscription {
      // @ts-ignore
      this.loggedIn = JSON.parse(sessionStorage.getItem(Constants.loggedInUser));
      console.log(this.loggedIn.user);
      return this.timetableManagementService
         .getStudentTimetables(this.loggedIn.user.id).subscribe(value => {
            console.log(this.loggedIn.user.id);
            this.tableData = value;
            for (const timetable of this.tableData) {
               if (timetable.day === 'Saturday') {
                  this.selection.select(timetable);
               }
            }
            console.log(this.selection.selected);
         });
   }

   private filterEventSubscription(): Subscription {
      return this.timetableManagementService.timetableFilterEvent.subscribe(value => {
         console.log(value.filterDay);
         this.selection.clear();
         for (const timetable of this.tableData) {
            if (timetable.day === value.filterDay) {
               this.selection.select(timetable);
            }
         }
         console.log(this.selection.selected);
      });
   }

   ngOnDestroy(): void {
      this.subscriptionList.forEach(sub => sub.unsubscribe());
   }
}
