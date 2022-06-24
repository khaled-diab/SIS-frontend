import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {DepartmentService} from '../../service/department.service';

@Component({
  selector: 'app-delete-department',
  templateUrl: './delete-department.component.html',
  styleUrls: ['./delete-department.component.css']
})
export class DeleteDepartmentComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteDepartmentComponent>,
              private departmentService: DepartmentService) {
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  deleteClassroom(): void {
    this.departmentService.departmentDeleteEvent.next(null);
    this.dialogRef.close();
  }
}
