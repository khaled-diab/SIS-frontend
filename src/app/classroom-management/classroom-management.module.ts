import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClassroomManagementRoutingModule} from './classroom-management-routing.module';
import {ClassroomsListComponent} from './component/classrooms-list/classrooms-list.component';
import {SaveClassroomComponent} from './component/save-classroom/save-classroom.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {ClassroomFilterComponent} from './component/classroom-filter/classroom-filter.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {HttpClientModule} from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ClassroomParentComponent} from './component/classroom-parent/classroom-parent.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DeleteClassroomDialogComponent} from './component/delete-classroom-dialog/delete-classroom-dialog.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {ViewClassroomComponent} from './component/view-classroom/view-classroom.component';
import {MatCheckboxModule} from '@angular/material/checkbox';

// @ts-ignore
// @ts-ignore
@NgModule({
  declarations: [
    ClassroomsListComponent,
    SaveClassroomComponent,
    ClassroomFilterComponent,
    ClassroomParentComponent,
    DeleteClassroomDialogComponent,
    ViewClassroomComponent,
  ],
    imports: [
        ModalModule.forRoot(),
        CommonModule,
        HttpClientModule,
        ClassroomManagementRoutingModule,
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
    ClassroomsListComponent,
  ],
  entryComponents: [DeleteClassroomDialogComponent]
})
export class ClassroomManagementModule {
}
