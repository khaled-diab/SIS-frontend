import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageRequest} from '../../../shared/model/page-request';
import {Subscription} from 'rxjs';
import {TimetableManagementService} from '../../service/timetable-management.service';
import {TimetableModel} from '../../../shared/model/timetable-management/timetable-model';
import {TimetableRequestModel} from '../../../shared/model/timetable-management/timetable-request-model';
import {Constants} from '../../../shared/constants';
import {FacultyMemberModel} from '../../../shared/model/facultyMember-management/facultyMember-model';
import {FacultyMemberManagementService} from '../../../facultyMember-management/service/facultyMember-management.service';

@Component({
   selector: 'app-facultyMember-timetables-list',
   templateUrl: './facultyMember-timetables-list.component.html',
   styleUrls: ['./facultyMember-timetables-list.component.css']
})
export class FacultyMemberTimetablesListComponent implements OnInit, OnDestroy {

   tableData: PageRequest<TimetableModel>;
   timetableRequestModel: TimetableRequestModel = new TimetableRequestModel();
   displayedColumns = ['No.', 'startTime', 'endTime', 'section', 'lectureTypeId', 'buildingId', 'classroomId'];
   pageIndex = 0;
   defaultPgeSize = 50;
   subscriptionList: Subscription[] = [];

   loggedIn: any;
   facultyMember = new FacultyMemberModel();
   constructor(private timetableManagementService: TimetableManagementService,
               private facultyMemberManagementService: FacultyMemberManagementService) {
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
      this.timetableRequestModel.filterDay = 'Saturday';
      // @ts-ignore
      this.loggedIn = JSON.parse(localStorage.getItem(Constants.loggedInUser));
      console.log(this.loggedIn.user.id);
      this.facultyMemberManagementService.getFacultyMembersByUserId(this.loggedIn.user.id).subscribe(value => {
         this.facultyMember = value;
      });
      this.timetableRequestModel.filterFacultyMember = this.facultyMember.id;
      return this.timetableManagementService
         .searchTimetables(this.pageIndex, this.defaultPgeSize, this.timetableRequestModel).subscribe(value => {
            this.tableData = value;
         });
   }

   ngOnDestroy(): void {
      this.subscriptionList.forEach(sub => sub.unsubscribe());
   }

}
