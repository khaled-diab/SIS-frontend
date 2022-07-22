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
import {MatDialogModule} from '@angular/material/dialog';
import {ModalModule} from 'ngx-bootstrap/modal';
import {ToastModule} from 'primeng/toast';
import {MajorListComponent} from './component/majors-list/major-list.component';
import {MajorParentComponent} from './component/major-parent/major-parent.component';
import {AddMajorComponent} from './component/add-major/add-major.component';
import {FilterMajorComponent} from './component/major-filter/filter-major.omponent';
import {DeleteMajorModalComponent} from './component/delete-major/delete-major-modal.component';
import {EditMajorComponent} from './component/edit-major/edit-major.component';
import {MajorManagementRoutingModule} from './major-management-routing.module';


@NgModule({
   declarations: [
      MajorListComponent,
      FilterMajorComponent,
      MajorParentComponent,
      DeleteMajorModalComponent,
      EditMajorComponent,
      AddMajorComponent
   ],
   exports: [
      MajorListComponent
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
      MajorManagementRoutingModule,
      FormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatSortModule,
      ReactiveFormsModule,
      MatDialogModule,
      ModalModule.forRoot(),
      ToastModule
   ]
})
export class MajorManagementModule {
}
