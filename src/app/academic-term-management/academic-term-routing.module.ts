import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AcademicTermListComponent} from './components/academic-term-list/academic-term-list.component';
import {AcademicTermParentComponent} from './components/academic-term-parent/academic-term-parent.component';
import {CreateAcademicTermComponent} from './components/create-academic-term/create-academic-term.component';
import {SecurityGuard} from '../security/service/security.guard';

const routes: Routes = [
  {
    path: '',
    component: AcademicTermParentComponent,
    children: [
      {
        path: '',
        redirectTo: 'academic-term-list',
        pathMatch: 'full',
        canActivate: [SecurityGuard],
        data: {
          name: 'academic-term-list'
        }
      },
      {
        path: 'academic-term-list',
        component: AcademicTermListComponent,
        canActivate: [SecurityGuard],
        data: {
          name: 'academic-term-list'
        }
      },
      {
        path: 'create-academic-term',
        component: CreateAcademicTermComponent,
        canActivate: [SecurityGuard],
        data: {
          name: 'create-academic-term'
        }
      }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademicTermRoutingModule { }
