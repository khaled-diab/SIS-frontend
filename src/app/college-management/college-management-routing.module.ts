import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CollegeParentComponent} from './component/college-parent/college-parent.component';
import {CollegesListComponent} from './component/colleges-list/colleges-list.component';
import {CreateCollegeComponent} from './component/create-college/create-college.component';


const appRoutes: Routes = [
  {
    path: '',
    component: CollegeParentComponent,
    children: [
      {
        path: '',
        redirectTo: 'college-list',
        pathMatch: 'full'
      },
      {
        path: 'college-list',
        component: CollegesListComponent
      },
      {
        path: 'create-college',
        component: CreateCollegeComponent
      }
    ]
  },
];


@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [RouterModule]
})
export class CollegeManagementRoutingModule {
}
