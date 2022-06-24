import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {DepartmentModel} from '../../../shared/model/department-management/department-model';
import {FormControl, FormGroup, NgModel, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FacultyMemberManagementService} from '../../service/facultyMember-management.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FacultyMemberModel} from '../../../shared/model/facultyMember-management/facultyMember-model';
import {DegreeModel} from '../../../shared/model/Degree-management/degree-model';
import {Constants} from '../../../shared/constants';
import {CollegeManagementService} from '../../../college-management/service/college-management.service';
import {take} from 'rxjs/operators';
import {MatSelect} from '@angular/material/select';
import {DepartmentService} from '../../../department-management/service/department.service';

@Component({
  selector: 'app-update-facultyMember',
  templateUrl: './update-facultyMember.component.html',
  styleUrls: ['./update-facultyMember.component.css']
})
export class UpdateFacultyMemberComponent implements OnInit {

  facultyMember = new FacultyMemberModel();
  colleges: CollegeModel[];
  college = new CollegeModel();
  departments: DepartmentModel[];
  department: DepartmentModel;
  degrees: DegreeModel[];
  degree: DegreeModel;
  errorr = false;
  errorMessage: string;
  @ViewChild('collegeSelect', {static: true}) collegeSelect: MatSelect;
  @ViewChild('departmentSelect', {static: true}) departmentSelect: MatSelect;
  @ViewChild('arabicName') arabicName: NgModel;
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

    console.log(this.data);

    this.degree = this.facultyMember.degreeDTO;
    this.college = this.data.collegeDTO;
    this.department = this.facultyMember.departmentDTO;

    this.facultyMemberManagementService.getAllDegrees().subscribe(Response => {
      this.degrees = Response;
    });
    this.collegeManagementService.getAllColleges().subscribe(Response => {
      this.colleges = Response;
      this.departments = this.departmentService.getDepartmentsByCollege(this.college.id);
    });
  }

  ngAfterViewInit(): void {
    this.collegeSelect.valueChange.subscribe(value => {
      if (this.collegeSelect.value !== undefined) {
        this.departmentSelect.setDisabledState(false);
        this.departments = this.departmentService.getDepartmentsByCollege(this.collegeSelect.value);

      } else {
        this.departmentSelect.setDisabledState(true);
      }
    });
  }

  update(): void {
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
    console.log(this.facultyMember);
    this.facultyMemberManagementService.updateFacultyMember(this.facultyMember).subscribe((Response) => {
        this.snackBar.open('Faculty Member Updated Successfully', undefined, {
          duration: 4000,
          panelClass: 'successSnackBar'
        });
        this.facultyMemberManagementService.facultyMemberCloseUpdateEvent.next();
      }, error => {
        console.log(error);
        const formControl = this.form.get(error.error.field);
        this.errorMessage = error.error.message;
        if (formControl) {
          formControl.setErrors({
            serverError: true
          });
        }

        this.snackBar.open('Failed To Update Faculty Member', undefined, {duration: 4000});
        this.errorr = true;
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
