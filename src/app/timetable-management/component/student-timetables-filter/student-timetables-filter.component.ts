import {Component, OnInit} from '@angular/core';
import {TimetableManagementService} from '../../service/timetable-management.service';
import {Constants} from '../../../shared/constants';
import {TimetableTableRecordsModel} from '../../../shared/model/timetable-management/timetableTableRecords-model';

@Component({
   selector: 'app-student-timetables-filter',
   templateUrl: './student-timetables-filter.component.html',
   styleUrls: ['./student-timetables-filter.component.css']
})
export class StudentTimetablesFilterComponent implements OnInit {

   student: any;
   timetables: TimetableTableRecordsModel[] = [];
   set = new Set<string>();
   map = new Map<string, number>([
      ['Saturday', 1],
      ['Sunday', 2],
      ['Monday', 3],
      ['Tuesday', 4],
      ['Wednesday', 5],
      ['Thursday', 6],
      ['Friday', 7]
   ]);

   flags = new Map<string, boolean>([
      ['Saturday', false],
      ['Sunday', false],
      ['Monday', false],
      ['Tuesday', false],
      ['Wednesday', false],
      ['Thursday', false],
      ['Friday', false]
   ]);
   days: any;
   constructor(private timetableManagementService: TimetableManagementService) {
   }

   ngOnInit(): void {
      // @ts-ignore
      this.student = JSON.parse(localStorage.getItem(Constants.loggedInUser));
      console.log(this.student.user);
      this.timetableManagementService
         .getStudentTimetables(this.student.id).subscribe(value => {
         console.log(this.student.user.id);
         this.timetables = value;
         this.timetables.forEach(value2 => {
            this.set.add(value2.day);
         });
         this.days = Array.from(this.set.values());
         this.days = this.days.sort((a: string, b: string) => {
            // @ts-ignore
            return (this.map.get(a) < this.map.get(b)) ? -1 : 1;
         });
      });
   }

   select(daySelect: string): any {
      this.flags = new Map<string, boolean>([
         ['Saturday', false],
         ['Sunday', false],
         ['Monday', false],
         ['Tuesday', false],
         ['Wednesday', false],
         ['Thursday', false],
         ['Friday', false]
      ]);
      this.flags.set(daySelect, !this.flags.get(daySelect));
      // console.log(daySelect);
      const times: TimetableTableRecordsModel[] = this.timetables.filter(timetable => {
         return timetable.day === daySelect;
      });
      this.timetableManagementService.timetableFilterByDayEvent.next(times);
      // console.log(times);
   }

}
