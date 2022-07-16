import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AcademicTermModel} from 'src/app/shared/model/academicTerm-management/academic-term-model';
import {AcademicTermService} from '../../service/academic-term.service';
import {CreateAcademicTermComponent} from '../create-academic-term/create-academic-term.component';
import {DeleteAcademicTermComponent} from '../delete-academic-term/delete-academic-term.component';
import {ViewAcademicTermComponent} from '../view-academic-term/view-academic-term.component';
import {take} from 'rxjs/operators';
import {AcademicYearService} from "../../../academic-year-management/service/academic-year.service";


@Component({
  selector: 'app-academic-term-list',
  templateUrl: './academic-term-list.component.html',
  styleUrls: ['./academic-term-list.component.css']
})
export class AcademicTermListComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<any>;
  tableData: AcademicTermModel[];
  displayedColumns = ['NO.', 'name', 'start_date', 'end_date', 'academic_year', 'Actions'];
  pageIndex = 1;
  defaultPageSize = 10;
  subscriptionsList: Subscription[] = [];
  isSmallScreen: boolean;
  academicTerm = new AcademicTermModel();
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

  constructor(private dialog: MatDialog, public service: AcademicTermService,
              private breakpointObserver: BreakpointObserver,
              private snackBar: MatSnackBar,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>();
    this.subscriptionsList = this.subscriptions();
  }

  addOrUpdateAcademicTerm(academicTerm: AcademicTermModel): void {
    if (this.isSmallScreen) {
      this.router.navigateByUrl('/academics-term-management/create-academic-term', {state: academicTerm}).then(_ => console.log());
    } else {
      this.dialog.open(CreateAcademicTermComponent, {data: academicTerm});
      this.service.closeSaveEvent.subscribe(e => {
        this.dialog.closeAll();
        if (e !== 'Cancel') {
          this.snackBar.open('Academic Term Saved Successfully', undefined, {duration: 4000, panelClass: 'successSnackBar'});
          console.log('here');
          this.service.getAcademicTerms().subscribe(data => {
            this.tableData = data;
            this.dataSource.data = this.tableData;
            AcademicTermService.academicTermsList = this.tableData;
          });
        }
      }, error => {
        this.snackBar.open('Academic Term  Saving Failed', undefined, {duration: 4000, panelClass: 'failedSnackBar'});
      });
    }
  }

  viewAcademicTerm(academicTerm: AcademicTermModel): void {
    this.dialog.open(ViewAcademicTermComponent, {data: academicTerm});
    this.service.closeSaveEvent.subscribe(e => {
      this.dialog.closeAll();
    });
  }

  deleteAcademicTerm(row: AcademicTermModel): void {
    this.dialog.open(DeleteAcademicTermComponent, {width: '450px'});
    this.subscriptionsList.push(this.service.academicTermDeleteEvent.pipe(take(1)).subscribe(_ => {
      this.service.deleteAcademicTerm(row.id).subscribe(() => {
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
    return this.service.academicTermFilterEvent
      .subscribe(list => {
        if (list[1] === null) {
          this.pageIndex = 1;
          this.dataSource.filter = list[0].trim().toLowerCase();
        } else {
          this.service.getAcademicTerms().subscribe(allAcademicTerms => {
            this.tableData = allAcademicTerms;
            this.dataSource.data = this.tableData;
            this.pageIndex = 1;
            this.dataSource.filter = list[0].trim().toLowerCase();
            if (list[1] !== undefined) {
              this.filterValue = list[1];
              this.dataSource.data = this.dataSource.data.filter(value => {
                return (value.academicYearDTO.id === list[1]);
              });
            }
          });
        }
      });
  }

  private initialDataSubscription(): Subscription {
    return this.service
      .getAcademicTerms()
      .subscribe(value => {
        this.tableData = value;
        this.dataSource.data = this.tableData;
        AcademicTermService.academicTermsList = value;
        console.log(value);
      });

  }

  private handleSuccessfulDeletion(): void {
    this.service
      .getAcademicTerms()
      .subscribe(value => {
        this.tableData = value;
        this.dataSource.data = this.tableData;
        AcademicTermService.academicTermsList = this.tableData;

      });
    this.snackBar.open('Academic Term Deleted Successfully', undefined, {duration: 4000, panelClass: 'successSnackBar'});
  }

  private handleFailedDeletion(): void {
    this.snackBar.open('Academic Term Deletion Failed', undefined, {duration: 4000, panelClass: 'failedSnackBar'});
  }

  ngOnDestroy(): void {
    this.subscriptionsList.forEach(sub => sub.unsubscribe());
  }
}
