// import {Component, OnInit} from '@angular/core';
// import {Constants} from '../../../shared/constants';
// import {GradeBookRequestModel} from '../../../shared/model/gradebook-management/gradeBook-request-model';
// import {GradeBookManagementService} from '../../service/gradeBook-management.service';
// import {CourseModel} from '../../../shared/model/course-management/course-model';
// import {CourseManagementService} from '../../../course-management/service/course-management.service';
//
// @Component({
//    selector: 'app-student-gradeBook-filter',
//    templateUrl: './student-gradeBook-filter.component.html',
//    styleUrls: ['./student-gradeBook-filter.component.css']
// })
// export class StudentGradeBookFilterComponent implements OnInit {
//
//    student: any;
//    courses: CourseModel[];
//    gradeBookRequestModel: GradeBookRequestModel = new GradeBookRequestModel();
//
//    constructor(private gradeBookManagementService: GradeBookManagementService,
//                private courseService: CourseManagementService) {
//    }
//
//    ngOnInit(): void {
//       // @ts-ignore
//       this.student = JSON.parse(localStorage.getItem(Constants.loggedInUser));
//       this.courseService.getCoursesByStudentId(this.student.id).subscribe(value => {
//          this.courses = value;
//       });
//       this.gradeBookRequestModel.filterStudent = this.student.id;
//       this.gradeBookManagementService.gradeBookFilterEvent.next(this.gradeBookRequestModel);
//    }
//
//    select(course: CourseModel): any {
//       this.gradeBookRequestModel.filterCourse = course.id;
//       this.gradeBookManagementService.gradeBookFilterEvent.next(this.gradeBookRequestModel);
//    }
//
// }
