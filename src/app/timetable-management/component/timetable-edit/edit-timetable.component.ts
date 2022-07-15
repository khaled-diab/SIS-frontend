import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {DepartmentModel} from '../../../shared/model/department-management/department-model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CollegeManagementService} from '../../../college-management/service/college-management.service';
import {MatSelect} from '@angular/material/select';
import {DepartmentService} from '../../../department-management/service/department.service';
import {AcademicYear} from '../../../shared/model/academicYear-Management/academic-year';
import {AcademicTermModel} from '../../../shared/model/academicTerm-management/academic-term-model';
import {CourseModel} from '../../../shared/model/course-management/course-model';
import {CourseRequestModel} from '../../../shared/model/course-management/course-request-model';
import {Router} from '@angular/router';
import {AcademicYearService} from '../../../academic-year-management/service/academic-year.service';
import {AcademicTermService} from '../../../academic-term-management/service/academic-term.service';
import {CourseManagementService} from '../../../course-management/service/course-management.service';
import {TimetableModel} from '../../../shared/model/timetable-management/timetable-model';
import {FacultyMemberModel} from '../../../shared/model/facultyMember-management/facultyMember-model';
import {FacultyMemberRequestModel} from '../../../shared/model/facultyMember-management/facultyMember-request-model';
import {LectureTypeModel} from '../../../shared/model/lectureType-model';
import {BuildingModel} from '../../../shared/model/building-management/building-model';
import {ClassroomModel} from '../../../shared/model/classroom-management/classroom-model';
import {TimetableManagementService} from '../../service/timetable-management.service';
import {
   FacultyMemberManagementService
} from '../../../facultyMember-management/service/facultyMember-management.service';
import {BuildingManagementService} from '../../../building-management/service/building-management.service';
import {ClassroomManagementService} from '../../../classroom-management/service/classroom-management.service';
import {SectionModel} from '../../../shared/model/section-management/section-model';
import {SectionRequestModel} from '../../../shared/model/section-management/section-request-model';
import {SectionManagementService} from '../../../section-management/service/sectionManagement.service';
import {Constants} from "../../../shared/constants";

@Component({
   selector: 'app-timetable-edit',
   templateUrl: './edit-timetable.component.html',
   styleUrls: ['./edit-timetable.component.css']
})
export class EditTimetableComponent implements OnInit {

   timetable = new TimetableModel();
   colleges: CollegeModel[];
   college = new CollegeModel();
   departments: DepartmentModel[];
   department = new DepartmentModel();
   academicYears: AcademicYear[];
   academicYear = new AcademicYear();
   academicTerms: AcademicTermModel[];
   facultyMembers: FacultyMemberModel[];
   facultyMemberRequestModel = new FacultyMemberRequestModel();
   course = new CourseModel();
   courses: CourseModel[];
   courseModelRequestModel = new CourseRequestModel();
   sections: SectionModel[];
   sectionRequestModel = new SectionRequestModel();
   lectureTypes: LectureTypeModel[];
   building = new BuildingModel();
   buildings: BuildingModel[];
   classrooms: ClassroomModel[];
   days: string[] = Constants.Days;
   errorMessage: string;
   form: FormGroup;

