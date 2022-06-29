import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {DepartmentModel} from '../../../shared/model/department-management/department-model';
import {AcademicYear} from '../../../shared/model/academicYear-Management/academic-year';
import {AcademicTermModel} from '../../../shared/model/academicTerm-management/academic-term-model';
import {CourseModel} from '../../../shared/model/course-management/course-model';
import {MatSelect} from '@angular/material/select';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {CollegeManagementService} from '../../../college-management/service/college-management.service';
import {DepartmentService} from '../../../department-management/service/department.service';
import {AcademicYearService} from '../../../academic-year-management/service/academic-year.service';
import {AcademicTermService} from '../../../academic-term-management/service/academic-term.service';
import {CourseManagementService} from '../../../course-management/service/course-management.service';
import {CourseRequestModel} from '../../../shared/model/course-management/course-request-model';
import {TimetableModel} from '../../../shared/model/timetable-management/timetable-model';
import {FacultyMemberModel} from '../../../shared/model/facultyMember-management/facultyMember-model';
import {FacultyMemberRequestModel} from '../../../shared/model/facultyMember-management/facultyMember-request-model';
import {LectureTypeModel} from '../../../shared/model/lectureType-model';
import {BuildingModel} from '../../../shared/model/building-management/building-model';
import {ClassroomModel} from '../../../shared/model/classroom-management/classroom-model';
import {FacultyMemberManagementService} from '../../../facultyMember-management/service/facultyMember-management.service';
import {BuildingManagementService} from '../../../building-management/service/building-management.service';
import {ClassroomManagementService} from '../../../classroom-management/service/classroom-management.service';
import {TimetableManagementService} from '../../service/timetable-management.service';
import {SectionModel} from '../../../shared/model/section-management/section-model';
import {SectionRequestModel} from '../../../shared/model/section-management/section-request-model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
   selector: 'app-timetable-add',
   templateUrl: './add-timetable.component.html',
   styleUrls: ['./add-timetable.component.css']
})
export class AddTimetableComponent implements OnInit {

   private httpClient: HttpClient;
   timetable = new TimetableModel();
   colleges: CollegeModel[];
   college = new CollegeModel();
   departments: DepartmentModel[];
   department = new DepartmentModel();
   academicYears: AcademicYear[];
   academicYear = new AcademicYear();
   academicTerms: AcademicTermModel[];
   academicTerm = new AcademicTermModel();
   newAcademicTerms: AcademicTermModel[] = [];
   facultyMembers: FacultyMemberModel[];
   facultyMemberRequestModel = new FacultyMemberRequestModel();
   courses: CourseModel[];
   course = new CourseModel();
   courseModelRequestModel = new CourseRequestModel();
   sections: SectionModel[];
   section = new SectionModel();
   sectionRequestModel = new SectionRequestModel();
   lectureTypes: LectureTypeModel[];
   buildings: BuildingModel[];
   building = new BuildingModel();
   newBuildings: BuildingModel[] = [];
   classrooms: ClassroomModel[];
   classroom = new ClassroomModel();
   newClassrooms: ClassroomModel[] = [];
   days: string[];
   startTime: string;
   endTime: string;
   errorMessage: string;
   form2: FormGroup;
   isDisabled = true;

   @ViewChild('collegeSelect', {static: true}) collegeSelect: MatSelect;
   @ViewChild('departmentSelect', {static: true}) departmentSelect: MatSelect;
   @ViewChild('academicYearSelect', {static: true}) academicYearSelect: MatSelect;
   @ViewChild('academicTermSelect', {static: true}) academicTermSelect: MatSelect;
   @ViewChild('facultyMemberSelect', {static: true}) facultyMemberSelect: MatSelect;
   @ViewChild('courseSelect', {static: true}) courseSelect: MatSelect;
   @ViewChild('lectureTypeSelect', {static: true}) lectureTypeSelect: MatSelect;
   @ViewChild('buildingSelect', {static: true}) buildingSelect: MatSelect;
   @ViewChild('classroomSelect', {static: true}) classroomSelect: MatSelect;
   @ViewChild('daySelect', {static: true}) daySelect: MatSelect;

