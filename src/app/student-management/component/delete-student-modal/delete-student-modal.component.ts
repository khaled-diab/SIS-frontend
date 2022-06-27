import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {CollegeManagementService} from '../../../college-management/service/college-management.service';
import {StudentManagementService} from '../../service/student-management.service';

@Component({
   selector: 'app-delete-student-modal',
   templateUrl: './delete-student-modal.component.html',
   styleUrls: ['./delete-student-modal.component.css']
})
export class DeleteStudentModalComponent implements OnInit , OnDestroy, AfterViewInit {
   public id: number;
   constructor(private bsModalRef: BsModalRef, private studentManagementService: StudentManagementService) {
   }
   ngOnInit(): void {
   }

   ngAfterViewInit(): void{

   }


   close(): void {
      this.bsModalRef.hide();
   }

   deleteStudent(): void {
      this.studentManagementService.studentDeleteEvent.next(this.id);
      this.bsModalRef.hide();
   }
   ngOnDestroy(): void {
      // this.studentManagementService.studentDeleteSubscription.unsubscribe();
   }
}

