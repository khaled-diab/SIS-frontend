import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {TimetableManagementService} from '../../service/timetable-management.service';

@Component({
  selector: 'app-delete-timetable',
  templateUrl: './delete-timetable.component.html',
  styleUrls: ['./delete-timetable.component.css']
})
export class DeleteTimetableComponent implements OnInit {

  constructor(private bsModalRef: BsModalRef, private timetableManagementService: TimetableManagementService) {
  }
  ngOnInit(): void {
  }


  close(): void {
    this.bsModalRef.hide();
  }

  deleteTimetable(): void {
    this.timetableManagementService.timetableDeleteEvent.next(null);
    this.bsModalRef.hide();
  }
}
