import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateDepartmentComponent} from './components/create-department/create-department.component';
import {DepartmentListComponent} from './components/department-list/department-list.component';
import {DepartmentParentComponent} from './components/department-parent/department-parent.component';
import {SecurityGuard} from '../security/service/security.guard';

const routes: Routes = [
  {
    path: '',
    component: DepartmentParentComponent,
    children: [
      {
        path: '',
        redirectTo: 'department-list',
        pathMatch: 'full',
        canActivate: [SecurityGuard],
        data: {
          name: 'department-list'
        }
      },
      {
        path: 'department-list',
        component: DepartmentListComponent,
        canActivate: [SecurityGuard],
        data: {
          name: 'department-list'
        }
      },
      {
        path: 'create-department',
        component: CreateDepartmentComponent,
        canActivate: [SecurityGuard],
        data: {
          name: 'create-department'
        }
      }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentManagementRoutingModule { }
