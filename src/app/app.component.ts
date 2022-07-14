import {Component, OnInit} from '@angular/core';
import {DepartmentService} from './department-management/service/department.service';
import {AcademicProgramService} from './academic-program/service/academic-program.service';
import {AcademicTermService} from './academic-term-management/service/academic-term.service';
import {CourseModel} from './shared/model/course-management/course-model';
import {CourseManagementService} from './course-management/service/course-management.service';
import {StudentEnrollmentManagementService} from './studentEnrollment-management/service/studentEnrollment-management.service';
import {FacultyMemberManagementService} from './facultyMember-management/service/facultyMember-management.service';
import {ClassroomManagementService} from './classroom-management/service/classroom-management.service';
import {BuildingManagementService} from './building-management/service/building-management.service';
import {SectionManagementService} from './section-management/service/sectionManagement.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sis-manager';

  constructor(private departmentService: DepartmentService, private academicProgramService: AcademicProgramService,
              private academicTermService: AcademicTermService, private studentEnrollmentManagementService: StudentEnrollmentManagementService,
              private courseService: CourseManagementService, private facultyMemberService: FacultyMemberManagementService,
              private  classroomService: ClassroomManagementService, private  buildingService: BuildingManagementService, private  sectionService: SectionManagementService)
        {}

ngOnInit(): void {
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
