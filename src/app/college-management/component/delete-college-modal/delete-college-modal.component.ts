import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {CollegeManagementService} from '../../service/college-management.service';

@Component({
  selector: 'app-delete-college-modal',
  templateUrl: './delete-college-modal.component.html',
  styleUrls: ['./delete-college-modal.component.css']
})
export class DeleteCollegeModalComponent implements OnInit {

  constructor(private bsModalRef: BsModalRef, private collegeManagementService: CollegeManagementService) {
  }

  ngOnInit(): void {
  }

  close(): void {
    this.bsModalRef.hide();
  }

  deleteCollege(): void {
    this.collegeManagementService.collegeDeleteEvent.next(null);
    this.bsModalRef.hide();
  }
}
