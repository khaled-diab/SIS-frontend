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
import {Router} from '@angular/router';
import {AcademicYearService} from '../../../academic-year-management/service/academic-year.service';
import {AcademicTermService} from '../../../academic-term-management/service/academic-term.service';
import {CourseManagementService} from '../../../course-management/service/course-management.service';
import {StudentEnrollmentModel} from '../../../shared/model/studentEnrollment-management/student-enrollment-model';
import {MajorModel} from '../../../shared/model/major-model';
import {StudyTypeModel} from '../../../shared/model/studyType-model';
import {SectionModel} from '../../../shared/model/section-management/section-model';
import {SectionRequestModel} from '../../../shared/model/section-management/section-request-model';
import {StudentModel} from '../../../shared/model/student-management/student-model';
import {StudentEnrollmentManagementService} from '../../service/studentEnrollment-management.service';
import {SectionManagementService} from '../../../section-management/service/sectionManagement.service';

@Component({
   selector: 'app-studentEnrollment-edit',
   templateUrl: './edit-studentEnrollment.component.html',
   styleUrls: ['./edit-studentEnrollment.component.css']
})
export class EditStudentEnrollmentComponent implements OnInit {

   studentEnrollment = new StudentEnrollmentModel();
   colleges: CollegeModel[];
   college = new CollegeModel();
   departments: DepartmentModel[];
   department = new DepartmentModel();
   academicYears: AcademicYear[];
   academicYear = new AcademicYear();
   academicTerms: AcademicTermModel[];
   academicTerm = new AcademicTermModel();
   majors: MajorModel[];
   major = new MajorModel();
   studyTypes: StudyTypeModel[];
   studyType = new StudyTypeModel();
   courses: CourseModel[];
   course = new CourseModel();
   sections: SectionModel[];
   section = new SectionModel();
   sectionRequestModel = new SectionRequestModel();
   student = new StudentModel();
   errorMessage: string;
   form: FormGroup;

   @ViewChild('collegeSelect', {static: true}) collegeSelect: MatSelect;
   @ViewChild('departmentSelect', {static: true}) departmentSelect: MatSelect;
   @ViewChild('academicYearSelect', {static: true}) academicYearSelect: MatSelect;
   @ViewChild('academicTermSelect', {static: true}) academicTermSelect: MatSelect;
   @ViewChild('majorSelect', {static: true}) majorSelect: MatSelect;
   @ViewChild('studyTypeSelect', {static: true}) studyTypeSelect: MatSelect;
   @ViewChild('courseSelect', {static: true}) courseSelect: MatSelect;
   @ViewChild('sectionSelect', {static: true}) sectionSelect: MatSelect;

   constructor(@Inject(MAT_DIALOG_DATA) public data: StudentEnrollmentModel,
               private studentEnrollmentManagementService: StudentEnrollmentManagementService,
               private snackBar: MatSnackBar,
               private route: Router,
               private collegeManagementService: CollegeManagementService,
               private departmentService: DepartmentService,
               private academicYearService: AcademicYearService,
               private academicTermService: AcademicTermService,
               private majorService: StudentEnrollmentManagementService,
               private studyTypeService: StudentEnrollmentManagementService,
               private courseService: CourseManagementService,
               private sectionService: SectionManagementService) {
   }

   ngOnInit(): void {
      this.studentEnrollment = this.data;
      this.form = new FormGroup({
            academicYearMenu: new FormControl(this.studentEnrollment.academicYearDTO.id, Validators.required),
            academicTermMenu: new FormControl(this.studentEnrollment.academicTermDTO.id, Validators.required),
            collegeMenu: new FormControl(this.studentEnrollment.collegeDTO.id, Validators.required),
            departmentMenu: new FormControl(this.studentEnrollment.departmentDTO.id, Validators.required),
            courseMenu: new FormControl(this.studentEnrollment.courseDTO.id, Validators.required),
            majorMenu: new FormControl(this.studentEnrollment.majorDTO.id),
            studyTypeMenu: new FormControl(this.studentEnrollment.studyTypeDTO.id, Validators.required),
            sectionMenu: new FormControl(this.studentEnrollment.sectionDTO.id, Validators.required),
            student: new FormControl(this.studentEnrollment.studentDTO.id, Validators.required),
            studentName: new FormControl(this.studentEnrollment.studentDTO.nameEn),
            studentUniId: new FormControl(this.studentEnrollment.studentDTO.universityId)
         }
      );
      console.log(this.data);

      this.academicYear = this.data.academicYearDTO;
      this.academicTerm = this.data.academicTermDTO;
      this.college = this.data.collegeDTO;
      this.department = this.data.departmentDTO;
      this.course = this.data.courseDTO;
      this.major = this.data.majorDTO;
      this.studyType = this.data.studyTypeDTO;
      this.section = this.data.sectionDTO;
      this.student = this.data.studentDTO;


      this.form.get('academicYearMenu')?.setValue(this.studentEnrollment.academicYearDTO.id);
      this.form.get('academicTermMenu')?.setValue(this.studentEnrollment.academicTermDTO.id);
      this.form.get('collegeMenu')?.setValue(this.studentEnrollment.collegeDTO.id);
      this.form.get('departmentMenu')?.setValue(this.studentEnrollment.departmentDTO.id);
      this.form.get('courseMenu')?.setValue(this.studentEnrollment.courseDTO.id);
      this.form.get('majorMenu')?.setValue(this.studentEnrollment.majorDTO.id);
      this.form.get('studyTypeMenu')?.setValue(this.studentEnrollment.studyTypeDTO.id);
      this.form.get('sectionMenu')?.setValue(this.studentEnrollment.sectionDTO.id);


      this.academicYears = AcademicYearService.yearsList;
      this.academicTerms = this.academicTermService.getAcademicTermsByAcademicYears(this.academicYear.id);

      this.collegeManagementService.getAllColleges().subscribe(Response => {
         this.colleges = Response;
      });
      this.departments = this.departmentService.getDepartmentsByCollege(this.college.id);
      this.studentEnrollmentManagementService.getMajorsByDepartment(this.department.id).subscribe(value => {
         this.majors = value;
      });
      this.courseService.getCoursesByDepartment(this.department.id).subscribe(value => {
         this.courses = value;
      });
      this.sectionService.getSectionsByCourse(this.course.id).subscribe(value => {
         this.sections = value;
      });

      this.studyTypeService.getAllStudyTypes().subscribe(Response => {
         this.studyTypes = Response;
      });

   }

