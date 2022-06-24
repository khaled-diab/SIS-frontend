import {Component, OnInit} from '@angular/core';
import {BuildingManagementService} from '../../service/building-management.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-building-modal',
  templateUrl: './delete-building-dialog.component.html',
  styleUrls: ['./delete-building-dialog.component.css']
})
export class DeleteBuildingDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteBuildingDialogComponent>,
              private buildingManagementService: BuildingManagementService) {
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  deleteBuilding(): void {
    this.buildingManagementService.buildingDeleteEvent.next(null);
    this.dialogRef.close();
  }
}
