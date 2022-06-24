import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AcademicProgramListComponent} from './components/academic-program-list/academic-program-list.component';
import {AcademicProgramParentComponent} from './components/academic-program-parent/academic-program-parent.component';

const routes: Routes = [
  {
    path: '',
    component: AcademicProgramParentComponent,
    children: [
      {
        path: '',
        redirectTo: 'academic-program-list',
        pathMatch: 'full'
      },
      {
        path: 'academic-program-list',
        component: AcademicProgramListComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademicProgramRoutingModule {
}
