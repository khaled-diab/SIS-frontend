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
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SectionManagementRoutingModule} from './section-management-routing.module';
import {SectionParentComponent} from './component/section-parent/section-parent.component';
import {DeleteSectionModalComponent} from './component/section-delete/delete-section-modal.component';
import {SectionsListComponent} from './component/section-list/sections-list.component';
import {SectionFilterComponent} from './component/section-filter/section-filter.component';
import {AddSectionComponent} from './component/section-add/add-section.component';
import {EditSectionComponent} from './component/section-edit/edit-section.component';
import {SectionStudentsListComponent} from './component/section-students-list/section-students-list.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ModalModule} from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    SectionsListComponent,
    AddSectionComponent,
    EditSectionComponent,
    DeleteSectionModalComponent,
    SectionFilterComponent,
    SectionParentComponent,
    SectionStudentsListComponent
  ],
  exports: [
    SectionsListComponent
  ],
  imports: [
    ModalModule.forRoot(),
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
    SectionManagementRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDialogModule
  ]
})
export class SectionManagementModule {
}
