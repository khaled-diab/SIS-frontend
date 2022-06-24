import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StudentAttendanceListComponent} from './component/student-attendance-list/student-attendance-list.component';
import {StudentAttendanceParentComponent} from './component/student-attendance-parent/student-attendance-parent.component';
import {SecurityGuard} from '../security/service/security.guard';


const appRoutes: Routes = [
  {
    path: '',
    component: StudentAttendanceParentComponent,
    children: [
      {
        path: '',
        redirectTo: 'student-attendance-list',
        pathMatch: 'full',
        canActivate: [SecurityGuard],
        data: {
          name: 'student-attendance-list'
        }
      },
      {
        path: 'student-attendance-list',
        component: StudentAttendanceListComponent,
        canActivate: [SecurityGuard],
        data: {
          name: 'student-attendance-list'
        }
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(appRoutes)
  ]
})
export class StudentAttendanceRoutingModule { }
