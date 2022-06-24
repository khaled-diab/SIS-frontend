import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BuildingManagementRoutingModule} from './building-management-routing.module';
import {BuildingsListComponent} from './component/buildings-list/buildings-list.component';
import {SaveBuildingComponent} from './component/save-building/save-building.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {BuildingFilterComponent} from './component/building-filter/building-filter.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {HttpClientModule} from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {BuildingParentComponent} from './component/building-parent/building-parent.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DeleteBuildingDialogComponent} from './component/delete-building-dialog/delete-building-dialog.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {ViewBuildingComponent} from './component/view-building/view-building.component';
import {MatCheckboxModule} from '@angular/material/checkbox';

// @ts-ignore
// @ts-ignore
@NgModule({
  declarations: [
    BuildingsListComponent,
    SaveBuildingComponent,
    BuildingFilterComponent,
    BuildingParentComponent,
    DeleteBuildingDialogComponent,
    ViewBuildingComponent,
  ],
    imports: [
        ModalModule.forRoot(),
        CommonModule,
        HttpClientModule,
        BuildingManagementRoutingModule,
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
        // Ng2SearchPipeModule,
        MatCheckboxModule
    ],
  exports: [
    BuildingsListComponent,
  ],
  entryComponents: [DeleteBuildingDialogComponent]
})
export class BuildingManagementModule {
}
