import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BuildingParentComponent} from './component/building-parent/building-parent.component';
import {BuildingsListComponent} from './component/buildings-list/buildings-list.component';
import {SaveBuildingComponent} from './component/save-building/save-building.component';
import {SecurityGuard} from '../security/service/security.guard';


const appRoutes: Routes = [
  {
    path: '',
    component: BuildingParentComponent,
    children: [
      {
        path: '',
        redirectTo: 'building-list',
        pathMatch: 'full',
        canActivate: [SecurityGuard],
        data: {
          name: 'building-list'
        }
      },
      {
        path: 'building-list',
        component: BuildingsListComponent,
        canActivate: [SecurityGuard],
        data: {
          name: 'building-list'
        }
      },
      {
        path: 'create-building',
        component: SaveBuildingComponent,
        canActivate: [SecurityGuard],
        data: {
          name: 'create-building'
        }
      }
    ]
  },
];


@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [RouterModule]
})
export class BuildingManagementRoutingModule {
}
