import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AcademicYearListComponent} from './components/academic-year-list/academic-year-list.component';
import {AcademicYearParentComponent} from './components/academic-year-parent/academic-year-parent.component';
import {CreateacademicyearComponent} from './components/create-academic-year/create-academic-year.component';
import {SecurityGuard} from '../security/service/security.guard';

const routes: Routes = [
  {
    path: '',
    component: AcademicYearParentComponent,
    children: [
      {
        path: '',
        redirectTo: 'academic-year-list',
        pathMatch: 'full',
        canActivate: [SecurityGuard],
        data: {
          name: 'academic-year-list'
        }
      },
      {
        path: 'academic-year-list',
        component: AcademicYearListComponent,
        canActivate: [SecurityGuard],
        data: {
          name: 'academic-year-list'
        }
      },
      {
        path: 'create-academic-year',
        component: CreateacademicyearComponent,
        canActivate: [SecurityGuard],
        data: {
          name: 'create-academic-year'
        }
      }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademicYearManagementRoutingModule { }
