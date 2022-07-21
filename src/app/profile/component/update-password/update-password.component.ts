import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {StudentModel} from '../../../shared/model/student-management/student-model';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {DepartmentModel} from '../../../shared/model/department-management/department-model';
import {AcademicProgramModel} from '../../../shared/model/academicProgram-management/academicProgram-model';
import {Constants} from '../../../shared/constants';
import {FormControl, FormGroup, NgModel, Validators} from '@angular/forms';
import {MatSelect} from '@angular/material/select';
import {UserFile} from '../../../shared/model/security/user-file';
import {ProfilePasswordModel} from '../../../shared/model/security/profile-password-model';
import {StudentManagementService} from '../../../student-management/service/student-management.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CollegeManagementService} from '../../../college-management/service/college-management.service';
import {DepartmentService} from '../../../department-management/service/department.service';
import {AcademicProgramService} from '../../../academic-program/service/academic-program.service';
import {ProfileService} from '../../service/profile.service';
import {MessageService} from 'primeng/api';
import {SecurityService} from '../../../security/service/security.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {


   student: StudentModel = new StudentModel();
   errorr = false;
   errorMessage: string;
   passForm: FormGroup;
   loggedInUser: StudentModel;
   isPassChanged = false;
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
     this.passForm = new FormGroup({

           oldPass: new FormControl(undefined, Validators.compose([Validators.required, Validators.minLength(8)])),
           newPass: new FormControl(undefined, Validators.compose([Validators.required, Validators.minLength(8)])),

        }
     );
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
               this.profileService.closeUpdatePasswordEvent.next();
            }
            , error => {
               const formControl = this.passForm.get(error.error.field);
               this.errorMessage = error.error.message;
               if (formControl) {
                  formControl.setErrors({
                     serverError: true
                  });
               }
               this.snackBar.open('Failed To Update Password', undefined, {duration: 3000});
               this.errorr = true;
            }
         );
      }
   }
   cancel(): void{
      this.profileService.closeUpdatePasswordEvent.next(1);
   }
}
