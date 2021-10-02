import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CollegeManagementRoutingModule} from './college-management-routing.module';
import {CollegesListComponent} from './component/colleges-list/colleges-list.component';
import {CreateCollegeComponent} from './component/create-college/create-college.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';


@NgModule({
  declarations: [
    CollegesListComponent,
    CreateCollegeComponent
  ],
  imports: [
    CommonModule,
    CollegeManagementRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class CollegeManagementModule {
}
