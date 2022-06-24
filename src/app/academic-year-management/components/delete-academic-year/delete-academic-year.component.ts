import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AcademicYearService } from '../../service/academic-year.service';

@Component({
  selector: 'app-delete-academic-year',
  templateUrl: './delete-academic-year.component.html',
  styleUrls: ['./delete-academic-year.component.css']
})
export class DeleteAcademicYearComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteAcademicYearComponent>,
   private service : AcademicYearService) { }

  ngOnInit(): void {
  }
  close(): void {
    this.dialogRef.close();
  }

  deleteAcademicYear(): void {
    this.service.academicYearDeleteEvent.next(null);
    this.dialogRef.close();
  }
}
