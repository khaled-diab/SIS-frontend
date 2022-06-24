import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TimetableParentComponent} from './component/timetable-parent/timetable-parent.component';
import {TimetableListComponent} from './component/timetable-list/timetable-list.component';
import {AddTimetableComponent} from './component/timetable-add/add-timetable.component';
import {FacultyMemberTimetablesListComponent} from './component/facultyMember-timetables-list/facultyMember-timetables-list.component';
import {StudentTimetablesListComponent} from './component/student-timetables-list/student-timetables-list.component';
import {SecurityGuard} from '../security/service/security.guard';


const appRoutes: Routes = [
  {
    path: '',
    component: TimetableParentComponent,
    children: [
      {
        path: '',
        redirectTo: 'timetable-list',
        pathMatch: 'full',
        canActivate: [SecurityGuard],
        data: {
          name: 'timetable-list'
        }
      },
      {
        path: 'timetable-list',
        component: TimetableListComponent,
        canActivate: [SecurityGuard],
        data: {
          name: 'timetable-list'
        }
      },
      {
        path: 'add-timetable',
        component: AddTimetableComponent,
        canActivate: [SecurityGuard],
        data: {
          name: 'add-timetable'
        }
      },
      {
        path: 'facultyMember-timetables-list',
        component: FacultyMemberTimetablesListComponent,
        canActivate: [SecurityGuard],
        data: {
          name: 'facultyMember-timetables-list'
        }
      },
      {
        path: 'student-timetables-list',
        component: StudentTimetablesListComponent,
        canActivate: [SecurityGuard],
        data: {
          name: 'student-timetables-list'
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
export class TimetableManagementRoutingModule {
}
