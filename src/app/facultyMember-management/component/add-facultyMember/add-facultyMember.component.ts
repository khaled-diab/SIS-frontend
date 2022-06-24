import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {DepartmentModel} from '../../../shared/model/department-management/department-model';
import {FormControl, FormGroup, NgModel, Validators} from '@angular/forms';
import {FacultyMemberManagementService} from '../../service/facultyMember-management.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {FacultyMemberModel} from '../../../shared/model/facultyMember-management/facultyMember-model';
import {DegreeModel} from '../../../shared/model/Degree-management/degree-model';
import {Constants} from '../../../shared/constants';
import {CollegeManagementService} from '../../../college-management/service/college-management.service';
import {take} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {MatSelect} from '@angular/material/select';
import {DepartmentService} from '../../../department-management/service/department.service';

@Component({
  selector: 'app-add-facultyMember',
  templateUrl: './add-facultyMember.component.html',
  styleUrls: ['./add-facultyMember.component.css']
})
export class AddFacultyMemberComponent implements OnInit {

  private httpClient: HttpClient;
  facultyMember = new FacultyMemberModel();
  colleges: CollegeModel[];
  college = new CollegeModel();
  departments: DepartmentModel[];
  degrees: DegreeModel[];
  errorMessage: string;
  @ViewChild('collegeSelect', {static: true}) collegeSelect: MatSelect;
  @ViewChild('departmentSelect', {static: true}) departmentSelect: MatSelect;
  @ViewChild('arabicName') arabicName: NgModel;
  @ViewChild('photoInput') photoInput: ElementRef;
  form: FormGroup;
  photoFile: any;
  url: string;
  imgFlag = 0;

  constructor(private facultyMemberManagementService: FacultyMemberManagementService,
              private snackBar: MatSnackBar,
              private route: Router,
              private collegeManagementService: CollegeManagementService,
              private departmentService: DepartmentService,
              http: HttpClient) {
    this.httpClient = http;
  }

  ngOnInit(): void {
    this.url = '../assets/defaultStudentImage.png';
    this.form = new FormGroup({
        nameEn: new FormControl(undefined, Validators.compose([Validators.required,
          Validators.pattern(Constants.ENGLISH_CHARACTERS)])),
        nameAr: new FormControl(undefined, Validators.compose([Validators.required,
          Validators.pattern(Constants.ARABIC_CHARACTERS)])),
        nationality: new FormControl(undefined, Validators.required),
        nationalId: new FormControl(undefined, Validators.compose([Validators.required,
          Validators.pattern(Constants.DIGITS_ONLY_14)])),
        phone: new FormControl(undefined, Validators.compose([Validators.required,
          Validators.pattern(Constants.DIGITS_ONLY_11)])),
        birthDate: new FormControl(undefined, Validators.required),
        universityMail: new FormControl(undefined, Validators.compose([Validators.required,
          Validators.email])),
        alternativeMail: new FormControl(undefined, Validators.email),
        photo: new FormControl(undefined),
        degreeMenu: new FormControl(undefined, Validators.required),
        collegeMenu: new FormControl(undefined, Validators.required),
        departmentMenu: new FormControl(undefined, Validators.required),
      }
    );
    this.form.controls.photo.setValue('defaultStudentImage.png');

    this.facultyMemberManagementService.getAllDegrees().subscribe(Response => {
      this.degrees = Response;
    });

    this.collegeManagementService.getAllColleges().subscribe(Response => {
      this.colleges = Response;
    });
    this.departmentService.getDepartments();
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

  add(): void {
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
      this.httpClient.get(this.url, {responseType: 'blob'})
        .subscribe(data => {
          this.photoFile = data;
          this.facultyMemberManagementService.upload(this.photoFile, this.facultyMember.photo).pipe(take(1)).subscribe(
            value => {
            }
            , error => {
              console.log(error);
            }
          );
        });
      console.log(this.form.get('collegeMenu')?.value);
      this.facultyMember.degreeDTO = new DegreeModel();
      this.facultyMember.degreeDTO = this.form.get('degreeMenu')?.value;
      this.facultyMember.collegeDTO = new CollegeModel();
      this.facultyMember.collegeDTO = this.form.get('collegeMenu')?.value;
      this.facultyMember.departmentDTO = new DepartmentModel();
      this.facultyMember.departmentDTO = this.form.get('departmentMenu')?.value;
      console.log(this.facultyMember);
    }

    this.facultyMemberManagementService.addFacultyMember(this.facultyMember).subscribe((Response) => {
        this.snackBar.open('Faculty Member Added Successfully', undefined, {
          duration: 2000,
          panelClass: 'successSnackBar'
        });
        this.route.navigate(['/facultyMembers-management', 'facultyMember-list']);
      }, error => {
        const formControl = this.form.get(error.error.field);
        this.errorMessage = error.error.message;
        if (formControl) {
          formControl.setErrors({
            serverError: true
          });
        }
        this.snackBar.open('Failed To Add Faculty Member', undefined, {duration: 2000});
      }
    );
  }

  cancel(): void {
    this.route.navigate(['/facultyMembers-management', 'facultyMember-list']);
  }

  onChange(): void {
    this.photoFile = this.photoInput.nativeElement.files[0];
    this.facultyMemberManagementService.upload(this.photoFile, this.photoInput.nativeElement.files[0].name).pipe(take(1)).subscribe(() => {
        this.url = Constants.StudentImgUrl + this.photoInput.nativeElement.files[0].name;
        console.log(this.url);
      }
    );
    this.form.controls.photo.setValue('FacultyMember-' + this.facultyMember.id + this.photoInput.nativeElement.files[0].name);
    this.imgFlag = 1;
  }

}
