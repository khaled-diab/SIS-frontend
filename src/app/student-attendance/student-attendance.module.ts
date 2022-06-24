import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAttendanceComponent } from './component/add-attendance/add-attendance.component';
import { StudentAttendanceListComponent } from './component/student-attendance-list/student-attendance-list.component';
import { StudentAttendanceParentComponent } from './component/student-attendance-parent/student-attendance-parent.component';
import {StudentAttendanceRoutingModule} from './student-attendance-routing.module';
import {RouterModule} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AttendanceCodeComponent } from './component/attendance-code/attendance-code.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatRadioModule} from '@angular/material/radio';



@NgModule({
  declarations: [
    AddAttendanceComponent,
    StudentAttendanceListComponent,
    StudentAttendanceParentComponent,
    AttendanceCodeComponent
  ],
  imports: [
    CommonModule,
    StudentAttendanceRoutingModule,
    RouterModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatTooltipModule,
    MatButtonModule,
    FormsModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatRadioModule,

  ]
})
export class StudentAttendanceModule { }
