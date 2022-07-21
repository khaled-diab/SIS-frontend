import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FacultyMemberModel} from '../../../shared/model/facultyMember-management/facultyMember-model';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {DepartmentModel} from '../../../shared/model/department-management/department-model';
import {DegreeModel} from '../../../shared/model/Degree-management/degree-model';
import {MatSelect} from '@angular/material/select';
import {FormControl, FormGroup, NgModel, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {
   FacultyMemberManagementService
} from '../../../facultyMember-management/service/facultyMember-management.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CollegeManagementService} from '../../../college-management/service/college-management.service';
import {DepartmentService} from '../../../department-management/service/department.service';
import {Constants} from '../../../shared/constants';
import {take} from 'rxjs/operators';
import {ProfilePasswordModel} from '../../../shared/model/security/profile-password-model';
import {StudentModel} from '../../../shared/model/student-management/student-model';
import {UserFile} from '../../../shared/model/security/user-file';
import {ProfileService} from '../../service/profile.service';
import {MessageService} from 'primeng/api';
import {SecurityService} from '../../../security/service/security.service';
import {Router} from '@angular/router';
import {UpdatePasswordComponent} from '../update-password/update-password.component';

@Component({
   selector: 'app-staff',
   templateUrl: './staff.component.html',
   styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

   facultyMember = new FacultyMemberModel();
   colleges: CollegeModel[];
   college = new CollegeModel();
   departments: DepartmentModel[];
   department: DepartmentModel;
   degrees: DegreeModel[];
   degree: DegreeModel;
   errorr = false;
   errorMessage: string;
   isPassChanged = false;
   enableChangePass = false;
   profilePasswordModel: ProfilePasswordModel = new ProfilePasswordModel();
   form: FormGroup;
   passForm: FormGroup;
   title = 'Update Faculty Member';
   loggedInUser: FacultyMemberModel;
   profilePicture: UserFile | undefined;
   profilePictureLink: string;
   @ViewChild('collegeSelect', {static: true}) collegeSelect: MatSelect;
   @ViewChild('departmentSelect', {static: true}) departmentSelect: MatSelect;
   @ViewChild('arabicName') arabicName: NgModel;
   @ViewChild('photoInput') photoInput: ElementRef;

   constructor(private facultyMemberManagementService: FacultyMemberManagementService,
               private snackBar: MatSnackBar,
               private collegeManagementService: CollegeManagementService,
               private departmentService: DepartmentService,
               private profileService: ProfileService, private messageService: MessageService,
               private securityService: SecurityService,
               private router: Router,
               private dialog: MatDialog) {
   }

   ngOnInit(): void {
      // @ts-ignore
      this.loggedInUser = JSON.parse(localStorage.getItem(Constants.loggedInUser));
      this.facultyMember = this.loggedInUser;
      this.profilePicture = this.loggedInUser?.user?.userFileList.filter(value => value.type === Constants.FILE_TYPE_PROFILE_PICTURE).pop();
      console.log(this.profilePicture);
      if (this.profilePicture) {
         this.profilePictureLink = Constants.downloadFileURL + this.profilePicture?.directories;
      } else {
         this.profilePictureLink = '../assets/defaultStudentImage.png';
      }
      this.form = new FormGroup({
            nameEn: new FormControl(this.facultyMember.nameEn, Validators.compose([Validators.required,
               Validators.pattern(Constants.ENGLISH_CHARACTERS)])),
            nameAr: new FormControl(this.facultyMember.nameAr, Validators.compose([Validators.required,
               Validators.pattern(Constants.ARABIC_CHARACTERS)])),
            nationality: new FormControl(this.facultyMember.nationality),
            nationalId: new FormControl(this.facultyMember.nationalID),
            phone: new FormControl(this.facultyMember.phone, Validators.compose([Validators.required,
               Validators.pattern(Constants.DIGITS_ONLY_11)])),
            birthDate: new FormControl(this.facultyMember.birthDate),
            universityMail: new FormControl(this.facultyMember.universityMail, Validators.compose([Validators.required,
               Validators.email])),
            alternativeMail: new FormControl(this.facultyMember.alternativeMail, Validators.email),
            degree: new FormControl(this.facultyMember.degreeDTO.nameAr),
            college: new FormControl(this.facultyMember.collegeDTO.nameEn),
            department: new FormControl(this.facultyMember.departmentDTO.nameEn)
         }
      );
      this.passForm = new FormGroup({
            oldPass: new FormControl(undefined,
               Validators.compose([Validators.required, Validators.minLength(8)])),
            newPass: new FormControl(undefined,
               Validators.compose([Validators.required, Validators.minLength(8)])),
         }
      );
   }

   update(): void {
      if (this.form.valid) {
         this.facultyMember.nameEn = this.form.get('nameEn')?.value;
         this.facultyMember.nameAr = this.form.get('nameAr')?.value;
         this.facultyMember.phone = this.form.get('phone')?.value;
         this.facultyMember.universityMail = this.form.get('universityMail')?.value;
         this.facultyMember.alternativeMail = this.form.get('alternativeMail')?.value;
      }
      console.log(this.facultyMember);
      this.facultyMemberManagementService.updateFacultyMember(this.facultyMember).subscribe((Response) => {
            this.snackBar.open('Profile Updated Successfully', undefined, {
               duration: 4000,
               panelClass: 'successSnackBar'
            });
            this.facultyMemberManagementService.facultyMemberById(this.facultyMember.id).subscribe(value => {
               this.facultyMember = value;
               localStorage.setItem(Constants.loggedInUser, JSON.stringify(value));
               this.loggedInUser = value;
            });
         }, error => {
            console.log(error);
            const formControl = this.form.get(error.error.field);
            this.errorMessage = error.error.message;
            if (formControl) {
               formControl.setErrors({
                  serverError: true
               });
            }

            this.snackBar.open('Failed To Update Profile', undefined, {duration: 4000});
            this.errorr = true;
         }
      );
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
               this.snackBar.open('Failed To Update Password', undefined, {duration: 3000});
               this.errorr = true;
            }
         );
      }
   }
   changePassword(): void{
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
