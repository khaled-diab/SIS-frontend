import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {PageRequest} from '../../../shared/model/page-request';
import {Subscription} from 'rxjs';
import {FacultyMemberManagementService} from '../../service/facultyMember-management.service';
import {Sort} from '@angular/material/sort';
import {BsModalService} from 'ngx-bootstrap/modal';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DeleteFacultyMemberModalComponent} from '../delete-facultyMember-modal/delete-facultyMember-modal.component';
import {PreviewFacultyMemberComponent} from '../preview-facultyMember/preview-facultyMember.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {UpdateFacultyMemberComponent} from '../update-facultyMember/update-facultyMember.component';
import {FacultyMemberModel} from '../../../shared/model/facultyMember-management/facultyMember-model';
import {FacultyMemberRequestModel} from '../../../shared/model/facultyMember-management/facultyMember-request-model';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {FacultyMemberTableRecordsModel} from '../../../shared/model/facultyMember-management/facultyMemberTableRecords-model';

@Component({
   selector: 'app-facultyMembers-list',
   templateUrl: './facultyMembers-list.component.html',
   styleUrls: ['./facultyMembers-list.component.css']
})
export class FacultyMembersListComponent implements OnInit, OnDestroy {


   @ViewChild('paginator') paginator: MatPaginator;
   tableData: PageRequest<FacultyMemberTableRecordsModel>;
   facultyMemberRequestModel: FacultyMemberRequestModel = new FacultyMemberRequestModel();
   displayedColumns = ['No.', 'nameAr', 'nameEn', 'degreeId', 'collegeId', 'departmentId', 'universityMail', 'Actions'];
   pageIndex = 0;
   defaultPgeSize = 10;
   department: string;
   subscriptionList: Subscription[] = [];

   constructor(private facultyMemberManagementService: FacultyMemberManagementService,
               private dialog: MatDialog,
               private modalService: BsModalService,
               private snackBar: MatSnackBar,
               private route: Router) {
   }

   ngOnInit(): void {
      this.subscriptionList = this.subscriptions();
   }

   pageChangeEvent(event: PageEvent): void {
      this.paginator.pageIndex = event.pageIndex;
      this.paginator.pageSize = event.pageSize;
      this.facultyMemberManagementService.filterFacultyMembers(this.paginator
         .pageIndex, this.paginator.pageSize, this.facultyMemberRequestModel).subscribe(value => {
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
      return this.facultyMemberManagementService.facultyMemberFilterEvent
         .subscribe(value => {
            this.facultyMemberRequestModel = value;
            this.paginator.pageIndex = 0;
            this.facultyMemberManagementService.filterFacultyMembers
            (this.paginator.pageIndex, this.paginator.pageSize, this.facultyMemberRequestModel)
               .subscribe(filteredData => {
                  this.tableData = filteredData;
               });
         });
   }

   private initialDataSubscription(): Subscription {
      const filter = new FacultyMemberRequestModel();

      return this.facultyMemberManagementService
         .filterFacultyMembers(0, this.defaultPgeSize, filter).subscribe(value => {
            this.tableData = value;
         });
   }

   sortEvent($event: Sort): void {
      this.facultyMemberRequestModel = this.facultyMemberManagementService
         .constructFacultyMemberRequestObject($event, this.facultyMemberRequestModel);
      this.facultyMemberManagementService.filterFacultyMembers(this.paginator
         .pageIndex, this.paginator.pageSize, this.facultyMemberRequestModel).subscribe(value => {
         this.tableData = value;
      });
   }

   addFacultyMember(): void {
      this.route.navigate(['/facultyMembers-management', 'facultyMember-add']);
   }

   private refreshFacultyMembers(): void {
      this.facultyMemberManagementService.filterFacultyMembers(this.paginator
         .pageIndex, this.paginator.pageSize, this.facultyMemberRequestModel).subscribe(value => {
         this.tableData = value;
      });
   }

   private handleSuccessfulDeletion(): void {
      this.facultyMemberManagementService.filterFacultyMembers(this.paginator
         .pageIndex, this.paginator.pageSize, this.facultyMemberRequestModel).subscribe(value => {
         this.tableData = value;
      });
      this.snackBar.open('Faculty Member Deleted Successfully', undefined, {
         duration: 2000,
         panelClass: 'successSnackBar'
      });
   }

   private handleFailedDeletion(): void {
      this.snackBar.open('Faculty Member Deletion Failed', undefined, {duration: 2000});
   }

   deleteFacultyMember(row: FacultyMemberModel): void {
      this.modalService.show(DeleteFacultyMemberModalComponent, {
         backdrop: 'static',
         ignoreBackdropClick: true,
         keyboard: false
      });
      this.facultyMemberManagementService.facultyMemberDeleteEvent.pipe(take(1)).subscribe(_ => {
         this.facultyMemberManagementService.deleteFacultyMember(row.id).subscribe(value => {
            this.handleSuccessfulDeletion();
         }, error => {
            this.handleFailedDeletion();
         });
      });
   }

   previewFacultyMember(row: FacultyMemberTableRecordsModel): void {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      dialogConfig.height = '700px';
      this.facultyMemberManagementService.facultyMemberById(row.id).subscribe(value => {
         dialogConfig.data = value;
         this.dialog.open(PreviewFacultyMemberComponent, dialogConfig);
         this.facultyMemberManagementService.facultyMemberCloseUpdateEvent.pipe(take(1)).subscribe(value1 => {
            this.dialog.closeAll();
            this.refreshFacultyMembers();
         });
      });
   }

   updateFacultyMember(row: FacultyMemberTableRecordsModel): void {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      dialogConfig.height = '700px';
      this.facultyMemberManagementService.facultyMemberById(row.id).subscribe(value => {
         dialogConfig.data = value;
         this.dialog.open(UpdateFacultyMemberComponent, dialogConfig);
         this.facultyMemberManagementService.facultyMemberCloseUpdateEvent.pipe(take(1)).subscribe(value1 => {
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
