import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CollegeParentComponent} from './component/college-parent/college-parent.component';
import {CollegesListComponent} from './component/colleges-list/colleges-list.component';
import {SaveCollegeComponent} from './component/save-college/save-college.component';
import {SecurityGuard} from '../security/service/security.guard';


const appRoutes: Routes = [
  {
    path: '',
    component: CollegeParentComponent,
    children: [
      {
        path: '',
        redirectTo: 'college-list',
        pathMatch: 'full',
        canActivate: [SecurityGuard],
        data: {
          name: 'college-list'
        }
      },
      {
        path: 'college-list',
        component: CollegesListComponent,
        canActivate: [SecurityGuard],
        data: {
          name: 'college-list'
        }
      },
      {
        path: 'create-college',
        component: SaveCollegeComponent,
        canActivate: [SecurityGuard],
        data: {
          name: 'create-college'
        }
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
