import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
// @ts-ignore
import {GradeBookManagementService} from '../../service/gradeBook-management.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {GradeBookModel} from '../../../shared/model/gradebook-management/gradeBook-model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AcademicTermModel} from '../../../shared/model/academicTerm-management/academic-term-model';
import {SectionModel} from '../../../shared/model/section-model';
import {SectionManagementService} from '../../../section-management/service/sectionManagement.service';


@Component({
   selector: 'app-facultyMember-gradeBook-list',
   templateUrl: './facultyMember-gradeBook-list.component.html',
   styleUrls: ['./facultyMember-gradeBook-list.component.css']
})
export class FacultyMemberGradeBookListComponent implements OnInit, OnDestroy {

   sectionDTO = new SectionModel();
   sectionId: any;
   termId: any;
   tableData: GradeBookModel[];
   gradeBooks: GradeBookModel[] = [];
   displayedColumns = ['No.', 'university_id', 'name_ar', 'finalExamGrade', 'practicalGrade', 'oralGrade', 'midGrade'];
   subscription: Subscription;
   form: FormGroup;
   pageIndex = 0;
   defaultPageSize = 10;
   totalCount = 0;
   @ViewChild('paginator') paginator: MatPaginator;

   constructor(private gradeBookManagementService: GradeBookManagementService,
               private sectionManagementService: SectionManagementService,
               private snackBar: MatSnackBar) {
   }

   ngOnInit(): void {
      this.form = new FormGroup({
            academicTerm: new FormControl(this.termId, Validators.required),
            section: new FormControl(this.sectionDTO, Validators.required),
            finalExamGrade: new FormControl(undefined),
            practicalGrade: new FormControl(undefined),
            oralGrade: new FormControl(undefined),
            midGrade: new FormControl(undefined),
         }
      );
      this.subscription = this.gradeBookManagementService.gradeBookFilterCourseIdEvent.subscribe(array => {
         this.termId = array[0];
         this.sectionDTO = array[1];
         this.gradeBookManagementService.gradeBookFilterEvent.subscribe(gradeBookRequestModel => {
            this.gradeBookManagementService.filterGradeBook(this.pageIndex, this.defaultPageSize, gradeBookRequestModel).subscribe(gradeBooks => {
               this.tableData = gradeBooks.data;
               this.totalCount = gradeBooks.totalCount;
            });
         });
      });
   }

   pageChangeEvent(event: PageEvent): void {
      this.paginator.pageIndex = event.pageIndex;
      this.paginator.pageSize = event.pageSize;
      this.gradeBookManagementService.gradeBookFilterEvent.subscribe(gradeBookRequestModel => {
         this.gradeBookManagementService.filterGradeBook(this.paginator
            .pageIndex, this.paginator.pageSize, gradeBookRequestModel).subscribe(page => {
            this.tableData = page.data;
            this.totalCount = page.totalCount;
         });
      });
   }

   save(): any {
      this.tableData.forEach(formGradeBook => {
         const gradeBook = new GradeBookModel();
         gradeBook.academicTermDTO = new AcademicTermModel();
         gradeBook.academicTermDTO.id = this.termId;
         gradeBook.sectionDTO = new SectionModel();
         gradeBook.sectionDTO = this.sectionDTO;
         gradeBook.studentDTO = formGradeBook.studentDTO;
         gradeBook.finalExamGrade = this.form.get('finalExamGrade')?.value;
         gradeBook.midGrade = this.form.get('midGrade')?.value;
         gradeBook.practicalGrade = this.form.get('practicalGrade')?.value;
         gradeBook.oralGrade = this.form.get('oralGrade')?.value;
         console.log(gradeBook);
         this.gradeBooks.push(gradeBook);
      });


      this.gradeBookManagementService.updateGradeBook(this.gradeBooks).subscribe(value => {
         this.snackBar.open('GradeBook Updated Successfully', undefined, {
            duration: 4000,
            panelClass: 'successSnackBar'
         });
      }, error => {
         this.snackBar.open('Failed To Update GradeBook', undefined, {duration: 4000});
      });
   }

   ngOnDestroy(): void {
      this.subscription.unsubscribe();
   }

}
