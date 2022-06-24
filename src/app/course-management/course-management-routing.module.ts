import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CourseParentComponent} from './component/course-parent/course-parent.component';
import {CoursesListComponent} from './component/course-list/courses-list.component';
import {SecurityGuard} from '../security/service/security.guard';


const appRoutes: Routes = [
  {
    path: '',
    component: CourseParentComponent,
    children: [
      {
        path: '',
        redirectTo: 'course-list',
        pathMatch: 'full',
        canActivate: [SecurityGuard],
        data: {
          name: 'course-list'
        }
      },
      {
        path: 'course-list',
        component: CoursesListComponent,
        canActivate: [SecurityGuard],
        data: {
          name: 'course-list'
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
export class CourseManagementRoutingModule {
}
