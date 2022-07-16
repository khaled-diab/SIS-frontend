import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSelect} from '@angular/material/select';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';

import {Data, Router} from '@angular/router';
import {Constants} from 'src/app/shared/constants';
import {AcademicYear} from 'src/app/shared/model/academicYear-Management/academic-year';
import {AcademicYearService} from '../../service/academic-year.service';
import {CreateacademicyearComponent} from '../create-academic-year/create-academic-year.component';
import {AcademicYearPerviewComponent} from '../academic-year-perview/academic-year-perview.component';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BsModalService} from 'ngx-bootstrap/modal';
import {DeleteAcademicYearComponent} from '../delete-academic-year/delete-academic-year.component';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-academic-year-list',
  templateUrl: './academic-year-list.component.html',
  styleUrls: ['./academic-year-list.component.css']
})


export class AcademicYearListComponent implements OnInit, OnDestroy {
  tableData: AcademicYear[] = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: any[] = ['NO.', 'name','start_date', 'end_date','status', 'Actions'];
  pageIndex = 1;
  defaultPageSize = 10;
  subscriptionsList: Subscription[] = [];
  isSmallScreen: boolean;
  academicYearModel = new AcademicYear();
  searchValue: string;

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

  constructor(public service: AcademicYearService,
              private modalService: BsModalService,
              private breakpointObserver: BreakpointObserver,
              private snackBar: MatSnackBar,
              private router: Router,
              public dialog: MatDialog) {

  }

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource<any>();
    this.subscriptionsList = this.subscriptions();
  }

  addOrUpdateAcademicYear(academicYear: AcademicYear): void {
    if (this.isSmallScreen) {
      this.router.navigateByUrl('/academics-year-management/create-academic-year', {state: academicYear}).then(_ => console.log());
    } else {
      this.dialog.open(CreateacademicyearComponent, {data: academicYear});
      this.service.closeSaveEvent.subscribe(e => {
          this.dialog.closeAll();
          if (e !== 'Cancel') {
            this.snackBar.open('Academic Year Saved Successfully', undefined, {duration: 4000, panelClass: 'successSnackBar'});
            console.log('here');
            this.service.getAcademicYears().subscribe(data => {
              this.tableData = data;
              this.dataSource.data = this.tableData;
            });
          }
        },
        error => {
          this.snackBar.open('Academic Year Saving Failed', undefined, {duration: 4000, panelClass: 'failedSnackBar'});
        });
    }
  }

  viewAcademicYear(academicYear: AcademicYear): void {

    this.dialog.open(AcademicYearPerviewComponent, {data: academicYear});
    this.service.closeSaveEvent.subscribe(e => {
      this.dialog.closeAll();

    }, error => {
      this.snackBar.open('Academic Year Saving Failed', undefined, {duration: 4000, panelClass: 'failedSnackBar'});
    });

  }

  deleteAcademicYear(row: AcademicYear): void {
    this.dialog.open(DeleteAcademicYearComponent, {width: '450px'});
    this.subscriptionsList.push(this.service.academicYearDeleteEvent.pipe(take(1)).subscribe(_ => {
      this.service.deleteAcademic(row.id).subscribe(() => {
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
    return this.service.academicYearFilterEvent
      .subscribe(list => {
        if (list[1] === null) {
          this.pageIndex = 1;
          this.dataSource.filter = list[0].trim().toLowerCase();
        } else {
          this.service.getAcademicYears().subscribe(allAcademicYears => {
            this.tableData = allAcademicYears;
            this.dataSource.data = this.tableData;
            this.pageIndex = 1;
            this.dataSource.filter = list[0].trim().toLowerCase();

          });
        }
      });
  }

  private initialDataSubscription(): Subscription {
    return this.service
      .getAcademicYears()
      .subscribe(value => {
        this.tableData = value;
        this.dataSource.data = this.tableData;
      });
  }

  private handleSuccessfulDeletion(): void {
    this.service
      .getAcademicYears()
      .subscribe(value => {
        this.tableData = value;
        this.dataSource.data = this.tableData;
      });
    this.snackBar.open('Academic Year Deleted Successfully', undefined, {duration: 4000, panelClass: 'successSnackBar'});
  }

  private handleFailedDeletion(): void {
    this.snackBar.open('Academic Year Deletion Failed', undefined, {duration: 4000, panelClass: 'failedSnackBar'});
  }

  ngOnDestroy(): void {
    this.subscriptionsList.forEach(sub => sub.unsubscribe());
  }
}





