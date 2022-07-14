import {Component, OnInit} from '@angular/core';
import {TimetableManagementService} from '../../service/timetable-management.service';
import {TimetableRequestModel} from '../../../shared/model/timetable-management/timetable-request-model';
import {Constants} from '../../../shared/constants';
import {FacultyMemberModel} from '../../../shared/model/facultyMember-management/facultyMember-model';
import {FacultyMemberManagementService} from '../../../facultyMember-management/service/facultyMember-management.service';

@Component({
   selector: 'app-facultyMember-timetables-filter',
   templateUrl: './facultyMember-timetables-filter.component.html',
   styleUrls: ['./facultyMember-timetables-filter.component.css']
})
export class FacultyMemberTimetablesFilterComponent implements OnInit {

   loggedIn: any;
   facultyMember = new FacultyMemberModel();
   constructor(private timetableManagementService: TimetableManagementService,
               private facultyMemberManagementService: FacultyMemberManagementService) {
   }

   timetableRequestModel: TimetableRequestModel = new TimetableRequestModel();

   ngOnInit(): void {
   }

   select(day: string): any {
      console.log(day);
      this.timetableRequestModel.filterDay = day;
      // @ts-ignore
      this.loggedIn = JSON.parse(localStorage.getItem(Constants.loggedInUser));
      console.log(this.loggedIn.user.id);
      this.facultyMemberManagementService.getFacultyMembersByUserId(this.loggedIn.user.id).subscribe(value => {
         this.facultyMember = value;
      });
      this.timetableRequestModel.filterFacultyMember = this.facultyMember.id;
      this.timetableManagementService.timetableFilterEvent.next(this.timetableRequestModel);
   }

}