   ngAfterViewInit(): void {

      this.academicYearSelect.valueChange.subscribe(value => {
         this.form.get('academicTermMenu')?.setValue(null);
         if (this.academicYearSelect.value !== undefined) {
            this.academicTermSelect.setDisabledState(false);
            this.academicTerms = this.academicTermService.getAcademicTermsByAcademicYears(this.academicYearSelect.value);
         } else {
            this.academicTermSelect.setDisabledState(true);
         }
      });

      this.collegeSelect.valueChange.subscribe(value => {
         this.form.get('departmentMenu')?.setValue(null);
         if (this.collegeSelect.value !== undefined) {
            this.departmentSelect.setDisabledState(false);
            this.departments = this.departmentService.getDepartmentsByCollege(this.collegeSelect.value);
         } else {
            this.departmentSelect.setDisabledState(true);
         }
      });

      this.departmentSelect.valueChange.subscribe(value => {
         this.form.get('courseMenu')?.setValue(null);
         if (this.departmentSelect.value !== undefined) {
            this.courseSelect.setDisabledState(false);
            this.courseService.getCoursesByDepartment(this.departmentSelect.value).subscribe(value1 => {
               this.courses = value1;
            });

            this.majorSelect.setDisabledState(false);
            this.studentEnrollmentManagementService.getMajorsByDepartment(this.departmentSelect.value).subscribe(value1 => {
               this.majors = value1;
            });
         } else {
            this.courseSelect.setDisabledState(true);
            this.majorSelect.setDisabledState(true);
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

   }

   update(): void {
      if (this.form.valid) {
         this.studentEnrollment.academicYearDTO.id = this.form.get('academicYearMenu')?.value;
         this.studentEnrollment.academicTermDTO.id = this.form.get('academicTermMenu')?.value;
         this.studentEnrollment.collegeDTO.id = this.form.get('collegeMenu')?.value;
         this.studentEnrollment.departmentDTO.id = this.form.get('departmentMenu')?.value;
         this.studentEnrollment.courseDTO.id = this.form.get('courseMenu')?.value;
         this.studentEnrollment.majorDTO.id = this.form.get('majorMenu')?.value;
         this.studentEnrollment.studyTypeDTO.id = this.form.get('studyTypeMenu')?.value;
         this.studentEnrollment.sectionDTO.id = this.form.get('sectionMenu')?.value;
         this.studentEnrollment.id = this.data.id;
         console.log(this.studentEnrollment);
      }

      this.studentEnrollmentManagementService.updateStudentEnrollment(this.studentEnrollment).subscribe((Response) => {
            this.snackBar.open('Student Enrollment updated Successfully', undefined, {
               duration: 2000,
               panelClass: 'successSnackBar'
            });
            this.studentEnrollmentManagementService.studentEnrollmentCloseUpdateEvent.next();
         }, error => {
            console.log(error);
            const formControl = this.form.get(error.error.field);
            this.errorMessage = error.error.message;
            if (formControl) {
               formControl.setErrors({
                  serverError: true
               });
            }
            this.snackBar.open('Failed To update Student Enrollment', undefined, {duration: 2000});
         }
      );
   }

   cancel(): void {
      this.studentEnrollmentManagementService.studentEnrollmentCloseUpdateEvent.next();
   }
}
