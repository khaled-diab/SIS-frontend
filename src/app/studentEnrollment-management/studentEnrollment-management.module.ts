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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {StudentEnrollmentManagementRoutingModule} from './studentEnrollment-management-routing.module';
import {StudentEnrollmentsListComponent} from './component/studentEnrollments-list/studentEnrollments-list.component';
import {AddStudentEnrollmentComponent} from './component/studentEnrollment-add/add-student-enrollment.component';
import {DeleteStudentEnrollmentComponent} from './component/studentEnrollment-delete/delete-studentEnrollment.component';
import {StudentEnrollmentParentComponent} from './component/studentEnrollment-parent/studentEnrollment-parent.component';
import {StudentEnrollmentFilterComponent} from './component/studentEnrollment-filter/studentEnrollment-filter.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {EditStudentEnrollmentComponent} from './component/studentEnrollment-edit/edit-studentEnrollment.component';


@NgModule({
  declarations: [
    StudentEnrollmentsListComponent,
    AddStudentEnrollmentComponent,
    EditStudentEnrollmentComponent,
    DeleteStudentEnrollmentComponent,
    StudentEnrollmentFilterComponent,
    StudentEnrollmentParentComponent
  ],
  exports: [
    StudentEnrollmentsListComponent
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
    StudentEnrollmentManagementRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ]
})
export class StudentEnrollmentManagementModule {
}
