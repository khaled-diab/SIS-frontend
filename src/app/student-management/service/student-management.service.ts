import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {PageRequest} from '../../shared/model/page-request';
import {StudentModel} from '../../shared/model/student-management/student-model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {PageQueryUtil} from '../../shared/model/page-query';
import {StudentFilterModel} from '../../shared/model/student-management/student-filter-model';

@Injectable({
  providedIn: 'root'
})
export class StudentManagementService {

  private basUrl = 'http://localhost:5000/api/students';
  studentFilterEvent: Subject<StudentFilterModel> = new Subject<StudentFilterModel>();

  constructor(private httpClient: HttpClient) { }
  getStudentsPage(pageNumber: number, pageSize: number): Observable<PageRequest<StudentModel>>{
    pageNumber++;
    const pageQuery = new PageQueryUtil(pageNumber, pageSize);
    console.log(pageQuery);
    return this.httpClient.post<PageRequest<StudentModel>>(`${this.basUrl}/datapage`, pageQuery);

  }

  searchStudent(pageNumber: number, pageSize: number, searchValue: string): Observable<PageRequest<StudentModel>>{

      return this.httpClient.get<PageRequest<StudentModel>>('http://localhost:5000/api/students/search/' + searchValue, {
        params: new HttpParams()
          .set('page', pageNumber + 1)
          .set('limit', pageSize)
      });
  }
  //
  // getStudentList(): Observable<Student[]>{
  //   return this.httpClient.get<Student[]>(`${this.basUrl}/all`);
  // }
  // // searchStudents(attribute:string,page:number,limit:number):Observable<PageResult>{
  // //   return this.httpClient.get<PageResult>("http://localhost:5000/api/students/search/"+attribute,{
  // //     params: new HttpParams()
  // //     .set('page', page)
  // //     .set('limit', limit)
  // // })}
  searchStudents(attribute: string, collegeId: number, departmentId: number, page: number, limit: number, filter: StudentFilterModel): Observable<PageRequest<StudentModel>>{
    page++;
    if (attribute != undefined) {
      if (collegeId == -1) {
        return this.httpClient.post<PageRequest<StudentModel>>('http://localhost:5000/api/students/search/' + attribute, filter, {
          params: new HttpParams()

            .set('page', page)
            .set('limit', limit)
        });
      } else if (collegeId != -1 && departmentId == -1) {
        return this.httpClient.post<PageRequest<StudentModel>>('http://localhost:5000/api/students/search/' + attribute, filter, {
          params: new HttpParams()
            .set('collegeId', collegeId)
            .set('page', page)
            .set('limit', limit)
        });

      }
      return this.httpClient.post<PageRequest<StudentModel>>('http://localhost:5000/api/students/search/' + attribute, filter, {
        params: new HttpParams()
          .set('collegeId', collegeId)
          .set('departmentId', departmentId)
          .set('page', page)
          .set('limit', limit)
      });

    }else{
      if (collegeId == -1){
        return this.httpClient.post<PageRequest<StudentModel>>('http://localhost:5000/api/students/search/', filter, {
          params: new HttpParams()
            .set('page', page)
            .set('limit', limit)
        });
      }else if (collegeId != -1 && departmentId == -1){
        console.log('hi');
        return this.httpClient.post<PageRequest<StudentModel>>('http://localhost:5000/api/students/search/', filter, {
          params: new HttpParams()
            .set('collegeId', collegeId)
            .set('page', page)
            .set('limit', limit)
        });

      }
      return this.httpClient.post<PageRequest<StudentModel>>('http://localhost:5000/api/students/search/', filter, {
        params: new HttpParams()
          .set('collegeId', collegeId)
          .set('departmentId', departmentId)
          .set('page', page)
          .set('limit', limit)
      });
    }
  }

  // filterStudents(collegeId: number, departmentId: number, page: number, limit: number): Observable<PageResult>{
  //   if (collegeId == undefined){
  //     return this.httpClient.get<PageResult>('http://localhost:5000/api/students/search/', {
  //       params: new HttpParams()
  //         .set('page', page)
  //         .set('limit', limit)
  //     });
  //   }else if (collegeId != undefined && departmentId == undefined){
  //     return this.httpClient.get<PageResult>('http://localhost:5000/api/students/search/', {
  //       params: new HttpParams()
  //         .set('collageId', collegeId)
  //         .set('page', page)
  //         .set('limit', limit)
  //     });
  //
  //   }
  //   return this.httpClient.get<PageResult>('http://localhost:5000/api/students/search/', {
  //     params: new HttpParams()
  //       .set('collageId', collegeId)
  //       .set('departmentId', departmentId)
  //       .set('page', page)
  //       .set('limit', limit)
  //   });
  //
  //
  // }
  //
  // getStudent(id: number): Observable<Student>{
  //   return this.httpClient.get<Student>('http://localhost:5000/api/students/' + id);
  // }
  // addStudent(student: Student){
  //   return this.httpClient.post<Student[]>('http://localhost:5000/api/students/addStudent', student);
  //
  // }
updateStudent(student: StudentModel): Observable < StudentModel > {
    return this.httpClient.put<StudentModel>('http://localhost:5000/api/students/updateStudent', student);

  }
deleteStudent(id: number): Observable < string > {
    return this.httpClient.delete<string>('http://localhost:5000/api/students/delete/' + id);

  }
}

