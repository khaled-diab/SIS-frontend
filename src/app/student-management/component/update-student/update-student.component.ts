import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {StudentModel} from '../../../shared/model/student-management/student-model';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {DepartmentModel} from '../../../shared/model/department-management/department-model';
import {AcademicProgramModel} from '../../../shared/model/academicProgram-management/academicProgram-model';
import {FormControl, FormGroup, NgModel, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {StudentManagementService, UpdatePreviewData} from '../../service/student-management.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Constants} from '../../../shared/constants';
import {take} from 'rxjs/operators';
import {CollegeManagementService} from '../../../college-management/service/college-management.service';
import {MatSelect} from '@angular/material/select';
import {DepartmentService} from '../../../department-management/service/department.service';
import {AcademicProgramService} from '../../../academic-program/service/academic-program.service';
import {ActivatedRoute} from '@angular/router';

@Component({
   selector: 'app-update-student',
   templateUrl: './update-student.component.html',
   styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit, AfterViewInit {
   isDisabled = true;
   student = new StudentModel();
   colleges: CollegeModel[];
   college = new CollegeModel();
   departments: DepartmentModel[];
   programs: AcademicProgramModel[];
   department = new DepartmentModel();
   years: string[];
   levels = Constants.LEVELS;
   errorr = false;
   errorMessage: string;
   @ViewChild('arabicName') arabicName: NgModel;
   // @ViewChild('photoInput') photoInput: ElementRef;
   @ViewChild('collegeSelect', {static: true}) collegeSelect: MatSelect;
   @ViewChild('departmentSelect', {static: true}) departmentSelect: MatSelect;
   @ViewChild('programSelect', {static: true}) programSelect: MatSelect;
   deptOption = false;
   @ViewChild('img') img: ElementRef;
   form: FormGroup;
   // photoFile: any;
   // url: string;
   // imgFlage = 0;
   title = 'Update Student';
   defProg = -1;
   defDept = -1;

   constructor(@Inject(MAT_DIALOG_DATA) public data: UpdatePreviewData, private studentManagementService: StudentManagementService,
               private snackBar: MatSnackBar,
               private collegeManagementService: CollegeManagementService,
               private departmentService: DepartmentService,
               private academicProgramService: AcademicProgramService) {
   }

   ngOnInit(): void {
      if (this.data.sel === 1) {
         this.isDisabled = false;
      } else {
         this.isDisabled = true;
         this.title = 'Preview Student';

      }

      this.student = this.data.st;
      console.log(this.student.user);

      // this.url = Constants.StudentImgUrl + this.student.photo;
      //
      this.form = new FormGroup({
            nameEn: new FormControl(this.student.nameEn, Validators.compose([Validators.required,
               Validators.pattern(Constants.ENGLISH_CHARACTERS)])),
            nameAr: new FormControl(this.student.nameAr, Validators.compose([Validators.required,
               Validators.pattern(Constants.ARABIC_CHARACTERS)])),
            universityId: new FormControl(this.student.universityId, Validators.compose([Validators.required,
               Validators.pattern(Constants.DIGITS_ONLY)])),
            nationality: new FormControl(this.student.nationality, [Validators.required, Validators.pattern(Constants.ENGLISH_CHARACTERS)]),
            nationalId: new FormControl(this.student.nationalId, Validators.compose([Validators.required,
               Validators.pattern(Constants.DIGITS_ONLY_14)])),
            phone: new FormControl(this.student.phone, Validators.compose([Validators.required,
               Validators.pattern(Constants.DIGITS_ONLY_11)])),
            birthDate: new FormControl(this.student.birthDate, Validators.required),
            universityMail: new FormControl(this.student.universityMail, Validators.compose([Validators.required,
               Validators.email])),
            alternativeMail: new FormControl(this.student.alternativeMail, Validators.email),
            parentPhone: new FormControl(this.student.parentPhone, Validators.pattern(Constants.DIGITS_ONLY_11)),
            level: new FormControl(this.student.level),
            // year: new FormControl(this.student.year, Validators.required),
            // photo: new FormControl(this.student.photo),
            collegeMenu: new FormControl(this.student.collegeDTO.id, Validators.required),
            departmentMenu: new FormControl(this.student.departmentDTO?.id, Validators.required),
            programMenu: new FormControl(this.student.academicProgramDTO?.id),
         }
      );

      if (this.data.sel !== 1) {
         this.form.disable();

      }

      this.college = this.data.st.collegeDTO;
      this.department = this.data.st.departmentDTO;
      // if (this.department.id === 1){
      //   this.programSelect.setDisabledState(true);
      // }
      console.log(this.department);
      this.collegeManagementService.getAllColleges().subscribe(Response => {
         this.colleges = Response;
         this.departments = this.departmentService.getDepartmentsByCollege(this.college.id);
         this.academicProgramService.getAcademicProgramsByDepartment(this.department?.id).subscribe(value => {
            this.programs = value;
         });
      });
   }

   ngAfterViewInit(): void {
      this.collegeSelect.valueChange.subscribe(value => {
         this.departmentSelect.value = undefined;
         this.programSelect.value = undefined;

         this.form.patchValue({
           departmentMenu: undefined,
            programMenu: undefined
         }) ;
         this.departmentSelect.setDisabledState(false);
         this.departments = this.departmentService.getDepartmentsByCollege(this.collegeSelect.value);
         this.deptOption = false;

      });
      this.departmentSelect.valueChange.subscribe(value => {
         this.programSelect.value = undefined;
         this.form.patchValue({
            programMenu: undefined
         }) ;
         this.academicProgramService.getAcademicProgramsByDepartment(this.departmentSelect.value).subscribe(value2 => {
            this.programs = value2;
            this.programSelect.setDisabledState(false);

         });
      });

   }

   update(): void {


      if (this.form.valid) {
         this.student.nameEn = this.form.get('nameEn')?.value.trim();
         this.student.nameAr = this.form.get('nameAr')?.value.trim();
         this.student.universityId = this.form.get('universityId')?.value;
         this.student.nationality = this.form.get('nationality')?.value.trim();
         this.student.nationalId = this.form.get('nationalId')?.value;
         this.student.phone = this.form.get('phone')?.value;
         this.student.birthDate = this.form.get('birthDate')?.value;
         this.student.universityMail = this.form.get('universityMail')?.value;
         this.student.alternativeMail = this.form.get('alternativeMail')?.value;
         this.student.parentPhone = this.form.get('parentPhone')?.value;
         this.student.level = this.form.get('level')?.value;
         // this.student.year = this.form.get('year')?.value;
         // this.student.photo = this.form.get('photo')?.value;
         this.student.collegeDTO.id = this.form.get('collegeMenu')?.value;
         // this.student.departmentDTO = new DepartmentModel();
         this.student.academicProgramDTO = new AcademicProgramModel();
         // this.student.departmentDTO.id = -1;
         this.student.academicProgramDTO.id = -1;
         // console.log(this.form.get('programMenu')?.value);
         // if (this.form.get('departmentMenu')?.value != -1 && this.form.get('departmentMenu')?.value != null) {
         this.student.departmentDTO.id = this.form.get('departmentMenu')?.value;
         // }
         if (this.form.get('programMenu')?.value != -1 && this.form.get('programMenu')?.value != null) {
         this.student.academicProgramDTO.id = this.form.get('programMenu')?.value;
         }
         this.student.id = this.data.st.id;
         console.log(this.student);

         // if (this.imgFlage === 1) {
         //    this.form.controls.photo.setValue('Student-' + this.student.id + this.photoInput.nativeElement.files[0].name);
         //    this.student.photo = this.form.get('photo')?.value;
         //    this.studentManagementService.upload(this.photoFile, this.student.photo).pipe(take(1)).subscribe();
         //    this.imgFlage = 0;
         // }

         this.studentManagementService.updateStudent(this.student).subscribe(() => {
               this.snackBar.open('Student Updated Successfully', undefined, {
                  duration: 3000,
                  panelClass: 'successSnackBar'
               });
               this.studentManagementService.studentCloseUpdateEvent.next();
            }, error => {
               const formControl = this.form.get(error.error.field);
               this.errorMessage = error.error.message;
               console.log(error.error.field);
               console.log(this.errorMessage);
               if (formControl) {
                  formControl.setErrors({
                     serverError: true
                  });
               }
               this.snackBar.open('Failed To Update Student', undefined, {duration: 3000});
               this.errorr = true;
            }
         );
      }
   }

   edit(): void {
      this.form.enable();
      this.isDisabled = false;
      this.data.sel = 1;

   }

   cancel(): void {
      this.studentManagementService.studentCloseUpdateEvent.next();
   }

   // onChange(): void {
   //    this.photoFile = this.photoInput.nativeElement.files[0];
   //    this.studentManagementService.upload(this.photoFile, 'Student-' + this.student.id + this.photoInput.nativeElement.files[0].name).pipe(take(1)).subscribe(() => {
   //          this.url = Constants.StudentImgUrl + 'Student-' + this.student.id + this.photoInput.nativeElement.files[0].name;
   //       }
   //    );
   //    this.imgFlage = 1;
   // }
}



