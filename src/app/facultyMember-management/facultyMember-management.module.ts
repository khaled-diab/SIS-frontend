import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FacultyMembersListComponent} from './component/facultyMembers-list/facultyMembers-list.component';
import {FacultyMemberFilterComponent} from './component/facultyMember-filter/facultyMember-filter.component';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {FacultyMemberParentComponent} from './component/facultyMember-parent/facultyMember-parent.component';
import {FacultyMemberManagementRoutingModule} from './facultyMember-management-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {DeleteFacultyMemberModalComponent} from './component/delete-facultyMember-modal/delete-facultyMember-modal.component';
import {PreviewFacultyMemberComponent} from './component/preview-facultyMember/preview-facultyMember.component';
import {UpdateFacultyMemberComponent} from './component/update-facultyMember/update-facultyMember.component';
import {AddFacultyMemberComponent} from './component/add-facultyMember/add-facultyMember.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ModalModule} from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    FacultyMembersListComponent,
    FacultyMemberFilterComponent,
    FacultyMemberParentComponent,
    DeleteFacultyMemberModalComponent,
    PreviewFacultyMemberComponent,
    UpdateFacultyMemberComponent,
    AddFacultyMemberComponent
  ],
  exports: [
    FacultyMembersListComponent
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
    FacultyMemberManagementRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    ReactiveFormsModule,
    MatDialogModule,
    ModalModule.forRoot()
  ]
})
export class FacultyMemberManagementModule {
}
