import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {GradeBookService} from '../../service/gradeBook.service';
import {FormGroup} from '@angular/forms';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {GradeBookModel} from '../../../shared/model/gradebook-management/gradeBook-model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SectionModel} from '../../../shared/model/section-model';
import {SectionManagementService} from '../../../section-management/service/sectionManagement.service';
import {GradeBookRequestModel} from '../../../shared/model/gradebook-management/gradeBook-request-model';

@Component({
   selector: 'app-facultyMember-gradeBook-list',
   templateUrl: './facultyMember-gradeBook-list.component.html',
   styleUrls: ['./facultyMember-gradeBook-list.component.css']
})
export class FacultyMemberGradeBookListComponent implements OnInit, OnDestroy {

   sectionDTO = new SectionModel();
   sectionId: any;
   gradeBooks: GradeBookModel[] = [];
   displayedColumns = ['No.', 'university_id', 'name_ar', 'finalExamGrade', 'practicalGrade', 'oralGrade', 'midGrade', 'totalGrade'];
   subscription: Subscription;
   form: FormGroup;
   pageIndex = 0;
   defaultPageSize = 10;
   totalCount = 0;
   @ViewChild('paginator') paginator: MatPaginator;
   gradeBookRequestModel: GradeBookRequestModel = new GradeBookRequestModel();

   constructor(private gradeBookManagementService: GradeBookService,
               private sectionManagementService: SectionManagementService,
               private snackBar: MatSnackBar) {
   }

   ngOnInit(): void {
      this.subscription = this.gradeBookManagementService.gradeBookFilterEvent.subscribe(array => {
         this.sectionDTO = array[1];
         if (array[0] === undefined) {
            this.gradeBooks = [];
         } else {
            this.sectionDTO = array[1];
            this.gradeBookRequestModel = array[0];
            this.gradeBookManagementService.filterGradeBook(this.pageIndex, this.defaultPageSize, this.gradeBookRequestModel).subscribe(gradeBooks => {
               this.gradeBooks = gradeBooks.data;
               this.totalCount = gradeBooks.totalCount;
            });
         }
      });
   }

   pageChangeEvent(event: PageEvent): void {
      this.paginator.pageIndex = event.pageIndex;
      this.paginator.pageSize = event.pageSize;
      this.gradeBookManagementService.filterGradeBook(this.paginator
         .pageIndex, this.paginator.pageSize, this.gradeBookRequestModel).subscribe(page => {
         this.gradeBooks = page.data;
         this.totalCount = page.totalCount;
      });
   }

   save(): any {
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
