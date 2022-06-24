import {Component, Inject, OnInit} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CourseManagementService} from '../../service/course-management.service';

@Component({
  selector: 'app-delete-college-modal',
  templateUrl: './delete-course-dialog.component.html',
  styleUrls: ['./delete-course-dialog.component.css']
})
export class DeleteCourseDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteCourseDialogComponent>,
              private courseManagementService: CourseManagementService,
              @Inject(MAT_DIALOG_DATA) public data: number
  ) {
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  deleteCourse(): void {
    this.courseManagementService.courseDeleteEvent.next(null);
    this.dialogRef.close();
  }
}
