import {Component, OnInit} from '@angular/core';
import {TimetableManagementService} from '../../service/timetable-management.service';
import {TimetableRequestModel} from '../../../shared/model/timetable-management/timetable-request-model';

@Component({
  selector: 'app-student-timetables-filter',
  templateUrl: './student-timetables-filter.component.html',
  styleUrls: ['./student-timetables-filter.component.css']
})
export class StudentTimetablesFilterComponent implements OnInit {

  constructor(private timetableManagementService: TimetableManagementService) {
  }

  timetableRequestModel: TimetableRequestModel = new TimetableRequestModel();

  ngOnInit(): void {
  }

  select(day: string): any {
    console.log(day);
    this.timetableRequestModel.filterDay = day;
    this.timetableManagementService.timetableFilterEvent.next(this.timetableRequestModel);
  }

}
