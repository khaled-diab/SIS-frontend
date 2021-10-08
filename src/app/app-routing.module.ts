import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './shared/component/not-found/not-found.component';
import {AppComponent} from './app.component';


const appRoutes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'colleges-management',
    loadChildren: () => import('./college-management/college-management.module').then(value => value.CollegeManagementModule)
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
