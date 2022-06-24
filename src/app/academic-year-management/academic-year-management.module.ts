import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcademicYearManagementRoutingModule } from './academic-year-management-routing.module';
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
import { AcademicYearParentComponent } from './components/academic-year-parent/academic-year-parent.component';
import { AcademicYearListComponent } from './components/academic-year-list/academic-year-list.component';
import { CreateacademicyearComponent } from './components/create-academic-year/create-academic-year.component';
import { AcademicYearService } from './service/academic-year.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { AcademicYearFilterComponent } from './components/academic-year-filter/academic-year-filter.component';
import { AcademicYearPerviewComponent } from './components/academic-year-perview/academic-year-perview.component';
import { DeleteAcademicYearComponent } from './components/delete-academic-year/delete-academic-year.component';


@NgModule({
  declarations: [
    AcademicYearParentComponent,
    CreateacademicyearComponent,
    AcademicYearListComponent,
    AcademicYearFilterComponent,
    AcademicYearPerviewComponent,
    DeleteAcademicYearComponent
  ],

  imports: [
    CommonModule,
    AcademicYearManagementRoutingModule,      
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
  providers:[AcademicYearService,{ provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }],
  entryComponents:[CreateacademicyearComponent,AcademicYearPerviewComponent]
})

export class AcademicYearManagementModule { }
