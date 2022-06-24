import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    pathMatch: 'full'
  },
  {
    path: 'attendane-report-by-lecture',
    component: AttendaneReportByLectureComponent
  },
  {
    path: 'attendane-details-by-lecture',
    component: AttendaneDetailsByLectureComponent
  },
  {
    path: 'edit-statues',
    component: EditStatuesComponent
  }
 
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceByLectureManagementRoutingModule { }
