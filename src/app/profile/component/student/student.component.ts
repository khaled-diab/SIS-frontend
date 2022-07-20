import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {StudentModel} from '../../../shared/model/student-management/student-model';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {DepartmentModel} from '../../../shared/model/department-management/department-model';
import {AcademicProgramModel} from '../../../shared/model/academicProgram-management/academicProgram-model';
import {Constants} from '../../../shared/constants';
import {FormControl, FormGroup, NgModel, Validators} from '@angular/forms';
import {MatSelect} from '@angular/material/select';
import {
   StudentManagementService,

} from '../../../student-management/service/student-management.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CollegeManagementService} from '../../../college-management/service/college-management.service';
import {DepartmentService} from '../../../department-management/service/department.service';
import {AcademicProgramService} from '../../../academic-program/service/academic-program.service';

import {UserFile} from '../../../shared/model/security/user-file';
import {ProfileService} from '../../service/profile.service';
import {MessageService} from 'primeng/api';
import {SecurityService} from '../../../security/service/security.service';
import {ProfilePasswordModel} from '../../../shared/model/security/profile-password-model';
import {Router} from '@angular/router';

@Component({
   selector: 'app-student',
   templateUrl: './student.component.html',
   styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

   isDisabled = true;
   student: StudentModel = new StudentModel();
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
   @ViewChild('photoInput') photoInput: ElementRef;
   @ViewChild('collegeSelect', {static: true}) collegeSelect: MatSelect;
   @ViewChild('departmentSelect', {static: true}) departmentSelect: MatSelect;
   @ViewChild('programSelect', {static: true}) programSelect: MatSelect;
   deptOption = false;
   @ViewChild('img') img: ElementRef;
   form: FormGroup;
   passForm: FormGroup;
   title = 'Update Student';
   loggedInUser: StudentModel;
   profilePicture: UserFile | undefined;
   profilePictureLink: string;
   typeAdmin = Constants.ADMIN_TYPE;
   isPassChanged = false;
   enableChangePass = false;
   profilePasswordModel: ProfilePasswordModel = new ProfilePasswordModel();

   constructor(private studentManagementService: StudentManagementService,
               private snackBar: MatSnackBar,
               private collegeManagementService: CollegeManagementService,
               private departmentService: DepartmentService,
               private academicProgramService: AcademicProgramService,
               private profileService: ProfileService, private messageService: MessageService,
               private securityService: SecurityService,
               private router: Router) {
   }

   ngOnInit(): void {

      // @ts-ignore
      this.loggedInUser = JSON.parse(localStorage.getItem(Constants.loggedInUser));
      this.student = this.loggedInUser;
      this.profilePicture = this.loggedInUser?.user?.userFileList.filter(value => value.type === Constants.FILE_TYPE_PROFILE_PICTURE).pop();
      console.log(this.profilePicture);
      if (this.profilePicture) {
         this.profilePictureLink = Constants.downloadFileURL + this.profilePicture?.directories;
      } else {
         this.profilePictureLink = '../assets/defaultStudentImage.png';
      }

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
            photo: new FormControl(this.student.photo),
            collegeMenu: new FormControl(this.student.collegeDTO?.id, Validators.required),
            departmentMenu: new FormControl(this.student.departmentDTO?.id, Validators.required),
            programMenu: new FormControl(this.student.academicProgramDTO?.id),

         }
      );
      this.passForm = new FormGroup({

            oldPass: new FormControl(undefined, Validators.compose([Validators.required, Validators.minLength(8)])),
            newPass: new FormControl(undefined, Validators.compose([Validators.required, Validators.minLength(8)])),

         }
      );

      this.college = this.student.collegeDTO;
      this.department = this.student.departmentDTO;
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
         });
         this.departmentSelect.setDisabledState(false);
         this.departments = this.departmentService.getDepartmentsByCollege(this.collegeSelect.value);
         this.deptOption = false;

      });
      this.departmentSelect.valueChange.subscribe(value => {
         this.programSelect.value = undefined;
         this.form.patchValue({
            programMenu: undefined
         });
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
         this.student.photo = this.form.get('photo')?.value;
         this.student.collegeDTO.id = this.form.get('collegeMenu')?.value;
         this.student.academicProgramDTO = new AcademicProgramModel();
         this.student.academicProgramDTO.id = -1;

         this.student.departmentDTO.id = this.form.get('departmentMenu')?.value;
         if (this.form.get('programMenu')?.value != -1 && this.form.get('programMenu')?.value != null) {
            this.student.academicProgramDTO.id = this.form.get('programMenu')?.value;
         }


         this.studentManagementService.updateStudent(this.student).subscribe(() => {
               this.snackBar.open('Profile Updated Successfully', undefined, {
                  duration: 3000,
                  panelClass: 'successSnackBar'
               });

               this.studentManagementService.getStudent(this.student.id).subscribe(value => {
                  this.student = value;
                  localStorage.setItem(Constants.loggedInUser, JSON.stringify(value));
                  this.loggedInUser = value;
               });
            }
            , error => {
               const formControl = this.form.get(error.error.field);
               this.errorMessage = error.error.message;
               console.log(error.error.field);
               console.log(this.errorMessage);
               if (formControl) {
                  formControl.setErrors({
                     serverError: true
                  });
               }
               this.snackBar.open('Failed To Update Profile', undefined, {duration: 3000});
               this.errorr = true;
            }
         );
      }
   }


   cancel(): void {
      this.router.navigateByUrl('/');
   }

   uploadPhoto(event: any): void {
      this.profileService.uploadProfilePictureNoEvent(this.photoInput.nativeElement.files[0], this.loggedInUser.user.email).subscribe(response => {
         const profilePicture = new UserFile(response.message, null, Constants.FILE_TYPE_PROFILE_PICTURE, null, null);
         if (this.loggedInUser.user.userFileList.length === 0) {
            this.loggedInUser.user.userFileList.push(profilePicture);
            this.profilePicture = profilePicture;
         } else {
            this.loggedInUser.user.userFileList.map(value => {
               if (value.type === Constants.FILE_TYPE_PROFILE_PICTURE) {
                  value.directories = response.message;
                  this.profilePicture = profilePicture;
               }
               return value;
            });
         }
         this.profilePictureLink = Constants.downloadFileURL + this.profilePicture?.directories;
         this.profileService.updateProfilePictureEvent.next(this.profilePictureLink);
         localStorage.removeItem(Constants.loggedInUser);
         localStorage.setItem(Constants.loggedInUser, JSON.stringify(this.loggedInUser));
      }, _ => {
         this.messageService.add({severity: 'error', summary: 'Error', detail: 'Upload Failed'});
      });
   }

   updatePass(): void {
      if (this.passForm.valid) {
         this.profilePasswordModel.oldPass = this.passForm.get('oldPass')?.value.trim();
         this.profilePasswordModel.newPass = this.passForm.get('newPass')?.value.trim();
         this.profilePasswordModel.userName = this.loggedInUser.user.email;


         this.securityService.changePassword(this.profilePasswordModel).subscribe((value) => {
               this.snackBar.open('Password Updated Successfully', undefined, {
                  duration: 3000,
                  panelClass: 'successSnackBar'
               });
            }
            , error => {
               // const formControl = this.form.get(error.error.field);
               // this.errorMessage = error.error.message;
               // console.log(error.error.field);
               // console.log(this.errorMessage);
               // if (formControl) {
               //    formControl.setErrors({
               //       serverError: true
               //    });
               // }
               this.snackBar.open('Failed To Update Password', undefined, {duration: 3000});
               this.errorr = true;
            }
         );
      }
   }
}



