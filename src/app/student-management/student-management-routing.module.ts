import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StudentParentComponent} from './component/student-parent/student-parent.component';
import {StudentsListComponent} from './component/students-list/students-list.component';
import {AddStudentComponent} from './component/add-student/add-student.component';
import {SecurityGuard} from '../security/service/security.guard';
import {UpdateStudentComponent} from './component/update-student/update-student.component';
import {StudentModel} from '../shared/model/student-management/student-model';


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
      },
       // {
       //    path: 'student-update/:st/:sel',
       //    component: UpdateStudentComponent,
       //    canActivate: [SecurityGuard],
       //    data: {
       //       name: 'student-update',
       //    }
       // }

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
