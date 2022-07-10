import {Component, OnInit} from '@angular/core';
import {DepartmentService} from './department-management/service/department.service';
import {AcademicProgramService} from './academic-program/service/academic-program.service';
import {AcademicTermService} from './academic-term-management/service/academic-term.service';
import {CourseManagementService} from './course-management/service/course-management.service';
import {StudentEnrollmentManagementService} from './studentEnrollment-management/service/studentEnrollment-management.service';
import {FacultyMemberManagementService} from './facultyMember-management/service/facultyMember-management.service';
import {ClassroomManagementService} from './classroom-management/service/classroom-management.service';
import {BuildingManagementService} from './building-management/service/building-management.service';
import {SectionManagementService} from './section-management/service/sectionManagement.service';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {Constants} from './shared/constants';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   title = 'sis-manager';
   socket = new SockJS('http://localhost:8080/websocke');
   stompClient = Stomp.over(this.socket);

   constructor(private departmentService: DepartmentService, private academicProgramService: AcademicProgramService, private academicTermService: AcademicTermService,
               private studentEnrollmentManagementService: StudentEnrollmentManagementService,
               private courseService: CourseManagementService, private facultyMemberService: FacultyMemberManagementService,
               // tslint:disable-next-line:max-line-length
               private classroomService: ClassroomManagementService, private buildingService: BuildingManagementService, private sectionService: SectionManagementService) {

   }

   ngOnInit(): void {
      const connected: boolean = this.stompClient.connected;
      if (connected) {
         this.subscribeToTopic(Constants.FILE_UPLOAD_TOPIC_NAME);
      } else {
         this.stompClient.connect({}, (): any => {
            this.subscribeToTopic(Constants.FILE_UPLOAD_TOPIC_NAME);
         });
      }
      this.subscription();
   }


   private subscribeToTopic(topic: string): void {
      this.stompClient.subscribe(topic, (response?: string): any => {
         console.log(response);
      });
   }

   private subscription(): void {
      this.departmentService.getDepartments().subscribe(value => {
         DepartmentService.departmentsList = value;
      });
      this.academicProgramService.getAllAcademicPrograms().subscribe(value => {
         AcademicProgramService.academicProgramList = value;
      });
      this.academicTermService.getAcademicTerms().subscribe(value => {
         AcademicTermService.academicTermsList = value;
      });
      this.studentEnrollmentManagementService.getAllMajors().subscribe(value => {
         StudentEnrollmentManagementService.majorsList = value;
      });
      this.courseService.allCourses().subscribe(value => {
         CourseManagementService.coursesList = value;
      });
      this.facultyMemberService.allFacultyMembers().subscribe(value => {
         FacultyMemberManagementService.facultyMembersList = value;
      });
      this.sectionService.allSections().subscribe(value => {
         SectionManagementService.sectionsList = value;
      });
      this.buildingService.getBuildings().subscribe(value => {
         BuildingManagementService.buildingsList = value;
      });
      this.classroomService.getClassrooms().subscribe(value => {
         ClassroomManagementService.classroomsList = value;
      });
   }
}
