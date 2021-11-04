import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StudentParentComponent} from './component/student-parent/student-parent.component';
import {StudentsListComponent} from './component/students-list/students-list.component';


const appRoutes: Routes = [
  {
    path: '',
    component: StudentParentComponent,
    children: [
      {
        path: '',
        redirectTo: 'student-list',
        pathMatch: 'full'
      },
      {
        path: 'student-list',
        component: StudentsListComponent
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
