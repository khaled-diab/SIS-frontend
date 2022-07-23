import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {CollegeManagementService} from '../../service/college-management.service';
import {Subscription} from 'rxjs';
import {GeneralSearchRequest} from '../../../shared/model/general-search-request';
import {PageRequest} from '../../../shared/model/page-request';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {BsModalService} from 'ngx-bootstrap/modal';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SaveCollegeComponent} from '../save-college/save-college.component';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {ConfirmationService, MessageService, PrimeNGConfig} from 'primeng/api';
import {LoadDataEvent} from '../../../shared/model/load-data-event';
import {Constants} from '../../../shared/constants';
import {Sort} from '@angular/material/sort';
import {take} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {SaveBuildingComponent} from '../../../building-management/component/save-building/save-building.component';
import {ViewBuildingComponent} from '../../../building-management/component/view-building/view-building.component';
import {ViewCollegeComponent} from '../view-college/view-college.component';
import {
   DeleteBuildingDialogComponent
} from '../../../building-management/component/delete-building-dialog/delete-building-dialog.component';
import {DeleteCollegeDialogComponent} from '../delete-college-dialog/delete-college-dialog.component';

@Component({
   selector: 'app-colleges-list',
   templateUrl: './colleges-list.component.html',
   styleUrls: ['./colleges-list.component.css'],
   providers: [MessageService, ConfirmationService]
})
export class CollegesListComponent implements OnInit, OnDestroy {
   @ViewChild('paginator') paginator: MatPaginator;
   tableData: PageRequest<CollegeModel>;
   collegeRequestModel: GeneralSearchRequest = new GeneralSearchRequest();
   displayedColumns = ['No.', 'nameEn', 'nameAr', 'code', 'Actions'];
   pageIndex = 0;
   pageSize = 10;
   subscriptionsList: Subscription[] = [];
   isSmallScreen: boolean;
   collegeModel = new CollegeModel();
   loading = true;
   firstTime = true;

   constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
               private collegeManagementService: CollegeManagementService,
               private modalService: BsModalService,
               private breakpointObserver: BreakpointObserver,
               private snackBar: MatSnackBar,
               private router: Router,
               private primengConfig: PrimeNGConfig,
               public dialog: MatDialog) {
   }

   ngOnInit(): void {
      this.subscriptionsList = this.subscriptions();
      this.primengConfig.ripple = true;
   }


   pageChangeEvent(event: PageEvent): void {
      this.collegeManagementService.getCollegePage(event.pageIndex, event.pageSize, this.collegeRequestModel)
         .subscribe(value => {
            this.tableData = value;
         });
   }

   addCollege(): void {
      if (this.isSmallScreen) {
         this.router.navigateByUrl('/colleges-management/create-college', {state: new CollegeModel()}).then(_ => console.log());
      } else {
         const initialState = {
            collegeModel: new CollegeModel()
         };
         this.modalService.show(SaveCollegeComponent, {initialState, class: 'modal-lg'});
      }
   }

   updateCollege(college: CollegeModel, sel: string): void {
      if (this.isSmallScreen) {
         this.router.navigateByUrl('/colleges-management/create-college', {state: college}).then(_ => console.log());
      } else {
         const data: any[] = [college, sel];
         this.dialog.open(SaveCollegeComponent, {width: '900px', height: '450px', data});
         this.collegeManagementService.closeSaveEvent.pipe(take(1)).subscribe(e => {
            console.log('subscribed to close event');
            this.dialog.closeAll();
            if (e !== 'Cancel') {
               console.log('entered cancel');
               this.snackBar.open('College Saved Successfully', undefined, {duration: 4000, panelClass: 'successSnackBar'});
               this.collegeManagementService.collegeFilterEvent.next(this.collegeRequestModel);
            }
         }, error => {
            this.snackBar.open('College Saving Failed', undefined, {duration: 4000, panelClass: 'failedSnackBar'});
         });
      }
   }


   viewCollege(college: CollegeModel): void {
      if (this.isSmallScreen) {
         this.router.navigateByUrl('/colleges-management/create-college/edit');
      } else {
         this.dialog.open(ViewCollegeComponent, {width: '900px', height: '450px', data: college});
         this.collegeManagementService.closeSaveEvent.pipe(take(1)).subscribe(e => {
            console.log('subscribed to close event');
            this.dialog.closeAll();
            if (e !== 'Cancel') {
               console.log('here');
               this.snackBar.open('College Saved Successfully', undefined, {duration: 4000, panelClass: 'successSnackBar'});
               this.collegeManagementService.collegeFilterEvent.next(this.collegeRequestModel);
            }
         }, error => {
            this.snackBar.open('College Saving Failed', undefined, {duration: 4000, panelClass: 'failedSnackBar'});
         });
      }
   }

   sortEvent($event: Sort): void {
      this.collegeRequestModel = this.collegeManagementService.constructCollegeRequestObject($event, this.collegeRequestModel);
      this.collegeManagementService.getCollegePage(0, this.pageSize, this.collegeRequestModel).subscribe(value => {
         this.tableData = value;
      });
   }

   deleteCollege(row: CollegeModel): void {
      this.dialog.open(DeleteCollegeDialogComponent, {width: '450px'});
      this.subscriptionsList.push(this.collegeManagementService.collegeDeleteEvent.pipe(take(1)).subscribe(_ => {
         this.collegeManagementService.deleteCollege(row.id).subscribe(() => {
            this.handleSuccessfulDeletion();
         }, () => {
            this.handleFailedDeletion();
         });
      }));
   }

   saveCollege(): Subscription {
      return this.collegeManagementService.collegeSaveEvent.subscribe(value => {
         this.collegeManagementService.saveCollege(value).subscribe(data => {
            this.paginate(null);
            console.log(data);
            this.messageService.add({severity: 'success', summary: 'Success', detail: data.message});
         }, error => {
            console.log(error);
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Operation Failed'});
         });
      });
   }

   private subscriptions(): Subscription[] {
      this.subscriptionsList.push(this.initialDataSubscription());
      this.subscriptionsList.push(this.filterEventSubscription());
      this.subscriptionsList.push(this.breakpointObserver.observe(Breakpoints.Handset).subscribe(value => {
         this.isSmallScreen = value.matches;
      }));
      this.subscriptionsList.push(this.saveCollege());
      return this.subscriptionsList;
   }

   loadData(event: LoadDataEvent): void {
      this.loading = true;
      this.collegeRequestModel.sortBy = event.sortField !== undefined ? event.sortField : this.collegeRequestModel.sortBy;
      this.collegeRequestModel.sortDirection = event.sortOrder === 1 ? Constants.ASC : Constants.DESC;
      if (this.firstTime) {
         this.loading = false;
         this.firstTime = false;
      } else {
         this.collegeManagementService.getCollegePage(
            this.pageIndex, this.pageSize, this.collegeRequestModel).subscribe(value => {
            this.loading = false;
            this.tableData = value;
         });
      }
   }

   paginate(page: any): void {
      this.loading = true;
      if (page === null) {
         this.collegeManagementService.getCollegePage(this.pageIndex, this.pageSize, this.collegeRequestModel).subscribe(value => {
            this.loading = false;
            this.tableData = value;
         });
      } else {
         this.pageIndex = page.page;
         this.pageSize = page.rows;
         this.collegeManagementService.getCollegePage(this.pageIndex, this.pageSize, this.collegeRequestModel).subscribe(value => {
            this.loading = false;
            this.tableData = value;
         });
      }
   }

   ngOnDestroy(): void {
      this.subscriptionsList.forEach(sub => sub.unsubscribe());
   }

   private filterEventSubscription(): Subscription {
      return this.collegeManagementService.collegeFilterEvent
         .subscribe(value => {
            this.collegeRequestModel = value;
            this.paginator.pageIndex = 0;
            this.collegeManagementService
               .getCollegePage(0, this.pageSize, this.collegeRequestModel)
               .subscribe(filteredData => {
                  this.tableData = filteredData;
               });
         });
   }

   private initialDataSubscription(): Subscription {
      this.collegeRequestModel = new GeneralSearchRequest();
      this.loading = true;
      return this.collegeManagementService
         .getCollegePage(0, this.pageSize, this.collegeRequestModel)
         .subscribe(value => {
            this.tableData = value;
            this.loading = false;
         });
   }

   private handleSuccessfulDeletion(): void {
      this.collegeManagementService
         .collegeFilterEvent.next(this.collegeRequestModel);
      this.snackBar.open('College Deleted Successfully', undefined, {duration: 4000, panelClass: 'successSnackBar'});
   }

   private handleFailedDeletion(): void {
      this.snackBar.open('College Deletion Failed', undefined, {duration: 4000, panelClass: 'failedSnackBar'});
   }
}

