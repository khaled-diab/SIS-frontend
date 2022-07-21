import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StudentModel} from '../../../shared/model/student-management/student-model';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {DepartmentModel} from '../../../shared/model/department-management/department-model';
import {AcademicProgramModel} from '../../../shared/model/academicProgram-management/academicProgram-model';
import {Constants} from '../../../shared/constants';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSelect} from '@angular/material/select';
import {StudentManagementService} from '../../../student-management/service/student-management.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CollegeManagementService} from '../../../college-management/service/college-management.service';
import {DepartmentService} from '../../../department-management/service/department.service';
import {AcademicProgramService} from '../../../academic-program/service/academic-program.service';

import {UserFile} from '../../../shared/model/security/user-file';
import {ProfileService} from '../../service/profile.service';
import {MessageService} from 'primeng/api';
import {SecurityService} from '../../../security/service/security.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {UpdatePasswordComponent} from '../update-password/update-password.component';
import {take} from 'rxjs/operators';

@Component({
   selector: 'app-student',
   templateUrl: './student.component.html',
   styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

   student: StudentModel = new StudentModel();
   colleges: CollegeModel[];
   college = new CollegeModel();
   departments: DepartmentModel[];
   programs: AcademicProgramModel[];
   department = new DepartmentModel();
   levels = Constants.LEVELS;
   errorr = false;
   errorMessage: string;
   @ViewChild('photoInput') photoInput: ElementRef;
   @ViewChild('collegeSelect', {static: true}) collegeSelect: MatSelect;
   @ViewChild('departmentSelect', {static: true}) departmentSelect: MatSelect;
   @ViewChild('programSelect', {static: true}) programSelect: MatSelect;
   form: FormGroup;
   loggedInUser: StudentModel;
   profilePicture: UserFile | undefined;
   profilePictureLink: string;

   constructor(private studentManagementService: StudentManagementService,
               private snackBar: MatSnackBar,
               private collegeManagementService: CollegeManagementService,
               private departmentService: DepartmentService,
               private academicProgramService: AcademicProgramService,
               private profileService: ProfileService, private messageService: MessageService,
               private securityService: SecurityService,
               private router: Router,
               private dialog: MatDialog) {
   }

   ngOnInit(): void {

      // @ts-ignore
      this.loggedInUser = JSON.parse(localStorage.getItem(Constants.loggedInUser));
      this.student = this.loggedInUser;
      this.profilePicture = this.loggedInUser?.user?.userFileList.filter(value => value.type === Constants.FILE_TYPE_PROFILE_PICTURE).pop();
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
            universityId: new FormControl(this.student.universityId),
            nationality: new FormControl(this.student.nationality),
            nationalId: new FormControl(this.student.nationalId),
            phone: new FormControl(this.student.phone, Validators.compose([Validators.required,
               Validators.pattern(Constants.DIGITS_ONLY_11)])),
            birthDate: new FormControl(this.student.birthDate),
            universityMail: new FormControl(this.student.universityMail, Validators.compose([Validators.required,
               Validators.email])),
            alternativeMail: new FormControl(this.student.alternativeMail, Validators.email),
            parentPhone: new FormControl(this.student.parentPhone, Validators.pattern(Constants.DIGITS_ONLY_11)),
            level: new FormControl(this.student.level),
            // year: new FormControl(this.student.year, Validators.required),
            collegeMenu: new FormControl(this.student.collegeDTO?.nameEn),
            departmentMenu: new FormControl(this.student.departmentDTO?.nameEn),
            programMenu: new FormControl(this.student.academicProgramDTO?.name_en),

         }
      );

      // this.department = this.student.departmentDTO;
      // this.academicProgramService.getAcademicProgramsByDepartment(this.department?.id).subscribe(value => {
      //    this.programs = value;
      // });
   }

   update(): void {
      if (this.form.valid) {
         this.student.nameEn = this.form.get('nameEn')?.value.trim();
         this.student.nameAr = this.form.get('nameAr')?.value.trim();
         this.student.phone = this.form.get('phone')?.value;
         this.student.universityMail = this.form.get('universityMail')?.value;
         this.student.alternativeMail = this.form.get('alternativeMail')?.value;
         this.student.parentPhone = this.form.get('parentPhone')?.value;
         // this.student.level = this.form.get('level')?.value;
         // this.student.academicProgramDTO.id = -1;
         // if (this.form.get('programMenu')?.value !== -1 && this.form.get('programMenu')?.value != null) {
         //    this.student.academicProgramDTO.id = this.form.get('programMenu')?.value;
         // }

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

   changePassword(): void {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '60%';
      dialogConfig.height = '450px';
      this.dialog.open(UpdatePasswordComponent, dialogConfig);
      this.profileService.closeUpdatePasswordEvent.pipe(take(1)).subscribe(value => {
            this.dialog.closeAll();
         }
      );

   }
}



