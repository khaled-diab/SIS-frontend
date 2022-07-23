import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {CollegeManagementService} from '../../service/college-management.service';

@Component({
  selector: 'app-delete-college-modal',
  templateUrl: './delete-college-dialog.component.html',
  styleUrls: ['./delete-college-dialog.component.css']
})
export class DeleteCollegeDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteCollegeDialogComponent>,
              private collegeManagementService: CollegeManagementService) {
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  deleteCollege(): void {
    this.collegeManagementService.collegeDeleteEvent.next(null);
    this.dialogRef.close();
  }
}
