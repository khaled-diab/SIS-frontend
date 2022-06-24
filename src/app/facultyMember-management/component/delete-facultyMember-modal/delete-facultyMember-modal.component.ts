import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FacultyMemberManagementService} from '../../service/facultyMember-management.service';

@Component({
  selector: 'app-delete-facultyMember-modal',
  templateUrl: './delete-facultyMember-modal.component.html',
  styleUrls: ['./delete-facultyMember-modal.component.css']
})
export class DeleteFacultyMemberModalComponent implements OnInit {

  constructor(private bsModalRef: BsModalRef, private facultyMemberManagementService: FacultyMemberManagementService) {
  }
  ngOnInit(): void {
  }


  close(): void {
    this.bsModalRef.hide();
  }

  deleteFacultyMember(): void {
    this.facultyMemberManagementService.facultyMemberDeleteEvent.next(null);
    this.bsModalRef.hide();
  }
}
