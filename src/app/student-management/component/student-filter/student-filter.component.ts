import { Component, OnInit } from '@angular/core';
import {StudentFilterModel} from '../../../shared/model/student-management/student-filter-model';
import {StudentManagementService} from "../../service/student-management.service";

@Component({
  selector: 'app-student-filter',
  templateUrl: './student-filter.component.html',
  styleUrls: ['./student-filter.component.css']
})
export class StudentFilterComponent implements OnInit {
  studentFilterModel: StudentFilterModel = new StudentFilterModel();
  constructor(private studentManagementService:StudentManagementService) { }

  ngOnInit(): void {
  }
  applyFilter(): void {
    this.studentManagementService.studentFilterEvent.next(this.studentFilterModel);
  }

  resetFilter(): void {
    this.studentFilterModel = new StudentFilterModel();
    this.studentManagementService.studentFilterEvent.next(this.studentFilterModel);
  }
}
