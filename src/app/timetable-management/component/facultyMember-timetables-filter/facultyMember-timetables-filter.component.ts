import {Component, OnInit} from '@angular/core';
import {TimetableManagementService} from '../../service/timetable-management.service';
import {TimetableRequestModel} from '../../../shared/model/timetable-management/timetable-request-model';

@Component({
  selector: 'app-facultyMember-timetables-filter',
  templateUrl: './facultyMember-timetables-filter.component.html',
  styleUrls: ['./facultyMember-timetables-filter.component.css']
})
export class FacultyMemberTimetablesFilterComponent implements OnInit {

  constructor(private timetableManagementService: TimetableManagementService) {
  }

  timetableRequestModel: TimetableRequestModel = new TimetableRequestModel();

  ngOnInit(): void {
  }

  select(day: string): any {
    console.log(day);
    this.timetableRequestModel.filterDay = day;
    this.timetableRequestModel.filterFacultyMember = 1;
    this.timetableManagementService.timetableFilterEvent.next(this.timetableRequestModel);
  }

}
