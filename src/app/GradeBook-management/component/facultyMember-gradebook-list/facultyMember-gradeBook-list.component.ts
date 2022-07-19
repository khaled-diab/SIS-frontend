import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {GradeBookModel} from '../../../shared/model/gradebook-management/gradeBook-model';
// @ts-ignore
import {GradeBookManagementService} from '../../service/gradeBook-management.service';
import {PageRequest} from '../../../shared/model/page-request';


@Component({
   selector: 'app-facultyMember-gradeBook-list',
   templateUrl: './facultyMember-gradeBook-list.component.html',
   styleUrls: ['./facultyMember-gradeBook-list.component.css']
})
export class FacultyMemberGradeBookListComponent implements OnInit, OnDestroy {

   tableData: PageRequest<GradeBookModel>;
   displayedColumns = ['No.', 'university_id', 'name_ar', 'finalExamGrade', 'practicalGrade', 'oralGrade', 'midGrade'];
   pageIndex = 0;
   defaultPgeSize = 50;
   subscriptionList: Subscription[] = [];
   gradeBook = new GradeBookModel();

   constructor(private gradeBookManagementService: GradeBookManagementService) {
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
