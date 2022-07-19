import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {GradeBookModel} from '../../../shared/model/gradebook-management/gradeBook-model';
import {GradeBookManagementService} from '../../service/gradeBook-management.service';
import {PageRequest} from '../../../shared/model/page-request';
import {Constants} from '../../../shared/constants';
import {GradeBookRequestModel} from '../../../shared/model/gradebook-management/gradeBook-request-model';

@Component({
   selector: 'app-student-gradeBook-list',
   templateUrl: './student-gradeBook-list.component.html',
   styleUrls: ['./student-gradeBook-list.component.css']
})
export class StudentGradeBookListComponent implements OnInit, OnDestroy {

   student: any;
   tableData: PageRequest<GradeBookModel>;
   displayedColumns = ['No.', 'courseId', 'finalExamGrade', 'practicalGrade', 'oralGrade', 'midGrade'];
   subscriptionList: Subscription[] = [];
   gradeBookRequestModel: GradeBookRequestModel = new GradeBookRequestModel();

   constructor(private gradeBookManagementService: GradeBookManagementService) {
   }

   ngOnInit(): void {
      this.subscriptionList = this.subscriptions();
      // @ts-ignore
      this.student = JSON.parse(localStorage.getItem(Constants.loggedInUser));
      this.gradeBookRequestModel.filterStudent = this.student.id;
      this.gradeBookManagementService.gradeBookFilterEvent.next(this.gradeBookRequestModel);
   }

   private subscriptions(): Subscription[] {
      const subscriptions = [];
      subscriptions.push(this.filterEventSubscription());
      return subscriptions;
   }

   private filterEventSubscription(): Subscription {
      return this.gradeBookManagementService.gradeBookFilterEvent.subscribe(value => {
         this.gradeBookManagementService.filterGradeBook(0, 500, value).subscribe(value1 => {
            this.tableData = value1;
         });
      });
   }

   ngOnDestroy(): void {
      this.subscriptionList.forEach(sub => sub.unsubscribe());
   }
}
