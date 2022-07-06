import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityGuard } from '../security/service/security.guard';
import { AttendaneDetailsByLectureComponent } from './components/attendane-details-by-lecture/attendane-details-by-lecture.component';
import { AttendaneReportByLectureComponent } from './components/attendane-report-by-lecture/attendane-report-by-lecture.component';
import { EditStatuesComponent } from './components/edit-statues/edit-statues.component';
import { ReportLectureParentComponent } from './components/report-lecture-parent/report-lecture-parent.component';

const routes: Routes = [ {
  path: '',
  component: ReportLectureParentComponent,
  children: [
  {
    path: '',
    redirectTo: 'attendane-report-by-lecture',
    pathMatch: 'full',
    canActivate: [SecurityGuard],
    data: {
      name: 'attendane-report-by-lecture'
    }
  },
  {
    path: 'attendane-report-by-lecture',
    component: AttendaneReportByLectureComponent,
    canActivate: [SecurityGuard],
    data: {
      name: 'attendane-report-by-lecture'
    }
  },
  {
    path: 'attendane-details-by-lecture',
    component: AttendaneDetailsByLectureComponent,
    canActivate: [SecurityGuard],
    data: {
      name: 'attendane-details-by-lecture'
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
export class AttendanceByLectureManagementRoutingModule { }
