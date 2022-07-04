import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {PageRequest} from '../../../shared/model/page-request';
import {Subscription} from 'rxjs';
import {TimetableManagementService} from '../../service/timetable-management.service';
import {Sort} from '@angular/material/sort';
import {TimetableRequestModel} from '../../../shared/model/timetable-management/timetable-request-model';
import {SectionModel} from '../../../shared/model/section-management/section-model';
import {take} from 'rxjs/operators';
import {BsModalService} from 'ngx-bootstrap/modal';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DeleteTimetableComponent} from '../timetable-delete/delete-timetable.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EditTimetableComponent} from '../timetable-edit/edit-timetable.component';
import {TimetableTableRecordsModel} from '../../../shared/model/timetable-management/timetableTableRecords-model';

@Component({
   selector: 'app-timetable-list',
   templateUrl: './timetable-list.component.html',
   styleUrls: ['./timetable-list.component.css']
})
export class TimetableListComponent implements OnInit, OnDestroy {


   @ViewChild('paginator') paginator: MatPaginator;
   tableData: PageRequest<TimetableTableRecordsModel>;
   timetableRequestModel: TimetableRequestModel = new TimetableRequestModel();
   displayedColumns = ['No.', 'courseId', 'section', 'facultyMemberId',
      'lectureTypeId', 'day', 'startTime', 'endTime', 'buildingId', 'classroomId', 'Actions'];
   pageIndex = 0;
   defaultPgeSize = 10;
   subscriptionList: Subscription[] = [];

   constructor(private timetableManagementService: TimetableManagementService,
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
      this.timetableManagementService.filterTimetables
      (this.paginator.pageIndex, this.paginator.pageSize, this.timetableRequestModel)
         .subscribe(filteredData => {
            this.tableData = filteredData;
         });
   }

   private subscriptions(): Subscription[] {
      const subscriptions = [];
      subscriptions.push(this.initialDataSubscription());
      subscriptions.push(this.filterEventSubscription());
      return subscriptions;
   }

   private filterEventSubscription(): Subscription {
      return this.timetableManagementService.timetableFilterEvent
         .subscribe(value => {
            this.timetableRequestModel = value;
            this.paginator.pageIndex = 0;
            this.timetableManagementService.filterTimetables
            (this.paginator.pageIndex, this.paginator.pageSize, this.timetableRequestModel)
               .subscribe(filteredData => {
                  this.tableData = filteredData;
               });
         });
   }

   private initialDataSubscription(): Subscription {
      const filter = new TimetableRequestModel();

      return this.timetableManagementService
         .filterTimetables(0, this.defaultPgeSize, filter).subscribe(value => {
            this.tableData = value;
         });
   }

   sortEvent($event: Sort): void {
      this.timetableRequestModel = this.timetableManagementService
         .constructTimetableRequestObject($event, this.timetableRequestModel);
      this.timetableManagementService.filterTimetables(this.paginator
         .pageIndex, this.paginator.pageSize, this.timetableRequestModel).subscribe(value => {
         this.tableData = value;
      });
   }

   deleteTimetable(row: SectionModel): void {
      this.modalService.show(DeleteTimetableComponent, {
         backdrop: 'static',
         ignoreBackdropClick: true,
         keyboard: false
      });
      this.timetableManagementService.timetableDeleteEvent.pipe(take(1)).subscribe(_ => {
         this.timetableManagementService.deleteTimetable(row.id).subscribe(value => {
            this.handleSuccessfulDeletion();
         }, error => {
            this.handleFailedDeletion();
         });
      });
   }

   private handleSuccessfulDeletion(): void {
      this.timetableManagementService.filterTimetables
      (this.paginator.pageIndex, this.paginator.pageSize, this.timetableRequestModel)
         .subscribe(filteredData => {
            this.tableData = filteredData;
         });
      this.snackBar.open('Timetable Deleted Successfully', undefined, {
         duration: 2000,
         panelClass: 'successSnackBar'
      });
   }

   private handleFailedDeletion(): void {
      this.snackBar.open('Timetable Deletion Failed', undefined, {duration: 2000});
   }

   private refreshTimetables(): void {
      const timetableRequestModel = new TimetableRequestModel();
      this.timetableManagementService
         .filterTimetables(this.paginator.pageIndex, this.paginator.pageSize, timetableRequestModel)
         .subscribe(value => {
            this.tableData = value;
         });
   }

   updateTimetable(row: TimetableTableRecordsModel): void {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '70%';
      dialogConfig.height = '700px';
      this.timetableManagementService.getTimetableById(row.id).subscribe(value => {
         dialogConfig.data = value;
         this.dialog.open(EditTimetableComponent, dialogConfig);
         this.timetableManagementService.timetableCloseUpdateEvent.pipe(take(1)).subscribe(value1 => {
               this.dialog.closeAll();
               this.refreshTimetables();
            }
         );
      });
   }

   ngOnDestroy(): void {
      this.subscriptionList.forEach(sub => sub.unsubscribe());
   }
}
