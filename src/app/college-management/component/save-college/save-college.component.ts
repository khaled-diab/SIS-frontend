import {Component, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {CollegeManagementService} from '../../service/college-management.service';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {MessageService} from 'primeng/api';
import {NgForm} from '@angular/forms';

@Component({
   selector: 'app-create-college',
   templateUrl: './save-college.component.html',
   styleUrls: ['./save-college.component.css']
})
export class SaveCollegeComponent implements OnInit {

   @ViewChild('form') form: NgForm;
   collegeModel: CollegeModel;

   constructor(private messageService: MessageService, private bsModalRef: BsModalRef,
               private breakpointObserver: BreakpointObserver, private collegeManagementService: CollegeManagementService) {
   }

   ngOnInit(): void {
      this.breakpointObserver.observe(Breakpoints.Handset).subscribe(value => {
         if (value.matches) {
            this.fetchDataFromRouter(history.state);
         }
      });
   }

   save(): void {
      this.collegeManagementService.checkCollegeCode(this.collegeModel.code).subscribe(value => {
         if (value.status === 200) {
            this.collegeManagementService.collegeSaveEvent.next(this.collegeModel);
            this.collegeModel = new CollegeModel();
            this.bsModalRef.hide();
         } else {
            this.collegeModel.code = null;
            this.messageService.add({key: 'tc', severity: 'error', summary: 'Error', detail: value.message});
         }
      });
   }


   public cancel(): void {
      this.bsModalRef.hide();
   }

   private fetchDataFromRouter(data: any): void {
      if (data.id === undefined) {
         this.collegeModel = new CollegeModel();
      } else {
         this.collegeModel = {...history.state};
      }
   }
}