   constructor(@Inject(MAT_DIALOG_DATA) public data: TimetableModel,
               private timetableManagementService: TimetableManagementService,
               private snackBar: MatSnackBar,
               private route: Router,
               private collegeManagementService: CollegeManagementService,
               private departmentService: DepartmentService,
               private academicYearService: AcademicYearService,
               private academicTermService: AcademicTermService,
               private facultyMemberService: FacultyMemberManagementService,
               private courseService: CourseManagementService,
               private lectureTypeService: TimetableManagementService,
               private buildingService: BuildingManagementService,
               private classroomService: ClassroomManagementService,
               http: HttpClient) {
      this.httpClient = http;
   }

   ngOnInit(): void {
      this.timetable = this.data;
      console.log(this.timetable);
      this.form2 = new FormGroup({
            // academicYearMenu: new FormControl(this.timetable.academicYearDTO?.id, Validators.required),
            // academicTermMenu: new FormControl(this.timetable.academicTermDTO?.id, Validators.required),
            // collegeMenu: new FormControl(this.timetable.collegeDTO?.id, Validators.required),
            // departmentMenu: new FormControl(this.timetable.departmentDTO?.id, Validators.required),
            // courseMenu: new FormControl(this.timetable.courseDTO?.id, Validators.required),
            facultyMemberMenu: new FormControl(undefined, Validators.required),
            lectureTypeMenu: new FormControl(undefined, Validators.required),
            buildingMenu: new FormControl(undefined, Validators.required),
            classroomMenu: new FormControl(undefined, Validators.required),
            dayMenu: new FormControl(undefined, Validators.required),
            startTime: new FormControl(undefined, Validators.required),
            endTime: new FormControl(undefined, Validators.required)
         }
      );

      this.academicYear = this.data.academicYearDTO;
      this.academicTerm = this.data.academicTermDTO;
      this.college = this.data.collegeDTO;
      this.department = this.data.departmentDTO;
      this.course = this.data.courseDTO;
      // this.academicYearService.getAcademicYears().subscribe(Response => {
      //    this.academicYears = Response;
      //    this.academicTerms = this.academicTermService.getAcademicTermsByAcademicYears(this.academicYear.id);
      // });

      this.collegeManagementService.getAllColleges().subscribe(Response => {
         this.colleges = Response;
         this.buildings = this.buildingService.getBuildingsByCollege(this.college.id);
         this.classrooms = this.classroomService.getClassroomsByBuilding(this.building.id);
         this.departments = this.departmentService.getDepartmentsByCollege(this.college.id);
         this.facultyMembers = this.facultyMemberService.getFacultyMembersByDepartment(this.department.id);
         this.courses = this.courseService.getCoursesByDepartment(this.department.id);
      });

      this.lectureTypeService.getAllLectureTypes().subscribe(Response => {
         this.lectureTypes = Response;
      });

      this.days = [
         'Saturday',
         'Sunday',
         'Monday',
         'Tuesday',
         'Wednesday',
         'Thursday',
         'Friday'
      ];

   }

   ngAfterViewInit(): void {
      this.buildingSelect.valueChange.subscribe(value => {
         if (this.buildingSelect.value !== undefined) {
            this.classroomSelect.setDisabledState(!this.isDisabled);
            this.classrooms = this.classroomService.getClassroomsByBuilding(this.buildingSelect.value.id);
         } else {
            this.classroomSelect.setDisabledState(this.isDisabled);
         }
      });
   }

   addTimes(): void {
      if (this.form2.valid) {
         // this.timetable.academicYearDTO = this.form2.get('academicYearMenu')?.value;
         // this.timetable.academicTermDTO = this.form2.get('academicTermMenu')?.value;
         // this.timetable.collegeDTO = this.form2.get('collegeMenu')?.value;
         // this.timetable.departmentDTO = this.form2.get('departmentMenu')?.value;
         // this.timetable.courseDTO = this.form2.get('courseMenu')?.value;
         this.timetable.facultyMemberDTO = this.form2.get('facultyMemberMenu')?.value;
         this.timetable.lectureTypeDTO = this.form2.get('lectureTypeMenu')?.value;
         this.timetable.buildingDTO = this.form2.get('buildingMenu')?.value;
         this.timetable.classroomDTO = this.form2.get('classroomMenu')?.value;
         this.timetable.day = this.form2.get('dayMenu')?.value;
         this.timetable.startTime = this.form2.get('startTime')?.value;
         this.timetable.endTime = this.form2.get('endTime')?.value;
         console.log(this.timetable);
      }

      this.timetableManagementService.timetableAddEvent.next(this.timetable);
   }

   close(): void {
      this.timetableManagementService.timetableCloseUpdateEvent.next();
   }

}
