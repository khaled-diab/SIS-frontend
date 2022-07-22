import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AdminDashboardModel} from '../../shared/model/dashboard/admin-dashboard-model';
import {Constants} from '../../shared/constants';

@Injectable({
   providedIn: 'root'
})
export class DashboardService {

   constructor(private httpClient: HttpClient) {
   }

   public collectAdminDashboardData(): Observable<AdminDashboardModel> {
      return this.httpClient.get<AdminDashboardModel>(Constants.collectAdminDashboardDataUrl);
   }
}
