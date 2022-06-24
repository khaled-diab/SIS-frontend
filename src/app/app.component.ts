import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sis-manager';

  constructor() {
  }

  ngOnInit(): void {
    // this.departmentService.getDepartments().subscribe(value => {
    //   DepartmentService.departmentsList = value;
    // });
    // this.academicProgramService.getAllAcademicPrograms().subscribe(value => {
    //   AcademicProgramService.academicProgramList = value;
    // });
    // this.academicTermService.getAcademicTerms().subscribe(value => {
    //   AcademicTermService.academicTermsList = value;
    // });
    // this.studentEnrollmentManagementService.getAllMajors().subscribe(value => {
    //   StudentEnrollmentManagementService.majorsList = value;
    // });
    // this.courseService.allCourses().subscribe(value => {
    //   CourseManagementService.coursesList = value;
    // });
    // this.facultyMemberService.allFacultyMembers().subscribe(value => {
    //   FacultyMemberManagementService.facultyMembersList = value;
    // });
    // this.sectionService.allSections().subscribe(value => {
    //   SectionManagementService.sectionsList = value;
    // });
    // this.buildingService.getBuildings().subscribe(value => {
    //   BuildingManagementService.buildingsList = value;
    // });
    // this.classroomService.getClassrooms().subscribe(value => {
    //   ClassroomManagementService.classroomsList = value;
    // });
    // console.log(DepartmentService.departmentsList);

  }
}
