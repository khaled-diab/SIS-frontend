import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CollegeManagementRoutingModule} from './college-management-routing.module';
import {CollegesListComponent} from './component/colleges-list/colleges-list.component';
import {SaveCollegeComponent} from './component/save-college/save-college.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {CollegeFilterComponent} from './component/college-filter/college-filter.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {HttpClientModule} from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CollegeParentComponent} from './component/college-parent/college-parent.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ModalModule} from 'ngx-bootstrap/modal';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {PaginatorModule} from 'primeng/paginator';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {MessagesModule} from 'primeng/messages';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {RippleModule} from 'primeng/ripple';


@NgModule({
  declarations: [
    CollegesListComponent,
    SaveCollegeComponent,
    CollegeFilterComponent,
    CollegeParentComponent
  ],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    HttpClientModule,
    CollegeManagementRoutingModule,
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
    TableModule,
    PaginatorModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    MessagesModule,
  ],
  entryComponents: [SaveCollegeComponent],
  bootstrap: [CollegesListComponent]
})
export class CollegeManagementModule {
}


