import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CourseManagementRoutingModule} from './course-management-routing.module';
import {CoursesListComponent} from './component/course-list/courses-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {CourseFilterComponent} from './component/course-filter/course-filter.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {HttpClientModule} from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CourseParentComponent} from './component/course-parent/course-parent.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ModalModule} from 'ngx-bootstrap/modal';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {SaveCourseComponent} from './component/save-course/save-course.component';
import {DeleteCourseDialogComponent} from './component/delete-courses-dialog/delete-course-dialog.component';
import {PreviewCourseComponent} from './component/preview-course/preview-course.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    CoursesListComponent,
    CourseFilterComponent,
    CourseParentComponent,
    SaveCourseComponent,
    DeleteCourseDialogComponent,
    PreviewCourseComponent
  ],
   exports: [
      CoursesListComponent
   ],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    HttpClientModule,
    CourseManagementRoutingModule,
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
    MatDialogModule
  ],
})
export class CourseManagementModule {
}
