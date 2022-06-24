import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';

import {TimetableManagementRoutingModule} from './timetable-management-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {TimetableListComponent} from './component/timetable-list/timetable-list.component';
import {TimetableFilterComponent} from './component/timetable-filter/timetable-filter.component';
import {TimetableParentComponent} from './component/timetable-parent/timetable-parent.component';
import {AddTimetableComponent} from './component/timetable-add/add-timetable.component';
import {DeleteTimetableComponent} from './component/timetable-delete/delete-timetable.component';
import {EditSectionTimetableComponent} from './component/section-timetable-edit/edit-section-timetable.component';
import {FacultyMemberTimetablesListComponent} from './component/facultyMember-timetables-list/facultyMember-timetables-list.component';
// tslint:disable-next-line:max-line-length
import {FacultyMemberTimetablesFilterComponent} from './component/facultyMember-timetables-filter/facultyMember-timetables-filter.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {StudentTimetablesListComponent} from './component/student-timetables-list/student-timetables-list.component';
import {StudentTimetablesFilterComponent} from './component/student-timetables-filter/student-timetables-filter.component';
import {EditTimetableComponent} from './component/timetable-edit/edit-timetable.component';

@NgModule({
  declarations: [
    TimetableListComponent,
    AddTimetableComponent,
    EditSectionTimetableComponent,
    TimetableFilterComponent,
    DeleteTimetableComponent,
    TimetableParentComponent,
    FacultyMemberTimetablesListComponent,
    FacultyMemberTimetablesFilterComponent,
    StudentTimetablesListComponent,
    StudentTimetablesFilterComponent,
    EditTimetableComponent
  ],
  exports: [
    TimetableListComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatTooltipModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    TimetableManagementRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
  ]
})
export class TimetableManagementModule {
}
