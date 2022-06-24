import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {StudentEnrollmentManagementService} from '../../service/studentEnrollment-management.service';

@Component({
  selector: 'app-delete-studentEnrollment-modal',
  templateUrl: './delete-studentEnrollment.component.html',
  styleUrls: ['./delete-studentEnrollment.component.css']
})
export class DeleteStudentEnrollmentComponent implements OnInit {

  constructor(private bsModalRef: BsModalRef, private studentEnrollmentManagementService: StudentEnrollmentManagementService) {
  }
  ngOnInit(): void {
  }


  close(): void {
    this.bsModalRef.hide();
  }

  deleteStudentEnrollment(): void {
    this.studentEnrollmentManagementService.studentEnrollmentDeleteEvent.next(null);
    this.bsModalRef.hide();
  }
}
