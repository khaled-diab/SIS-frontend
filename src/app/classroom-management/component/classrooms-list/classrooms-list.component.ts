import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {ClassroomManagementService} from '../../service/classroom-management.service';
import {Subscription} from 'rxjs';
import {ClassroomModel} from '../../../shared/model/classroom-management/classroom-model';
import {MatSort, Sort} from '@angular/material/sort';
import {BsModalService} from 'ngx-bootstrap/modal';
import {DeleteClassroomDialogComponent} from '../delete-classroom-dialog/delete-classroom-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {SaveClassroomComponent} from '../save-classroom/save-classroom.component';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {ViewClassroomComponent} from '../view-classroom/view-classroom.component';
import {take} from 'rxjs/operators';


@Component({
  selector: 'app-classrooms-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.css']
})
export class ClassroomsListComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<any>;
  tableData: ClassroomModel[];
  displayedColumns = ['id', 'code', 'name', 'capacity', 'buildingCode', 'buildingName', 'college', 'status', 'Actions'];
  pageIndex = 1;
  defaultPageSize = 10;
  subscriptionsList: Subscription[] = [];
  isSmallScreen: boolean;
  classroomModel = new ClassroomModel();
  searchValue: string;
  filterCollege: undefined;
  filterBuilding: undefined;

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

  constructor(private classroomManagementService: ClassroomManagementService,
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

  addOrUpdateClassroom(classroom: ClassroomModel): void {
    if (this.isSmallScreen) {
      this.router.navigateByUrl('/classrooms-management/create-classroom', {state: classroom}).then(_ => console.log());
    } else {
      this.dialog.open(SaveClassroomComponent, {data: classroom});
      this.classroomManagementService.closeSaveEvent.subscribe(e => {
        this.dialog.closeAll();
        if (e !== 'Cancel') {
          this.snackBar.open('Classroom Saved Successfully', undefined, {duration: 4000, panelClass: 'successSnackBar'});
          console.log('here');
          this.classroomManagementService.classroomFilterEvent.next([this.searchValue, this.filterCollege, this.filterBuilding]);
        }
      }, error => {
        this.snackBar.open('Classroom Saving Failed', undefined, {duration: 4000, panelClass: 'failedSnackBar'});
      });
    }
  }

  viewClassroom(classroom: ClassroomModel): void {
    if (this.isSmallScreen) {
      this.router.navigateByUrl('/classrooms-management/create-classroom', {state: classroom}).then(_ => console.log());
    } else {
      this.dialog.open(ViewClassroomComponent, {data: classroom});
      this.classroomManagementService.closeSaveEvent.subscribe(e => {
        this.dialog.closeAll();
        if (e !== 'Cancel') {
          this.snackBar.open('Classroom Saved Successfully', undefined, {duration: 4000, panelClass: 'successSnackBar'});
          console.log('here');
          this.classroomManagementService.classroomFilterEvent.next([this.searchValue, this.filterCollege, this.filterBuilding]);
        }
      }, error => {
        this.snackBar.open('Classroom Saving Failed', undefined, {duration: 4000, panelClass: 'failedSnackBar'});
      });
    }
  }

  deleteClassroom(row: ClassroomModel): void {
    this.dialog.open(DeleteClassroomDialogComponent, {width: '450px'});
    this.subscriptionsList.push(this.classroomManagementService.classroomDeleteEvent.pipe(take(1)).subscribe(_ => {
      this.classroomManagementService.deleteClassroom(row.id).subscribe(() => {
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
    return this.classroomManagementService.classroomFilterEvent
      .subscribe(list => {
        console.log('filter sub');
        if (list[1] === null) {
          this.pageIndex = 1;
          this.searchValue = list[0]?.trim().toLowerCase();
          this.filterBuilding = this.filterCollege = undefined;
          this.dataSource.filter = this.searchValue;
        } else {
          this.classroomManagementService.getClassrooms().subscribe(allClassrooms => {
            this.tableData = allClassrooms;
            this.dataSource.data = this.tableData;
            this.pageIndex = 1;
            this.searchValue = list[0]?.trim().toLowerCase();
            this.dataSource.filter = this.searchValue;
            if (list[1] !== undefined) {
              this.filterCollege = list[1];
              this.dataSource.data = this.dataSource.data.filter(value1 => {
                return (value1.collegeDTO.id === list[1]);
              });
              if (list[2] !== undefined) {
                this.filterBuilding = list[2];
                this.dataSource.data = this.dataSource.data.filter(value1 => {
                  return (value1.buildingDTO.id === list[2]);
                });
              }else {
                this.filterBuilding = undefined;
              }
            }else{
              this.filterCollege = undefined;
            }
          });
        }
      });
  }

  private initialDataSubscription(): Subscription {
    return this.classroomManagementService
      .getClassrooms()
      .subscribe(value => {
        this.tableData = value;
        this.dataSource.data = this.tableData;
      });
  }

  private handleSuccessfulDeletion(): void {
    this.classroomManagementService
      .getClassrooms()
      .subscribe(value => {
        this.tableData = value;
        this.dataSource.data = this.tableData;
      });
    this.snackBar.open('Classroom Deleted Successfully', undefined, {duration: 4000, panelClass: 'successSnackBar'});
  }

  private handleFailedDeletion(): void {
    this.snackBar.open('Classroom Deletion Failed', undefined, {duration: 4000, panelClass: 'failedSnackBar'});
  }

  ngOnDestroy(): void {
    this.subscriptionsList.forEach(sub => sub.unsubscribe());
  }
}

