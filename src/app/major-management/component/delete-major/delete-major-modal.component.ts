import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {MajorManagementServiceModule} from '../../service/major-management-service.module';

@Component({
   selector: 'app-delete-major-modal',
   templateUrl: './delete-major-modal.component.html',
   styleUrls: ['./delete-major-modal.component.css']
})
export class DeleteMajorModalComponent implements OnInit {

   constructor(private bsModalRef: BsModalRef,
               private majorManagementServiceModule: MajorManagementServiceModule) {
   }

   ngOnInit(): void {
   }


   close(): void {
      this.bsModalRef.hide();
   }

   deleteMajor(): void {
      this.majorManagementServiceModule.majorDeleteEvent.next(null);
      this.bsModalRef.hide();
   }
}
