import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentManagementRoutingModule } from './department-management-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
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
import { DepartmentService } from './service/department.service';
import { CreateDepartmentComponent } from './components/create-department/create-department.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { DepartmentParentComponent } from './components/department-parent/department-parent.component';
import { DepartmentFilterComponent } from './components/department-filter/department-filter.component';
import { ViewDepartmentComponent } from './components/view-department/view-department.component';
import {DeleteDepartmentComponent} from './components/delete-department/delete-department.component';
@NgModule({
  declarations: [
    DepartmentListComponent,
    CreateDepartmentComponent,
    DepartmentParentComponent,
    DepartmentFilterComponent,
    ViewDepartmentComponent,
    DeleteDepartmentComponent
  ],
  imports: [
    CommonModule,
    DepartmentManagementRoutingModule,
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
  providers : [DepartmentService],
  entryComponents:[CreateDepartmentComponent,]
})
export class DepartmentManagementModule { }
