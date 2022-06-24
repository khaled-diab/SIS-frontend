import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AttendanceByLectureManagementRoutingModule} from './attendance-by-lecture-management-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RouterModule} from '@angular/router';
import {AttendaneDetailsByLectureComponent} from './components/attendane-details-by-lecture/attendane-details-by-lecture.component';
import {AttendaneReportByLectureComponent} from './components/attendane-report-by-lecture/attendane-report-by-lecture.component';
import {
  AttendaneReportByLectureFilterComponent
} from './components/attendane-report-by-lecture-filter/attendane-report-by-lecture-filter.component';
import {ReportLectureParentComponent} from './components/report-lecture-parent/report-lecture-parent.component';
import {AttendaneReportByLectureService} from './service/attendane-report-by-lecture.service';
import {EditStatuesComponent} from './components/edit-statues/edit-statues.component';


@NgModule({
  declarations: [
    AttendaneDetailsByLectureComponent,
    AttendaneReportByLectureComponent,
    AttendaneReportByLectureFilterComponent,
    ReportLectureParentComponent,
    EditStatuesComponent
  ],
  imports: [
    CommonModule,
    AttendanceByLectureManagementRoutingModule,
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

  providers: [AttendaneReportByLectureService],
  entryComponents: [EditStatuesComponent]
})
export class AttendanceByLectureManagementModule {
}
