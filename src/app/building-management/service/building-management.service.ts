import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Constants} from '../../shared/constants';
import {BuildingRequestModel} from '../../shared/model/building-management/building-request-model';
import {BuildingModel} from '../../shared/model/building-management/building-model';
import {MessageResponse} from '../../shared/model/message-response';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuildingManagementService {

  static buildingsList: BuildingModel[];

  buildingFilterEvent: Subject<any[]> = new Subject<any[]>();
  buildingDeleteEvent: Subject<any> = new Subject<any>();
  buildingSaveEvent: Subject<BuildingModel> = new Subject<BuildingModel>();
  closeSaveEvent: Subject<any> = new Subject();


  constructor(private httpClient: HttpClient) {
  }

  public getBuildings():
    Observable<BuildingModel[]> {
    return this.httpClient.get<BuildingModel[]>(Constants.buildingPageUrl);
  }
  public getColleges():
    Observable<BuildingModel[]> {
    return this.httpClient.get<BuildingModel[]>(environment.baseURL + '/api/colleges/all/');
  }

  public deleteBuilding(id: number): Observable<MessageResponse> {
    return this.httpClient.delete<MessageResponse>(Constants.deleteBuildingUrl + id);
  }

  public saveBuilding(building: BuildingModel): Observable<MessageResponse> {
    return this.httpClient.post<MessageResponse>(Constants.saveBuildingUrl, building);
  }

  constructBuildingRequestObject(buildingRequestModel: BuildingRequestModel): BuildingRequestModel {
    return buildingRequestModel;
  }

  getBuildingsByCollege(collegeId: number): BuildingModel[] {
    return BuildingManagementService.buildingsList.filter(value => {
      return (value.collegeDTO?.id === collegeId);
    });
  }

}

