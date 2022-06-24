import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcademicProgramRoutingModule } from './academic-program-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AcademicProgramFilterComponent } from './components/academic-program-filter/academic-program-filter.component';
import { AcademicProgramListComponent } from './components/academic-program-list/academic-program-list.component';
import { AcademicProgramParentComponent } from './components/academic-program-parent/academic-program-parent.component';
import { AcademicProgramPreviewComponent } from './components/academic-program-preview/academic-program-preview.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { ClassroomManagementRoutingModule } from '../classroom-management/classroom-management-routing.module';
import { DeleteAcademicProgramComponent } from './components/delete-academic-program/delete-academic-program.component';
import { CreateAcademicProgramComponent } from './components/create-academic-program/create-academic-program.component';


@NgModule({
  declarations: [
    AcademicProgramFilterComponent,
    AcademicProgramListComponent,
    AcademicProgramParentComponent,
    AcademicProgramPreviewComponent,
    CreateAcademicProgramComponent
  ],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    HttpClientModule,
    AcademicProgramRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatMenuModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCheckboxModule
  ],
  exports: [
    AcademicProgramListComponent,
  ],
  entryComponents: [DeleteAcademicProgramComponent]
})
export class AcademicProgramModule { }
