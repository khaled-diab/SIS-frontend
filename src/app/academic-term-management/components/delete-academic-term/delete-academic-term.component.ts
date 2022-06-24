import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AcademicTermService} from '../../service/academic-term.service';

@Component({
  selector: 'app-delete-academic-term',
  templateUrl: './delete-academic-term.component.html',
  styleUrls: ['./delete-academic-term.component.css']
})
export class DeleteAcademicTermComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteAcademicTermComponent>,
              private academicTermService: AcademicTermService) {
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  deleteAcademicTerm(): void {
    this.academicTermService.academicTermDeleteEvent.next(null);
    this.dialogRef.close();
  }
}
