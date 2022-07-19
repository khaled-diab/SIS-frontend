import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SecurityGuard} from '../security/service/security.guard';
import {
   FacultyMemberGradeBookListComponent
} from './component/facultyMember-gradebook-list/facultyMember-gradeBook-list.component';
import {StudentGradeBookListComponent} from './component/student-gradebook-list/student-gradeBook-list.component';
// @ts-ignore
import {GradeBookParentComponent} from './component/gradeBook-parent/gradeBook-parent.component';


const appRoutes: Routes = [
   {
      path: '',
      component: GradeBookParentComponent,
      children: [
         {
            path: 'facultyMember-gradeBook-list',
            component: FacultyMemberGradeBookListComponent,
            canActivate: [SecurityGuard],
            data: {
               name: 'facultyMember-gradeBook-list'
            }
         },
         {
            path: 'student-gradeBook-list',
            component: StudentGradeBookListComponent,
            canActivate: [SecurityGuard],
            data: {
               name: 'student-gradeBook-list'
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
export class GradeBookManagementRoutingModule {
}
