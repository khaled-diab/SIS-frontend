import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {PageRequest} from '../../shared/model/page-request';
import {Constants} from '../../shared/constants';
import {Sort} from '@angular/material/sort';
import {MessageResponse} from '../../shared/model/message-response';
import {SectionModel} from '../../shared/model/section-management/section-model';
import {SectionRequestModel} from '../../shared/model/section-management/section-request-model';
import {SectionTableRecordsModel} from '../../shared/model/section-management/sectionTableRecords-model';

@Injectable({
   providedIn: 'root'
})
export class SectionManagementService {

   static sectionsList: SectionModel[];
   sectionFilterEvent: Subject<SectionRequestModel> = new Subject<SectionRequestModel>();
   sectionDeleteEvent: Subject<any> = new Subject<any>();
   sectionCloseUpdateEvent: Subject<any> = new Subject<any>();

   constructor(private httpClient: HttpClient) {
   }

   public searchSections(
      pageNumber: number, pageSize: number, sectionRequestModel: SectionRequestModel):
      Observable<PageRequest<SectionModel>> {
      console.log(pageNumber, pageSize);
      console.log(sectionRequestModel);
      return this.httpClient.post<PageRequest<SectionModel>>
      (Constants.searchSectionUrl + (pageNumber + 1) + '/' + pageSize, sectionRequestModel);
   }

   public filterSections(
      pageNumber: number, pageSize: number, sectionRequestModel: SectionRequestModel):
      Observable<PageRequest<SectionTableRecordsModel>> {
      console.log(pageNumber, pageSize);
      console.log(sectionRequestModel);
      return this.httpClient.post<PageRequest<SectionTableRecordsModel>>
      (Constants.filterSectionUrl + (pageNumber + 1) + '/' + pageSize, sectionRequestModel);
   }

   constructSectionRequestObject(
      sort: Sort,
      sectionRequestModel: SectionRequestModel): SectionRequestModel {
      if (sort.direction === 'asc') {
         sectionRequestModel.sortDirection = Constants.ASC;
      } else if (sort.direction === 'desc') {
         sectionRequestModel.sortDirection = Constants.DESC;
      } else {
         sectionRequestModel.sortDirection = null;
      }
      sectionRequestModel.sortBy = sort.active;
      return sectionRequestModel;
   }

   save(sectionModel: SectionModel): Observable<SectionModel> {
      console.log(sectionModel);
      return this.httpClient.post<SectionModel>(Constants.saveSectionUrl, sectionModel);
   }

   update(sectionModel: SectionModel): Observable<SectionModel> {
      console.log(sectionModel);
      return this.httpClient.post<SectionModel>(Constants.updateSectionUrl, sectionModel);
   }

   deleteSection(id: number): Observable<MessageResponse> {
      return this.httpClient.get<MessageResponse>(Constants.deleteSectionUrl + id);
   }

   getSectionById(id: number): Observable<MessageResponse> {
      return this.httpClient.get<MessageResponse>(Constants.SectionByIdUrl + id);
   }
   getSection(id: number): Observable<SectionModel> {
      return this.httpClient.get<SectionModel>(Constants.SectionByIdUrl + id);
   }

   getSectionsByCourse(courseId: number): Observable<SectionModel[]> {
      return this.httpClient.get<SectionModel[]>(Constants.sectionsByCourseIdUrl + courseId);
   }
}

