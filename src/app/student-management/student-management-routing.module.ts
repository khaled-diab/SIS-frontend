import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StudentParentComponent} from './component/student-parent/student-parent.component';
import {StudentsListComponent} from './component/students-list/students-list.component';
import {AddStudentComponent} from './component/add-student/add-student.component';
import {SecurityGuard} from '../security/service/security.guard';


const appRoutes: Routes = [
  {
    path: '',
    component: StudentParentComponent,
    children: [
      {
        path: '',
        redirectTo: 'student-list',
        pathMatch: 'full',
        canActivate: [SecurityGuard],
        data: {
          name: 'student-list'
        }
      },
      {
        path: 'student-list',
        component: StudentsListComponent,
        canActivate: [SecurityGuard],
        data: {
          name: 'student-list'
        }
      },
      {
        path: 'student-add',
        component: AddStudentComponent,
        canActivate: [SecurityGuard],
        data: {
          name: 'student-add'
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
export class StudentManagementRoutingModule {
}
