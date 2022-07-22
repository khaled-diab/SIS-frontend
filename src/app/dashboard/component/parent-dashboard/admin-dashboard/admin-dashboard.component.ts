import {Component, OnInit} from '@angular/core';
import {AdminModel} from '../../../../shared/model/security/admin-model';
import {Constants} from '../../../../shared/constants';
import {DashboardService} from '../../../service/dashboard.service';
import {AdminDashboardModel} from '../../../../shared/model/dashboard/admin-dashboard-model';

@Component({
   selector: 'app-admin-dashboard',
   templateUrl: './admin-dashboard.component.html',
   styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

   loggedInUser: AdminModel;
   adminDashboardModel: AdminDashboardModel;

   constructor(private dashboardService: DashboardService) {
   }

   ngOnInit(): void {
      // @ts-ignore
      this.loggedInUser = JSON.parse(localStorage.getItem(Constants.loggedInUser));
      this.dashboardService.collectAdminDashboardData().subscribe(value => {
         this.adminDashboardModel = value;
      });
   }

}
