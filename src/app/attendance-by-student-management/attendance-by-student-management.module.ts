import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceByStudentManagementRoutingModule } from './attendance-by-student-management-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { AttendaneReportByStudentService } from './service/attendane-report-by-student.service';
import { EditStatuesComponent } from './componets/edit-statues/edit-statues.component';
import { ReportStudentParentComponent } from './components/report-student-parent/report-student-parent.component';
import { AttendaneDetailsByStudentComponent } from './componets/attendane-details-by-student/attendane-details-by-student.component';
import { AttendaneReportByStudentComponent } from './componets/attendane-report-by-student/attendane-report-by-student.component';
import { AttendaneReportByStudentFilterComponent } from './componets/attendane-report-by-student-filter/attendane-report-by-student-filter.component';


@NgModule({
  declarations: [
    EditStatuesComponent,
    AttendaneDetailsByStudentComponent,
    AttendaneReportByStudentComponent,
    AttendaneReportByStudentFilterComponent,
    ReportStudentParentComponent
  ],
  imports: [
    CommonModule,
    AttendanceByStudentManagementRoutingModule,
    MatCardModule,
    MatTableModule,
    MatTooltipModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  providers: [AttendaneReportByStudentService],
  entryComponents: [EditStatuesComponent]
})
export class AttendanceByStudentManagementModule { }
