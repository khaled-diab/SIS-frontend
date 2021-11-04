import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './shared/component/not-found/not-found.component';
import {NavMenuComponent} from './nav-menu/nav-menu.component';


const appRoutes: Routes = [
  {
    path: '',
    component: NavMenuComponent,
    children: [
      {
        path: 'colleges-management',
        loadChildren: () => import('./college-management/college-management.module').then(value => value.CollegeManagementModule)
      },
      {
        path: 'students-management',
        loadChildren: () => import('./student-management/student-management.module').then(value => value.StudentManagementModule)
      }
    ]
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
