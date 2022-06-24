import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClassroomParentComponent} from './component/classroom-parent/classroom-parent.component';
import {ClassroomsListComponent} from './component/classrooms-list/classrooms-list.component';
import {SaveClassroomComponent} from './component/save-classroom/save-classroom.component';
import {SecurityGuard} from '../security/service/security.guard';


const appRoutes: Routes = [
  {
    path: '',
    component: ClassroomParentComponent,
    children: [
      {
        path: '',
        redirectTo: 'classroom-list',
        pathMatch: 'full',
        canActivate: [SecurityGuard],
        data: {
          name: 'classroom-list'
        }
      },
      {
        path: 'classroom-list',
        component: ClassroomsListComponent,
        canActivate: [SecurityGuard],
        data: {
          name: 'classroom-list'
        }
      },
      {
        path: 'create-classroom',
        component: SaveClassroomComponent,
        canActivate: [SecurityGuard],
        data: {
          name: 'create-classroom'
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
export class ClassroomManagementRoutingModule {
}
