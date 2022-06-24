import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FacultyMemberManagementService} from '../../service/facultyMember-management.service';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DepartmentModel} from '../../../shared/model/department-management/department-model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FacultyMemberModel} from '../../../shared/model/facultyMember-management/facultyMember-model';
import {DegreeModel} from '../../../shared/model/Degree-management/degree-model';
import {Constants} from '../../../shared/constants';
import {take} from 'rxjs/operators';
import {CollegeManagementService} from '../../../college-management/service/college-management.service';
import {DepartmentService} from '../../../department-management/service/department.service';
import {MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-preview-facultyMember',
  templateUrl: './preview-facultyMember.component.html',
  styleUrls: ['./preview-facultyMember.component.css']
})
export class PreviewFacultyMemberComponent implements OnInit {
  isDisabled = true;
  facultyMember = new FacultyMemberModel();
  colleges: CollegeModel[];
  college = new CollegeModel();
  departments: DepartmentModel[];
  degrees: DegreeModel[];
  errorMessage: string;
  @ViewChild('collegeSelect', {static: true}) collegeSelect: MatSelect;
  @ViewChild('departmentSelect', {static: true}) departmentSelect: MatSelect;
  @ViewChild('photoInput') photoInput: ElementRef;
  @ViewChild('img') img: ElementRef;

  form: FormGroup;
  photoFile: any;
  url: string;
  imgFlag = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: FacultyMemberModel,
              private facultyMemberManagementService: FacultyMemberManagementService,
              private snackBar: MatSnackBar,
              private collegeManagementService: CollegeManagementService,
              private departmentService: DepartmentService) {
  }

  ngOnInit(): void {
    this.facultyMember = this.data;
    this.college = this.data.collegeDTO;
    this.url = Constants.FacultyMemberImgUrl + this.facultyMember.photo;
    this.form = new FormGroup({
        nameEn: new FormControl(this.facultyMember.nameEn, Validators.compose([Validators.required,
          Validators.pattern(Constants.ENGLISH_CHARACTERS)])),
        nameAr: new FormControl(this.facultyMember.nameAr, Validators.compose([Validators.required,
          Validators.pattern(Constants.ARABIC_CHARACTERS)])),
        nationality: new FormControl(this.facultyMember.nationality, Validators.required),
        nationalId: new FormControl(this.facultyMember.nationalID, Validators.compose([Validators.required,
          Validators.pattern(Constants.DIGITS_ONLY_14)])),
        phone: new FormControl(this.facultyMember.phone, Validators.compose([Validators.required,
          Validators.pattern(Constants.DIGITS_ONLY_11)])),
        birthDate: new FormControl(this.facultyMember.birthDate, Validators.required),
        universityMail: new FormControl(this.facultyMember.universityMail, Validators.compose([Validators.required,
          Validators.email])),
        alternativeMail: new FormControl(this.facultyMember.alternativeMail, Validators.email),
        photo: new FormControl(this.facultyMember.photo),
        degreeMenu: new FormControl(this.facultyMember.degreeDTO.id, Validators.required),
        collegeMenu: new FormControl(this.facultyMember.collegeDTO.id, Validators.required),
        departmentMenu: new FormControl(this.facultyMember.departmentDTO.id, Validators.required),
      }
    );

    console.log(this.facultyMember);

    this.facultyMemberManagementService.getAllDegrees().subscribe(Response => {
      this.degrees = Response;
    });
    this.collegeManagementService.getAllColleges().subscribe(Response => {
      this.colleges = Response;
      this.departments = this.departmentService.getDepartmentsByCollege(this.college.id);
    });
    this.form.disable();
    this.isDisabled = true;
  }

  ngAfterViewInit(): void {
    this.collegeSelect.valueChange.subscribe(value => {
      if (this.collegeSelect.value !== undefined) {
        this.departmentSelect.setDisabledState(false);
        this.departments = this.departmentService.getDepartmentsByCollege(this.collegeSelect.value.id);
      } else {
        this.departmentSelect.setDisabledState(true);
      }
    });
  }

  edit(): void {
    this.form.enable();
    this.isDisabled = false;
  }

  update(): void {
    console.log(this.facultyMember);

    if (this.form.valid) {
      this.facultyMember.nameEn = this.form.get('nameEn')?.value;
      this.facultyMember.nameAr = this.form.get('nameAr')?.value;
      this.facultyMember.nationality = this.form.get('nationality')?.value;
      this.facultyMember.nationalID = this.form.get('nationalId')?.value;
      this.facultyMember.phone = this.form.get('phone')?.value;
      this.facultyMember.birthDate = this.form.get('birthDate')?.value;
      this.facultyMember.universityMail = this.form.get('universityMail')?.value;
      this.facultyMember.alternativeMail = this.form.get('alternativeMail')?.value;
      this.facultyMember.photo = this.form.get('photo')?.value;
      this.facultyMember.degreeDTO.id = this.form.get('degreeMenu')?.value;
      this.facultyMember.collegeDTO.id = this.form.get('collegeMenu')?.value;
      this.facultyMember.departmentDTO.id = this.form.get('departmentMenu')?.value;
      this.facultyMember.id = this.data.id;

      if (this.imgFlag === 1) {
        this.facultyMemberManagementService.upload(this.photoFile, this.facultyMember.photo).pipe(take(1)).subscribe(
          value => {
          }

          , error => {
            console.log(error);
          }
        );
        this.imgFlag = 0;
      }

    }

    this.facultyMemberManagementService.updateFacultyMember(this.facultyMember).subscribe((Response) => {
        this.snackBar.open('Faculty Member Updated Successfully', undefined, {
          duration: 2000,
          panelClass: 'successSnackBar'
        });
        this.facultyMemberManagementService.facultyMemberCloseUpdateEvent.next();
      }, error => {
        const formControl = this.form.get(error.error.field);
        this.errorMessage = error.error.message;
        if (formControl) {
          formControl.setErrors({
            serverError: true
          });
        }
        this.snackBar.open('Failed To Update Faculty Member', undefined, {duration: 2000});
      }
    );
  }

  cancel(): void {
    this.facultyMemberManagementService.facultyMemberCloseUpdateEvent.next();
  }

  onChange(): void {
    this.photoFile = this.photoInput.nativeElement.files[0];
    this.facultyMemberManagementService.upload(this.photoFile, this.photoInput.nativeElement.files[0].name).pipe(take(1)).subscribe(() => {
        this.url = Constants.FacultyMemberImgUrl + this.photoInput.nativeElement.files[0].name;
      }
    );
    this.form.controls.photo.setValue('FacultyMember-' + this.facultyMember.id + this.photoInput.nativeElement.files[0].name);
    this.imgFlag = 1;
  }
}
