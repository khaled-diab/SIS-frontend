import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FacultyMemberParentComponent} from './component/facultyMember-parent/facultyMember-parent.component';
import {FacultyMembersListComponent} from './component/facultyMembers-list/facultyMembers-list.component';
import {AddFacultyMemberComponent} from './component/add-facultyMember/add-facultyMember.component';
import {SecurityGuard} from '../security/service/security.guard';


const appRoutes: Routes = [
  {
    path: '',
    component: FacultyMemberParentComponent,
    children: [
      {
        path: '',
        redirectTo: 'facultyMember-list',
        pathMatch: 'full',
        canActivate: [SecurityGuard],
        data: {
          name: 'facultyMember-list'
        }
      },
      {
        path: 'facultyMember-list',
        component: FacultyMembersListComponent,
        canActivate: [SecurityGuard],
        data: {
          name: 'facultyMember-list'
        }
      },
      {
        path: 'facultyMember-add',
        component: AddFacultyMemberComponent,
        canActivate: [SecurityGuard],
        data: {
          name: 'facultyMember-add'
        }
      }
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [RouterModule]
})
export class FacultyMemberManagementRoutingModule {
}
