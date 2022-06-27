import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StudentModel} from '../../../shared/model/student-management/student-model';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {DepartmentModel} from '../../../shared/model/department-management/department-model';
import {AcademicProgramModel} from '../../../shared/model/academicProgram-management/academicProgram-model';
import {FormControl, FormGroup, NgModel, Validators} from '@angular/forms';
import {StudentManagementService} from '../../service/student-management.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {Constants} from '../../../shared/constants';
import {take} from 'rxjs/operators';
import {CollegeManagementService} from '../../../college-management/service/college-management.service';
import {MatSelect} from '@angular/material/select';
import {DepartmentService} from '../../../department-management/service/department.service';
import {HttpClient} from '@angular/common/http';
import {AcademicProgramService} from "../../../academic-program/service/academic-program.service";

@Component({
   selector: 'app-add-student',
   templateUrl: './add-student.component.html',
   styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit, AfterViewInit {


   header = 'Preview Student';
   student = new StudentModel();
   colleges: CollegeModel[];
   college = new CollegeModel();
   departments: DepartmentModel[];
   programs: AcademicProgramModel[];
   department: DepartmentModel;
   years: string[];
   levels: string[];
   errorMessage: string;
   @ViewChild('arabicName') arabicName: NgModel;
   @ViewChild('photoInput') photoInput: ElementRef;
   @ViewChild('Form2') Form2Element: ElementRef;
   @ViewChild('collegeList', {static: true}) collegeList: MatSelect;
   @ViewChild('departmentMenu', {static: true}) departmentMenu: MatSelect;
   @ViewChild('programMenu', {static: true}) programMenu: MatSelect;

   form: FormGroup;
   deptOption = false;
   photoFile: any;
   url: string;
   imgFlage = 0;
   private httpClient: HttpClient;
   constructor(private studentManagementService: StudentManagementService,
               private snackBar: MatSnackBar,
               private route: Router,
               private collegeManagementService: CollegeManagementService,
               private departmentService: DepartmentService,
               private academicProgramService: AcademicProgramService,
               http: HttpClient){this.httpClient = http; }


   ngOnInit(): void {
      this.programMenu.setDisabledState(true);
      this.departmentMenu.setDisabledState(true);

      this.url = '../assets/defaultStudentImage.png';
      this.form = new FormGroup({

            nameEn: new FormControl(undefined, Validators.compose([Validators.required,
               Validators.pattern(Constants.ENGLISH_CHARACTERS)])),
            nameAr: new FormControl(undefined, Validators.compose([Validators.required,
               Validators.pattern(Constants.ARABIC_CHARACTERS)])),
            universityId: new FormControl(undefined, Validators.compose([Validators.required, Validators.min(0),
               Validators.pattern(Constants.DIGITS_ONLY)])),
            nationality: new FormControl(undefined, [Validators.required, Validators.pattern(Constants.ENGLISH_CHARACTERS)]),
            nationalId: new FormControl(undefined, Validators.compose([Validators.required,
               Validators.pattern(Constants.DIGITS_ONLY_14)])),
            phone: new FormControl(undefined, Validators.compose([Validators.required,
               Validators.pattern(Constants.DIGITS_ONLY_11)])),
            birthDate: new FormControl(undefined, Validators.required),
            universityMail: new FormControl(undefined, Validators.compose([Validators.required,
               Validators.email])),
            alternativeMail: new FormControl(undefined, Validators.email),
            parentPhone: new FormControl(undefined, Validators.pattern(Constants.DIGITS_ONLY_11)),
            level: new FormControl(undefined ),
            year: new FormControl(undefined, Validators.required),
            photo: new FormControl(undefined ),
            collegeMenu: new FormControl(undefined, Validators.required),
            departmentMenu: new FormControl(undefined, Validators.required),
            programMenu: new FormControl(undefined, Validators.required),

         }
      );
      this.form.controls.photo.setValue('defaultStudentImage.png');

      this.levels = ['1', '2', '3', '4', '5', '6'];
      this.years = ['First Year', 'Second Year', 'Third Year', 'Fourth Year', 'Fifth Year', 'Sixth Year', 'Seventh Year'];
      this.collegeManagementService.getAllColleges().subscribe(Response => {
         this.colleges = Response;
      });
   }
   ngAfterViewInit(): void {

      this.collegeList.valueChange.subscribe(value => {
         if (this.collegeList.value !== undefined) {
            this.departmentMenu.setDisabledState(false);
         } else {
            this.departmentMenu.setDisabledState(true);
            this.departmentMenu.value = undefined;
         }
         this.departments = this.departmentService.getDepartmentsByCollege(this.collegeList.value.id);

         this.deptOption = false;

      });
      this.departmentMenu.valueChange.subscribe(value => {

         this.programMenu.setDisabledState(false);
         this.programs = this.academicProgramService.getAcademicProgramsByDepartment(this.departmentMenu.value.id);
      });
   }
   add(): void {
      if (this.form.invalid){

      }
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
         this.student.year = this.form.get('year')?.value;
         this.student.departmentDTO = new DepartmentModel();
         this.student.collegeDTO = new CollegeModel();
         this.student.academicProgramDTO = new AcademicProgramModel();
         this.student.collegeDTO = this.form.get('collegeMenu')?.value;
         this.student.departmentDTO = this.form.get('departmentMenu')?.value;
         this.student.academicProgramDTO = this.form.get('programMenu')?.value;
         this.student.photo = this.form.get('photo')?.value;
         if (this.imgFlage === 1) {
            this.form.controls.photo.setValue('Student-' + this.student.id + this.photoInput.nativeElement.files[0].name);
            this.student.photo = this.form.get('photo')?.value;
            //  this.httpClient.get(this.url, { responseType: 'blob' })
            // .subscribe(data => {
            //     this.photoFile = data;
            this.studentManagementService.upload(this.photoFile, this.student.photo).pipe(take(1)).subscribe(
               value => {
               }
               , error => {
                  // console.log(error);
               }
            );
            this.imgFlage = 0;
         }else{
            this.student.photo = Constants.defaultStudentImgUrl;
         }
         // );

         this.studentManagementService.addStudent(this.student).subscribe((Response) => {
               this.snackBar.open('Student Added Successfully', undefined, {duration: 2000, panelClass: 'successSnackBar'});
               this.route.navigate(['/students-management', 'student-list']);
            }, error => {
               const formControl = this.form.get(error.error.field);

               this.errorMessage = error.error.message;
               if (formControl) {
                  formControl.setErrors({
                     serverError: true
                  });
               }
               this.snackBar.open('Failed To Add Student', undefined, {duration: 2000});
            }
         );
      }

   }

   cancel(): void {
      this.studentManagementService.studentCloseAddEvent.next();

   }

   onChange(): void {
      this.photoFile = this.photoInput.nativeElement.files[0];
      this.studentManagementService.upload(this.photoFile, this.photoInput.nativeElement.files[0].name).pipe(take(1)).subscribe(() => {
            this.url = Constants.StudentImgUrl + this.photoInput.nativeElement.files[0].name;

         }
      );
      this.imgFlage = 1;
   }
}


