import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Constants} from '../../shared/constants';
import {CourseRequestModel} from '../../shared/model/course-management/course-request-model';
import {PageRequest} from '../../shared/model/page-request';
import {Sort} from '@angular/material/sort';
import {MessageResponse} from '../../shared/model/message-response';
import {CourseModel} from '../../shared/model/course-management/course-model';
import {PageQueryUtil} from '../../shared/model/page-query';

@Injectable({
  providedIn: 'root'
})
export class CourseManagementService {

  static coursesList: CourseModel[];
  courseFilterEvent: Subject<CourseRequestModel> = new Subject<CourseRequestModel>();
  courseSaveEvent: Subject<CourseModel> = new Subject<CourseModel>();
  courseSaveCloseEvent: Subject<any> = new Subject<any>();
  courseDeleteEvent: Subject<any> = new Subject<any>();

  constructor(private httpClient: HttpClient) {
  }

  public getCoursePage(pageNumber: number, pageSize: number, courseRequestModel: CourseRequestModel):
    Observable<PageRequest<CourseModel>> {
    return this.httpClient.post<PageRequest<CourseModel>>(Constants.coursePageUrl + pageNumber + '/' + pageSize, courseRequestModel);
  }

  public getAllCourses(pageNumber: number, pageSize: number):
    Observable<PageRequest<CourseModel>> {
    const pageQuery = new PageQueryUtil(pageNumber + 1, pageSize);
    return this.httpClient.post<PageRequest<CourseModel>>(Constants.coursePageUrl, pageQuery);
  }

  public saveCourse(course: CourseModel): Observable<MessageResponse> {
    return this.httpClient.post<MessageResponse>(Constants.saveCourseUrl, course);
  }

  constructCourseRequestObject(sort: Sort, courseRequestModel: CourseRequestModel): CourseRequestModel {
    if (sort.direction === 'asc') {
      courseRequestModel.sortDirection = Constants.ASC;
    } else if (sort.direction === 'desc') {
      courseRequestModel.sortDirection = Constants.DESC;
    } else {
      courseRequestModel.sortDirection = null;
    }
    courseRequestModel.sortBy = sort.active;
    return courseRequestModel;
  }

  deleteCourse(id: number): Observable<MessageResponse> {
    console.log('service' + id);
    return this.httpClient.delete<MessageResponse>(Constants.deleteCourseUrl + id);
  }

  allCourses(): Observable<CourseModel[]>{
    return this.httpClient.get<CourseModel[]>(Constants.allCoursesUrl);
  }

  getCoursesByDepartment(departmentId: number): CourseModel[] {
    return CourseManagementService.coursesList.filter(value => {
      return (value.departmentDTO?.id === departmentId);
    });
  }

}
