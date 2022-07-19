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
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {BsModalService} from 'ngx-bootstrap/modal';
// @ts-ignore
import {FacultyMemberGradeBookListComponent} from './component/facultyMember-gradebook-list/facultyMember-gradeBook-list.component';
// @ts-ignore
import {FacultyMemberGradeBookFilterComponent} from './component/facultyMember-gradebook-filter/facultyMember-gradeBook-filter.component';
// @ts-ignore
import {StudentGradeBookListComponent} from './component/student-gradebook-list/student-gradeBook-list.component';
// @ts-ignore
import {GradeBookManagementRoutingModule} from './gradeBook-management-routing.module';
import {GradeBookParentComponent} from './component/gradeBook-parent/gradeBook-parent.component';

@NgModule({
   declarations: [
      FacultyMemberGradeBookListComponent,
      FacultyMemberGradeBookFilterComponent,
      StudentGradeBookListComponent,
      GradeBookParentComponent
   ],
   exports: [
      FacultyMemberGradeBookListComponent,
      StudentGradeBookListComponent
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
      GradeBookManagementRoutingModule,
      FormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatSortModule,
      ReactiveFormsModule,
      MatButtonToggleModule,
      MatDialogModule
   ],
   providers: [BsModalService]


})
export class GradeBookManagementModule {
}
