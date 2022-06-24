import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SectionParentComponent} from './component/section-parent/section-parent.component';
import {SectionsListComponent} from './component/section-list/sections-list.component';
import {AddSectionComponent} from './component/section-add/add-section.component';
import {EditSectionComponent} from './component/section-edit/edit-section.component';
import {SectionStudentsListComponent} from './component/section-students-list/section-students-list.component';
import {SecurityGuard} from '../security/service/security.guard';

const appRoutes: Routes = [
  {
    path: '',
    component: SectionParentComponent,
    children: [
      {
        path: '',
        redirectTo: 'section-list',
        pathMatch: 'full',
        canActivate: [SecurityGuard],
        data: {
          name: 'section-list'
        }
      },
      {
        path: 'section-list',
        component: SectionsListComponent,
        canActivate: [SecurityGuard],
        data: {
          name: 'section-list'
        }
      },
      {
        path: 'section-add',
        component: AddSectionComponent,
        canActivate: [SecurityGuard],
        data: {
          name: 'section-add'
        }
      },
      {
        path: 'section-edit',
        component: EditSectionComponent,
        canActivate: [SecurityGuard],
        data: {
          name: 'section-edit'
        }
      },
      {
        path: 'section-students',
        component: SectionStudentsListComponent,
        canActivate: [SecurityGuard],
        data: {
          name: 'section-students'
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
export class SectionManagementRoutingModule {
}
