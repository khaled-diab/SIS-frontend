import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityGuard } from '../security/service/security.guard';
import { AttendaneDetailsByStudentComponent } from './componets/attendane-details-by-student/attendane-details-by-student.component';
import { AttendaneReportByStudentComponent } from './componets/attendane-report-by-student/attendane-report-by-student.component';
import { EditStatuesComponent } from './componets/edit-statues/edit-statues.component';
import { ReportStudentParentComponent } from './componets/report-student-parent/report-student-parent.component';

const routes: Routes = [ {
  path: '',
  component: ReportStudentParentComponent,
  children: [
  {
    path: '',
    redirectTo: 'attendane-report-by-student',
    pathMatch: 'full',
    canActivate: [SecurityGuard],
    data: {
      name: 'attendane-report-by-student'
    }
  },
  {
    path: 'attendane-report-by-student',
    component: AttendaneReportByStudentComponent,
    canActivate: [SecurityGuard],
    data: {
      name: 'attendane-report-by-student'
    }
  },
  {
    path: 'attendane-details-by-student/:sectionId/:studentId/:studentName/:courseName/:sectionName',
    component: AttendaneDetailsByStudentComponent,
    canActivate: [SecurityGuard],
    data: {
      name: 'attendane-details-by-student'
    }
  },
  {
    path: 'edit-statues',
    component: EditStatuesComponent,
    canActivate: [SecurityGuard],
    data: {
      name: 'edit-statues'
    }
  }
 
]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceByStudentManagementRoutingModule { }
