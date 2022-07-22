import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {PageRequest} from '../../../shared/model/page-request';
import {Subscription} from 'rxjs';
import {Sort} from '@angular/material/sort';
import {BsModalService} from 'ngx-bootstrap/modal';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {MajorRequestModel} from '../../../shared/model/major-management/major-request-model';
import {MajorManagementServiceModule} from '../../service/major-management-service.module';
import {MajorTableRecordsModel} from '../../../shared/model/major-management/major-table-records-model';
import {DeleteMajorModalComponent} from '../delete-major/delete-major-modal.component';
import {EditMajorComponent} from '../edit-major/edit-major.component';
import {AddMajorComponent} from '../add-major/add-major.component';

@Component({
   selector: 'app-major-list',
   templateUrl: './major-list.component.html',
   styleUrls: ['./major-list.component.css']
})
export class MajorListComponent implements OnInit, OnDestroy {


   @ViewChild('paginator') paginator: MatPaginator;
   tableData: PageRequest<MajorTableRecordsModel>;
   majorRequestModel: MajorRequestModel = new MajorRequestModel();
   displayedColumns = ['No.', 'nameAr', 'nameEn', 'departmentId', 'collegeId', 'Actions'];
   pageIndex = 0;
   defaultPgeSize = 10;
   department: string;
   subscriptionList: Subscription[] = [];

   constructor(private majorManagementServiceModule: MajorManagementServiceModule,
               private dialog: MatDialog,
               private modalService: BsModalService,
               private snackBar: MatSnackBar) {
   }

   ngOnInit(): void {
      this.subscriptionList = this.subscriptions();
   }

   pageChangeEvent(event: PageEvent): void {
      this.paginator.pageIndex = event.pageIndex;
      this.paginator.pageSize = event.pageSize;
      this.majorManagementServiceModule.filterMajors(this.paginator
         .pageIndex, this.paginator.pageSize, this.majorRequestModel).subscribe(value => {
         this.tableData = value;
      });
   }

   private subscriptions(): Subscription[] {
      const subscriptions = [];
      subscriptions.push(this.initialDataSubscription());
      subscriptions.push(this.filterEventSubscription());
      return subscriptions;
   }

   private filterEventSubscription(): Subscription {
      return this.majorManagementServiceModule.majorFilterEvent
         .subscribe(value => {
            this.majorRequestModel = value;
            this.paginator.pageIndex = 0;
            this.majorManagementServiceModule.filterMajors
            (this.paginator.pageIndex, this.paginator.pageSize, this.majorRequestModel)
               .subscribe(filteredData => {
                  this.tableData = filteredData;
               });
         });
   }

   private initialDataSubscription(): Subscription {
      const filter = new MajorRequestModel();
      return this.majorManagementServiceModule
         .filterMajors(0, this.defaultPgeSize, filter).subscribe(value => {
            this.tableData = value;
         });
   }

   sortEvent($event: Sort): void {
      this.majorRequestModel = this.majorManagementServiceModule
         .constructMajorRequestObject($event, this.majorRequestModel);
      this.majorManagementServiceModule.filterMajors(this.paginator
         .pageIndex, this.paginator.pageSize, this.majorRequestModel).subscribe(value => {
         this.tableData = value;
      });
   }

   private refreshFacultyMembers(): void {
      this.majorManagementServiceModule.filterMajors(this.paginator
         .pageIndex, this.paginator.pageSize, this.majorRequestModel).subscribe(value => {
         this.tableData = value;
      });
   }

   private handleSuccessfulDeletion(): void {
      this.majorManagementServiceModule.filterMajors(this.paginator
         .pageIndex, this.paginator.pageSize, this.majorRequestModel).subscribe(value => {
         this.tableData = value;
      });
      this.snackBar.open('Major Deleted Successfully', undefined, {
         duration: 2000,
         panelClass: 'successSnackBar'
      });
   }

   private handleFailedDeletion(): void {
      this.snackBar.open('Major Deletion Failed', undefined, {duration: 2000});
   }

   deleteMajor(row: MajorTableRecordsModel): void {
      this.modalService.show(DeleteMajorModalComponent, {
         backdrop: 'static',
         ignoreBackdropClick: true,
         keyboard: false
      });
      this.majorManagementServiceModule.majorDeleteEvent.pipe(take(1)).subscribe(_ => {
         this.majorManagementServiceModule.deleteMajor(row.id).subscribe(value => {
            this.handleSuccessfulDeletion();
         }, error => {
            this.handleFailedDeletion();
         });
      });
   }


   addMajor(): void {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      dialogConfig.height = '400px';
      this.dialog.open(AddMajorComponent, dialogConfig);
      this.majorManagementServiceModule.majorCloseUpdateEvent.pipe(take(1)).subscribe(_ => {
            this.dialog.closeAll();
            this.refreshFacultyMembers();
         }
      );
   }

   updateMajor(row: MajorTableRecordsModel): void {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      dialogConfig.height = '400px';
      this.majorManagementServiceModule.majorById(row.id).subscribe(value => {
         dialogConfig.data = value;
         this.dialog.open(EditMajorComponent, dialogConfig);
         this.majorManagementServiceModule.majorCloseUpdateEvent.pipe(take(1)).subscribe(value1 => {
               this.dialog.closeAll();
               this.refreshFacultyMembers();
            }
         );
      });
   }

   ngOnDestroy(): void {
      this.subscriptionList.forEach(sub => sub.unsubscribe());
   }
}
