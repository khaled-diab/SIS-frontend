import {Component, OnInit} from '@angular/core';
import {ClassroomManagementService} from '../../service/classroom-management.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-classroom-modal',
  templateUrl: './delete-classroom-dialog.component.html',
  styleUrls: ['./delete-classroom-dialog.component.css']
})
export class DeleteClassroomDialogComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private dialogRef: MatDialogRef<DeleteClassroomDialogComponent>, private classroomManagementService: ClassroomManagementService) {
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  deleteClassroom(): void {
    this.classroomManagementService.classroomDeleteEvent.next(null);
    this.dialogRef.close();
  }
}
