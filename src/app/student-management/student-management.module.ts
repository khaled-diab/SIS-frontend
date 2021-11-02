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
import {RouterModule, Routes} from '@angular/router';

import {StudentParentComponent} from './component/student-parent/student-parent.component';
import {StudentManagementRoutingModule} from './student-management-routing.module';
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    StudentsListComponent,
    StudentFilterComponent,
    StudentParentComponent
  ],
  exports: [
    StudentsListComponent

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
    StudentManagementRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class StudentManagementModule {
}
