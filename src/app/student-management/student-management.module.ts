import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentsListComponent} from './component/students-list/students-list.component';
import {StudentFilterComponent} from './component/student-filter/student-filter.component';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';

import {StudentParentComponent} from './component/student-parent/student-parent.component';
import {StudentManagementRoutingModule} from './student-management-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {DeleteStudentModalComponent} from './component/delete-student-modal/delete-student-modal.component';
import {UpdateStudentComponent} from './component/update-student/update-student.component';
import {AddStudentComponent} from './component/add-student/add-student.component';

import {MatDialogModule} from '@angular/material/dialog';
import {ModalModule} from 'ngx-bootstrap/modal';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    StudentsListComponent,
    StudentFilterComponent,
    StudentParentComponent,
    DeleteStudentModalComponent,
    UpdateStudentComponent,
    AddStudentComponent,

  ],
  exports: [
    StudentsListComponent

  ],
  imports: [
    ModalModule.forRoot(),
    MatSnackBarModule,
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
    StudentManagementRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class StudentManagementModule {
}
