import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import {Subscription} from 'rxjs';
import {CreateacademicyearComponent} from 'src/app/academic-year-management/components/create-academic-year/create-academic-year.component';
import {DepartmentModel} from 'src/app/shared/model/department-management/department-model';
import {DepartmentService} from '../../service/department.service';
import {CreateDepartmentComponent} from '../create-department/create-department.component';
import {DeleteDepartmentComponent} from '../delete-department/delete-department.component';
import {ViewDepartmentComponent} from '../view-department/view-department.component';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<any>;
  tableData: DepartmentModel[];
  displayedColumns = ['id', 'code', 'nameAr', 'nameEn', 'Actions'];
  pageIndex = 1;
  defaultPageSize = 10;
  subscriptionsList: Subscription[] = [];
  isSmallScreen: boolean;
  department = new DepartmentModel();
  searchValue: string;
  filterValue: null;

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

  constructor(private departmentService: DepartmentService,
              private breakpointObserver: BreakpointObserver,
              private snackBar: MatSnackBar,
              private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>();
    this.subscriptionsList = this.subscriptions();
  }

  addOrUpdateDepartment(department: DepartmentModel): void {
    if (this.isSmallScreen) {
      this.router.navigateByUrl('/departments-management/create-department', {state: department}).then(_ => console.log());
    } else {
      this.dialog.open(CreateDepartmentComponent, {data: department});
      this.departmentService.closeSaveEvent.subscribe(e => {
        this.dialog.closeAll();
        if (e !== 'Cancel') {
          this.snackBar.open('Department Saved Successfully', undefined, {duration: 4000, panelClass: 'successSnackBar'});
          console.log('here');
          this.departmentService.getDepartments().subscribe(data => {
            this.tableData = data;
            this.dataSource.data = this.tableData;
            DepartmentService.departmentsList = this.tableData;

          });
        }
      }, error => {
        this.snackBar.open('Department Saving Failed', undefined, {duration: 4000, panelClass: 'failedSnackBar'});
      });
    }
  }

  viewDepartment(department: DepartmentModel): void {
    this.dialog.open(ViewDepartmentComponent, {data: department});
    this.departmentService.closeSaveEvent.subscribe(e => {
      this.dialog.closeAll();
    }, error => {
      this.snackBar.open('Department Saving Failed', undefined, {duration: 4000, panelClass: 'failedSnackBar'});
    });
  }

  deleteDepartment(row: DepartmentModel): void {
    this.dialog.open(DeleteDepartmentComponent, {width: '450px'});
    this.subscriptionsList.push(this.departmentService.departmentDeleteEvent.pipe(take(1)).subscribe(_ => {
      this.departmentService.deleteDepartment(row.id).subscribe(() => {
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
    return this.departmentService.departmentFilterEvent
      .subscribe(list => {
        if (list[1] === null) {
          this.pageIndex = 1;
          this.dataSource.filter = list[0].trim().toLowerCase();
        } else {
          this.departmentService.getDepartments().subscribe(allClassrooms => {
            this.tableData = allClassrooms;
            this.dataSource.data = this.tableData;
            this.pageIndex = 1;
            this.dataSource.filter = list[0].trim().toLowerCase();
            if (list[1] !== undefined) {
              this.filterValue = list[1];
              this.dataSource.data = this.dataSource.data.filter(value => {
                return (value.collegeDTO.id === list[1]);
              });
            }
          });
        }
      });
  }

  private initialDataSubscription(): Subscription {
    return this.departmentService
      .getDepartments()
      .subscribe(value => {
        this.tableData = value;
        this.dataSource.data = this.tableData;
        DepartmentService.departmentsList = this.tableData;
        console.log(value[0]);
      });
  }

  private handleSuccessfulDeletion(): void {
    this.departmentService
      .getDepartments()
      .subscribe(value => {
        this.tableData = value;
        this.dataSource.data = this.tableData;
        DepartmentService.departmentsList = this.tableData;

      });
    this.snackBar.open('Department Deleted Successfully', undefined, {duration: 4000, panelClass: 'successSnackBar'});
  }

  private handleFailedDeletion(): void {
    this.snackBar.open('Department Deletion Failed', undefined, {duration: 4000, panelClass: 'failedSnackBar'});
  }

  ngOnDestroy(): void {
    this.subscriptionsList.forEach(sub => sub.unsubscribe());
  }
}
