import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {GradeBookService} from '../../service/gradeBook.service';
import {GradeBookStudentRecordsModel} from '../../../shared/model/gradebook-management/gradeBookStudentRecords-model';

@Component({
   selector: 'app-student-gradeBook-list',
   templateUrl: './student-gradeBook-list.component.html',
   styleUrls: ['./student-gradeBook-list.component.css']
})
export class StudentGradeBookListComponent implements OnInit, OnDestroy {

   tableData: GradeBookStudentRecordsModel[] = [];
   displayedColumns = ['No.', 'courseId', 'midGrade', 'practicalGrade', 'oralGrade', 'finalExamGrade', 'totalGrade'];
   subscriptionList: Subscription[] = [];

   constructor(private gradeBookManagementService: GradeBookService) {
   }

   ngOnInit(): void {
      this.subscriptionList = this.subscriptions();
   }

   private subscriptions(): Subscription[] {
      const subscriptions = [];
      subscriptions.push(this.filterEventSubscription());
      return subscriptions;
   }

   private filterEventSubscription(): Subscription {
      return this.gradeBookManagementService.gradeBookStudentRecordsFilterEvent.subscribe(value => {
            this.gradeBookManagementService.getGradeBooksByTermIdAndStudentId(value[0], value[1]).subscribe(list => {
               this.tableData = list;
            });
         }
      );
   }

   ngOnDestroy(): void {
      this.subscriptionList.forEach(sub => sub.unsubscribe());
   }
}