   @ViewChild('collegeSelect', {static: true}) collegeSelect: MatSelect;
   @ViewChild('departmentSelect', {static: true}) departmentSelect: MatSelect;
   @ViewChild('academicYearSelect', {static: true}) academicYearSelect: MatSelect;
   @ViewChild('academicTermSelect', {static: true}) academicTermSelect: MatSelect;
   @ViewChild('facultyMemberSelect', {static: true}) facultyMemberSelect: MatSelect;
   @ViewChild('courseSelect', {static: true}) courseSelect: MatSelect;
   @ViewChild('sectionSelect', {static: true}) sectionSelect: MatSelect;
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
               private sectionService: SectionManagementService,
               private lectureTypeService: TimetableManagementService,
               private buildingService: BuildingManagementService,
               private classroomService: ClassroomManagementService) {
   }

   ngOnInit(): void {
      this.timetable = this.data;
      console.log(this.timetable);
      this.form = new FormGroup({
            academicYearMenu: new FormControl(this.data.academicYearDTO.id, Validators.required),
            academicTermMenu: new FormControl(this.data.academicTermDTO.id, Validators.required),
            collegeMenu: new FormControl(this.data.collegeDTO.id, Validators.required),
            departmentMenu: new FormControl(this.data.departmentDTO.id, Validators.required),
            facultyMemberMenu: new FormControl(this.data.facultyMemberDTO.id, Validators.required),
            courseMenu: new FormControl(this.data.courseDTO.id, Validators.required),
            sectionMenu: new FormControl(this.data.sectionDTO.id, Validators.required),
            lectureTypeMenu: new FormControl(this.data.lectureTypeDTO.id, Validators.required),
            buildingMenu: new FormControl(this.data.buildingDTO.id, Validators.required),
            classroomMenu: new FormControl(this.data.classroomDTO.id, Validators.required),
            dayMenu: new FormControl(this.data.day, Validators.required),
            startTime: new FormControl(this.data.startTime, Validators.required),
            endTime: new FormControl(this.data.endTime, Validators.required)
         }
      );
      console.log(this.data);
      this.academicYear = this.data.academicYearDTO;
      this.college = this.data.collegeDTO;
      this.building = this.data.buildingDTO;
      this.department = this.data.departmentDTO;
      this.course = this.data.courseDTO;

      this.academicYears = AcademicYearService.yearsList;
      this.academicTerms = this.academicTermService.getAcademicTermsByAcademicYears(this.academicYear.id);
      this.collegeManagementService.getAllColleges().subscribe(Response => {
         this.colleges = Response;
      });
      this.buildings = this.buildingService.getBuildingsByCollege(this.college.id);
      this.classrooms = this.classroomService.getClassroomsByBuilding(this.building.id);
      this.departments = this.departmentService.getDepartmentsByCollege(this.college.id);
      this.facultyMemberService.getFacultyMembersByCollege(this.college.id).subscribe(value => {
         this.facultyMembers = value;
      });
      this.courseService.getCoursesByDepartment(this.department.id).subscribe(value => {
         this.courses = value;
      });
      this.sectionService.getSectionsByCourse(this.course.id).subscribe(value => {
         this.sections = value;
      });

      this.lectureTypeService.getAllLectureTypes().subscribe(Response => {
         this.lectureTypes = Response;
      });
   }

   ngAfterViewInit(): void {
      this.academicYearSelect.valueChange.subscribe(value => {
         if (this.academicYearSelect.value !== undefined) {
            this.academicTermSelect.setDisabledState(false);
            this.academicTerms = this.academicTermService.getAcademicTermsByAcademicYears(this.academicYearSelect.value);
         } else {
            this.academicTermSelect.setDisabledState(true);
         }
      });

      this.collegeSelect.valueChange.subscribe(value => {
         if (this.collegeSelect.value !== undefined) {
            this.departmentSelect.setDisabledState(false);
            this.departments = this.departmentService.getDepartmentsByCollege(this.collegeSelect.value);

            this.buildingSelect.setDisabledState(false);
            this.buildings = this.buildingService.getBuildingsByCollege(this.collegeSelect.value);

            this.facultyMemberSelect.setDisabledState(false);
            this.facultyMemberService.getFacultyMembersByCollege(this.collegeSelect.value).subscribe(value1 => {
               this.facultyMembers = value1;
            });
         } else {
            this.departmentSelect.setDisabledState(true);
            this.buildingSelect.setDisabledState(true);
            this.facultyMemberSelect.setDisabledState(true);
         }
      });

      this.departmentSelect.valueChange.subscribe(value => {
         if (this.departmentSelect.value !== undefined) {
            this.courseSelect.setDisabledState(false);
            this.courseService.getCoursesByDepartment(this.departmentSelect.value).subscribe(value1 => {
               this.courses = value1;
            });
         } else {

            this.courseSelect.setDisabledState(true);
         }
      });

      this.courseSelect.valueChange.subscribe(value => {
         if (this.courseSelect.value !== undefined) {
            this.sectionSelect.setDisabledState(false);
            this.sectionService.getSectionsByCourse(this.courseSelect.value).subscribe(value1 => {
               this.sections = value1;
            });
         } else {
            this.sectionSelect.setDisabledState(true);
         }
      });

      this.buildingSelect.valueChange.subscribe(value => {
         if (this.buildingSelect.value !== undefined) {
            this.classroomSelect.setDisabledState(false);
            this.classrooms = this.classroomService.getClassroomsByBuilding(this.buildingSelect.value);
         } else {
            this.classroomSelect.setDisabledState(true);
         }
      });
   }

   update(): void {
      if (this.form.valid) {
         this.timetable.academicYearDTO.id = this.form.get('academicYearMenu')?.value;
         this.timetable.academicTermDTO.id = this.form.get('academicTermMenu')?.value;
         this.timetable.collegeDTO.id = this.form.get('collegeMenu')?.value;
         this.timetable.departmentDTO.id = this.form.get('departmentMenu')?.value;
         this.timetable.facultyMemberDTO.id = this.form.get('facultyMemberMenu')?.value;
         this.timetable.courseDTO.id = this.form.get('courseMenu')?.value;
         this.timetable.sectionDTO.id = this.form.get('sectionMenu')?.value;
         this.timetable.lectureTypeDTO.id = this.form.get('lectureTypeMenu')?.value;
         this.timetable.buildingDTO.id = this.form.get('buildingMenu')?.value;
         this.timetable.classroomDTO.id = this.form.get('classroomMenu')?.value;
         this.timetable.day = this.form.get('dayMenu')?.value;
         this.timetable.startTime = this.form.get('startTime')?.value;
         this.timetable.endTime = this.form.get('endTime')?.value;
         console.log(this.timetable);
      }
      if (this.form.get('startTime')?.value > this.form.get('endTime')?.value) {
         this.snackBar.open('End Time must be greater than Start Time!', undefined, {duration: 3500});
         return;
      }
      this.timetableManagementService.updateTimetable(this.timetable).subscribe((Response) => {
            this.snackBar.open('Timetable updated Successfully', undefined, {
               duration: 2000,
               panelClass: 'successSnackBar'
            });
            this.timetableManagementService.timetableCloseUpdateEvent.next();
         }, error => {
            console.log(error);
            const formControl = this.form.get(error.error.field);
            this.errorMessage = error.error.message;
            if (formControl) {
               formControl.setErrors({
                  serverError: true
               });
            }
            this.snackBar.open('Failed To update Timetable', undefined, {duration: 2000});
         }
      );
   }

   cancel(): void {
      this.timetableManagementService.timetableCloseUpdateEvent.next();
   }
}
