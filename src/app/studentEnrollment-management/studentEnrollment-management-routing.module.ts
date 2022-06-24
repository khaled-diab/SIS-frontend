import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StudentEnrollmentsListComponent} from './component/studentEnrollments-list/studentEnrollments-list.component';
import {StudentEnrollmentParentComponent} from './component/studentEnrollment-parent/studentEnrollment-parent.component';
import {AddStudentEnrollmentComponent} from './component/studentEnrollment-add/add-student-enrollment.component';
import {SecurityGuard} from '../security/service/security.guard';

const appRoutes: Routes = [
  {
    path: '',
    component: StudentEnrollmentParentComponent,
    children: [
      {
        path: '',
        redirectTo: 'studentEnrollment-list',
        pathMatch: 'full',
        canActivate: [SecurityGuard],
        data: {
          name: 'studentEnrollment-list'
        }
      },
      {
        path: 'studentEnrollment-list',
        component: StudentEnrollmentsListComponent,
        canActivate: [SecurityGuard],
        data: {
          name: 'studentEnrollment-list'
        }
      },
      {
        path: 'studentEnrollment-save',
        component: AddStudentEnrollmentComponent,
        canActivate: [SecurityGuard],
        data: {
          name: 'studentEnrollment-save'
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
export class StudentEnrollmentManagementRoutingModule {
}
