import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcademicTermRoutingModule } from './academic-term-routing.module';
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
import { AcademicTermService } from './service/academic-term.service';
import { CreateAcademicTermComponent } from './components/create-academic-term/create-academic-term.component';
import { AcademicTermListComponent } from './components/academic-term-list/academic-term-list.component';
import { AcademicTermParentComponent } from './components/academic-term-parent/academic-term-parent.component';
import { AcademicTermFilterComponent } from './components/academic-term-filter/academic-term-filter.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewAcademicTermComponent } from './components/view-academic-term/view-academic-term.component';
import { DeleteAcademicTermComponent } from './components/delete-academic-term/delete-academic-term.component';

@NgModule({
  declarations: [
    AcademicTermListComponent,
    AcademicTermParentComponent,
    CreateAcademicTermComponent,
    AcademicTermFilterComponent,
    ViewAcademicTermComponent,
    DeleteAcademicTermComponent
  ],
  imports: [
    CommonModule,
    AcademicTermRoutingModule,
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
  providers:[AcademicTermService],
  entryComponents:[CreateAcademicTermComponent]
})
export class AcademicTermModule { }
