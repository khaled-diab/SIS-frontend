import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {PageRequest} from '../../../shared/model/page-request';
import {Subscription} from 'rxjs';
import {Sort} from '@angular/material/sort';
import {BsModalService} from 'ngx-bootstrap/modal';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {SectionModel} from '../../../shared/model/section-management/section-model';
import {SectionRequestModel} from '../../../shared/model/section-management/section-request-model';
import {SectionManagementService} from '../../service/sectionManagement.service';
import {DeleteSectionModalComponent} from '../section-delete/delete-section-modal.component';
import {SectionTableRecordsModel} from '../../../shared/model/section-management/sectionTableRecords-model';

@Component({
   selector: 'app-sections-list',
   templateUrl: './sections-list.component.html',
   styleUrls: ['./sections-list.component.css']
})
export class SectionsListComponent implements OnInit, OnDestroy {

   @ViewChild('paginator') paginator: MatPaginator;
   tableData: PageRequest<SectionTableRecordsModel>;
   sectionRequestModel: SectionRequestModel = new SectionRequestModel();
   displayedColumns = ['No.', 'courseId', 'sectionNumber', 'theoreticalLectures',
      'exercisesLectures', 'practicalLectures', 'majorId', 'studyTypeId', 'studentsNo', 'Actions'];
   pageIndex = 0;
   defaultPgeSize = 10;
   subscriptionList: Subscription[] = [];

   constructor(private sectionManagementService: SectionManagementService,
               private dialog: MatDialog,
               private modalService: BsModalService,
               private snackBar: MatSnackBar,
               private route: Router) {
   }

   ngOnInit(): void {
      this.subscriptionList = this.subscriptions();
   }

   pageChangeEvent(event: PageEvent): void {
      const sectionRequestModel = new SectionRequestModel();
      this.sectionManagementService.filterSections(event.pageIndex, event.pageSize, sectionRequestModel)
         .subscribe(value => {
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
      return this.sectionManagementService.sectionFilterEvent
         .subscribe(value => {
            this.sectionRequestModel = value;
            this.paginator.pageIndex = 0;
            this.sectionManagementService.filterSections
            (this.paginator.pageIndex, this.paginator.pageSize, this.sectionRequestModel)
               .subscribe(filteredData => {
                  this.tableData = filteredData;
               });
         });
   }

   private initialDataSubscription(): Subscription {
      const sectionRequestModel = new SectionRequestModel();
      return this.sectionManagementService.filterSections(
         this.pageIndex, this.defaultPgeSize, sectionRequestModel)
         .subscribe(value => {
            this.tableData = value;
         });
   }

   sortEvent($event: Sort): void {
      this.sectionRequestModel = this.sectionManagementService
         .constructSectionRequestObject($event, this.sectionRequestModel);
      this.sectionManagementService.filterSections(this.paginator
         .pageIndex, this.paginator.pageSize, this.sectionRequestModel).subscribe(value => {
         this.tableData = value;
      });
   }

   addSection(): void {
      this.route.navigate(['/sections-management', 'section-add']);
   }

   editSection(row: SectionTableRecordsModel): void {
      this.sectionManagementService.getSectionById(row.id).subscribe(value => {
         this.route.navigate(['/sections-management', 'section-edit'], {state: {section: value}});
      });
   }

   previewStudents(row: number): void {
      this.route.navigate(['/sections-management', 'section-students'], {state: {section: row}});
   }

   deleteSection(row: SectionModel): void {
      this.modalService.show(DeleteSectionModalComponent, {
         backdrop: 'static',
         ignoreBackdropClick: true,
         keyboard: false
      });
      this.sectionManagementService.sectionDeleteEvent.pipe(take(1)).subscribe(_ => {
         this.sectionManagementService.deleteSection(row.id).subscribe(value => {
            this.handleSuccessfulDeletion();
         }, error => {
            this.handleFailedDeletion();
         });
      });
   }

   private handleSuccessfulDeletion(): void {
      const sectionRequestModel = new SectionRequestModel();
      this.sectionManagementService
         .filterSections(this.paginator.pageIndex, this.paginator.pageSize, sectionRequestModel)
         .subscribe(value => {
            this.tableData = value;
         });
      this.snackBar.open('Section Deleted Successfully', undefined, {
         duration: 2000,
         panelClass: 'successSnackBar'
      });
   }

   private handleFailedDeletion(): void {
      this.snackBar.open('Section Deletion Failed', undefined, {duration: 2000});
   }

   ngOnDestroy(): void {
      this.subscriptionList.forEach(sub => sub.unsubscribe());
   }
}
