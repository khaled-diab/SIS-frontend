import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {BuildingManagementService} from '../../service/building-management.service';
import {Subscription} from 'rxjs';
import {BuildingModel} from '../../../shared/model/building-management/building-model';
import {MatSort} from '@angular/material/sort';
import {BsModalService} from 'ngx-bootstrap/modal';
import {DeleteBuildingDialogComponent} from '../delete-building-dialog/delete-building-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {SaveBuildingComponent} from '../save-building/save-building.component';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {ViewBuildingComponent} from '../view-building/view-building.component';
import {take} from 'rxjs/operators';


@Component({
   selector: 'app-buildings-list',
   templateUrl: './building-list.component.html',
   styleUrls: ['./building-list.component.css']
})
export class BuildingsListComponent implements OnInit, OnDestroy {

   dataSource: MatTableDataSource<any>;
   tableData: BuildingModel[];
   displayedColumns = ['no', 'code', 'name', 'department', 'college', 'status', 'Actions'];
   pageIndex = 1;
   defaultPageSize = 10;
   subscriptionsList: Subscription[] = [];
   isSmallScreen: boolean;
   buildingModel = new BuildingModel();
   searchValue: string;
   filterValue: undefined;

   @ViewChild(MatPaginator, {static: false})
   set paginator(value: MatPaginator) {
      if (this.dataSource) {
         this.dataSource.paginator = value;
      }
   }

   @ViewChild(MatSort, {static: false})
   set sort(value: MatSort) {
      if (this.dataSource) {
         this.dataSource.sort = value;
      }
   }

   constructor(private buildingManagementService: BuildingManagementService,
               private modalService: BsModalService,
               private breakpointObserver: BreakpointObserver,
               private snackBar: MatSnackBar,
               private router: Router,
               public dialog: MatDialog) {
   }

   ngOnInit(): void {
      this.dataSource = new MatTableDataSource<any>();
      this.subscriptionsList = this.subscriptions();
      // setTimeout(() => this.dataSource.paginator = this.paginator);
   }

   addOrUpdateBuilding(building: BuildingModel, sel: string): void {
      if (this.isSmallScreen) {
         this.router.navigateByUrl('/buildings-management/create-building');
      } else {

         const data: any[] = [building, sel];
         this.dialog.open(SaveBuildingComponent, {width: '900px', height: '450px', data});
         this.buildingManagementService.closeSaveEvent.pipe(take(1)).subscribe(e => {
            console.log('subscribed to close event');
            this.dialog.closeAll();
            if (e !== 'Cancel') {
               console.log('entered cancel');
               this.snackBar.open('Building Saved Successfully', undefined, {duration: 4000, panelClass: 'successSnackBar'});
               this.buildingManagementService.buildingFilterEvent.next([this.searchValue, this.filterValue]);
            }
         }, error => {
            this.snackBar.open('Building Saving Failed', undefined, {duration: 4000, panelClass: 'failedSnackBar'});
         });
      }
   }

   viewBuilding(building: BuildingModel): void {
      if (this.isSmallScreen) {
         this.router.navigateByUrl('/buildings-management/create-building/edit');
      } else {
         this.dialog.open(ViewBuildingComponent, {width: '900px', height: '450px', data: building});
         this.buildingManagementService.closeSaveEvent.pipe(take(1)).subscribe(e => {
            console.log('subscribed to close event');
            this.dialog.closeAll();
            if (e !== 'Cancel') {
               console.log('here');
               this.snackBar.open('Building Saved Successfully', undefined, {duration: 4000, panelClass: 'successSnackBar'});
               this.buildingManagementService.buildingFilterEvent.next([this.searchValue, this.filterValue]);
            }
         }, error => {
            this.snackBar.open('Building Saving Failed', undefined, {duration: 4000, panelClass: 'failedSnackBar'});
         });
      }
   }

   deleteBuilding(row: BuildingModel): void {
      this.dialog.open(DeleteBuildingDialogComponent, {width: '450px'});
      this.subscriptionsList.push(this.buildingManagementService.buildingDeleteEvent.pipe(take(1)).subscribe(_ => {
         this.buildingManagementService.deleteBuilding(row.id).subscribe(() => {
            this.handleSuccessfulDeletion();
         }, () => {
            this.handleFailedDeletion();
         });
      }));
   }

   private subscriptions(): Subscription[] {
      this.subscriptionsList.push(this.initialDataSubscription());
      this.subscriptionsList.push(this.filterEventSubscription());
      this.subscriptionsList.push(this.breakpointObserver.observe(Breakpoints.Handset).subscribe(value => {
         this.isSmallScreen = value.matches;
      }));
      return this.subscriptionsList;
   }

   private filterEventSubscription(): Subscription {
      return this.buildingManagementService.buildingFilterEvent
         .subscribe(list => {
            if (list[1] === null) {
               this.pageIndex = 1;
               this.searchValue = list[0].trim().toLowerCase();
               this.filterValue = undefined;
               this.dataSource.filter = this.searchValue;
            } else {
               this.buildingManagementService.getBuildings().subscribe(allBuildings => {
                  this.tableData = allBuildings;
                  this.dataSource.data = this.tableData;
                  this.pageIndex = 1;
                  this.searchValue = list[0]?.trim().toLowerCase();
                  this.dataSource.filter = this.searchValue;
                  if (list[1] !== undefined) {
                     console.log(list[1]);
                     this.filterValue = list[1];
                     this.dataSource.data = this.dataSource.data.filter(value1 => {
                        return (value1.collegeDTO.id === list[1]);
                     });
                  } else {
                     this.filterValue = undefined;
                  }
               });
            }
         });
   }

   private xxx(): Subscription {
      return this.buildingManagementService.buildingFilterEvent
         .subscribe(value => {
            this.pageIndex = 1;
            this.dataSource.data = this.dataSource.data.filter(value1 => {
               return value1.collegeDTO.id === value;
            });
         });
   }

   private initialDataSubscription(): Subscription {
      return this.buildingManagementService
         .getBuildings()
         .subscribe(value => {
            this.tableData = value;
            this.dataSource.data = this.tableData;
         });
   }

   private handleSuccessfulDeletion(): void {
      this.buildingManagementService
         .getBuildings()
         .subscribe(value => {
            this.tableData = value;
            this.dataSource.data = this.tableData;
         });
      this.snackBar.open('Building Deleted Successfully', undefined, {duration: 4000, panelClass: 'successSnackBar'});
   }

   private handleFailedDeletion(): void {
      this.snackBar.open('Building Deletion Failed', undefined, {duration: 4000, panelClass: 'failedSnackBar'});
   }

   ngOnDestroy(): void {
      this.subscriptionsList.forEach(sub => sub.unsubscribe());
   }
}

