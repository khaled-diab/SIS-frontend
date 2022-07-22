import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SecurityGuard} from '../security/service/security.guard';
import {MajorListComponent} from './component/majors-list/major-list.component';
import {MajorParentComponent} from './component/major-parent/major-parent.component';

const appRoutes: Routes = [
   {
      path: '',
      component: MajorParentComponent,
      children: [
         {
            path: '',
            redirectTo: 'major-list',
            pathMatch: 'full',
            canActivate: [SecurityGuard],
            data: {
               name: 'major-list'
            }
         },
         {
            path: 'major-list',
            component: MajorListComponent,
            canActivate: [SecurityGuard],
            data: {
               name: 'major-list'
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
export class MajorManagementRoutingModule {
}
