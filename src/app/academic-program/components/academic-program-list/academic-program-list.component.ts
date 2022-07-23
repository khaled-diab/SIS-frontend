import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AcademicProgramRequestModel } from 'src/app/shared/model/academicProgram-management/academic-program-request-model';
import { AcademicProgramModel } from 'src/app/shared/model/academicProgram-management/academicProgram-model';
import { AcademicProgramService } from '../../service/academic-program.service';
import { AcademicProgramPreviewComponent } from '../academic-program-preview/academic-program-preview.component';
import { CreateAcademicProgramComponent } from '../create-academic-program/create-academic-program.component';
import { DeleteAcademicProgramComponent } from '../delete-academic-program/delete-academic-program.component';

@Component({
  selector: 'app-academic-program-list',
  templateUrl: './academic-program-list.component.html',
  styleUrls: ['./academic-program-list.component.css']
})
export class AcademicProgramListComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  tableData: AcademicProgramModel[];
  displayedColumns = ['No.', 'code', 'name_ar', 'name_en','department','college', 'Actions'];
  pageIndex = 1;
  defaultPageSize = 10;
  subscriptionsList: Subscription[] = [];
  isSmallScreen: boolean;
  academicProgramModel = new AcademicProgramModel();
  academicProgramRequestModel: AcademicProgramRequestModel = new AcademicProgramRequestModel();
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


  constructor(private dialog: MatDialog,
              private academicProgramService: AcademicProgramService,
              private modalService: BsModalService,
              private breakpointObserver: BreakpointObserver,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>();
    this.subscriptionsList = this.subscriptions();
  }

  
  addOrUpdateAcademicProgram(academicProgram: AcademicProgramModel): void {
    if (this.isSmallScreen) {
      this.router.navigateByUrl('/academicprograms/create-academicProgaram', {state: this.academicProgramModel}).then(_ => console.log());
    } else {
      this.dialog.open(CreateAcademicProgramComponent, {data: academicProgram});
      this.academicProgramService.academicProgramSaveCloseEvent.pipe(take(1)).subscribe(e => {
        this.dialog.closeAll();
    
        if (e !== 'Cancel') {
          this.snackBar.open('Academic Progaram Saved Successfully', undefined, {duration: 4000, panelClass: 'successSnackBar'});
          console.log('here');
          this.academicProgramService.getAllAcademicPrograms().subscribe(data => {
            this.tableData = data;
            this.dataSource.data = this.tableData;
            AcademicProgramService.academicProgramList = this.tableData;
          });
        }
      },
       error => {
        this.snackBar.open('Academic Program Saving Failed', undefined, {duration: 4000, panelClass: 'failedSnackBar'});
      });
    }
  }

  viewAcademicProgram(academicProgram: AcademicProgramModel): void {
    this.dialog.open(AcademicProgramPreviewComponent, {data: academicProgram});
    this.academicProgramService.academicProgramSaveCloseEvent.subscribe(e => {
      this.dialog.closeAll();
    }, error => {
      this.snackBar.open('Academic Program Saving Failed', undefined, {duration: 4000, panelClass: 'failedSnackBar'});
    });
  }

  deleteAcademicProgram(row: AcademicProgramModel): void {
    this.dialog.open(DeleteAcademicProgramComponent, {width: '450px'});
    this.subscriptionsList.push(this.academicProgramService.academicProgramDeleteEvent.subscribe(_ => {
      this.academicProgramService.deleteAcademicProgram(row.id).subscribe(() => {
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

  // private filterEventSubscription(): Subscription {
  //   return this.academicProgramService.academicProgramFilterEvent
  //     .subscribe(value => {
  //       this.academicProgramRequestModel = value;
  //       this.academicProgramService
  //         .getAllAcademicPrograms()
  //         .subscribe(filteredData => {
  //           this.tableData = filteredData;
  //           this.dataSource.data=this.tableData;
  //         });
  //     });
  // }
  private filterEventSubscription(): Subscription {
    return this.academicProgramService.academicProgramFilterEvent
      .subscribe(list => {
        if (list[1] === null) {
          this.pageIndex = 1;
          this.searchValue = list[0].trim().toLowerCase();
          this.filterValue = undefined;
          this.dataSource.filter = this.searchValue;
        } else {
          this.academicProgramService.getAllAcademicPrograms().subscribe(academicPrograms => {
            this.tableData = academicPrograms;
            this.dataSource.data = this.tableData;
            this.pageIndex = 1;
            this.academicProgramRequestModel= list[0]?.trim().toLowerCase();
            this.dataSource.filter = this.searchValue;
            if (list[1] !== undefined) {
              this.filterValue = list[1];
              this.dataSource.data = this.dataSource.data.filter(value1 => {
                return (value1.collegeDTO.id === list[1]);
              });
            }else{
              this.filterValue = undefined;
            }
            if (list[2]!== undefined) {
              this.filterValue = list[2];
              this.dataSource.data = this.dataSource.data.filter(value1 => {
                return (value1.departmentDTO.id === list[2]);
              });
            }
            else{
              this.filterValue = undefined;
            }
          });
        }
      });
  }

  private initialDataSubscription(): Subscription {
    return this.academicProgramService
      .getAllAcademicPrograms()
      .subscribe(value => {
        this.tableData = value;
        this.dataSource.data = this.tableData;
        AcademicProgramService.academicProgramList = this.tableData;
        console.log(this.tableData);

      });
  }

  private handleSuccessfulDeletion(): void {
    this.academicProgramService
      .getAllAcademicPrograms()
      .subscribe(value => {
        this.tableData = value;
        this.dataSource.data = this.tableData;
        AcademicProgramService.academicProgramList = this.tableData;
      });
    this.snackBar.open('Academic Program Deleted Successfully', undefined, {duration: 4000, panelClass: 'successSnackBar'});
  }

  private handleFailedDeletion(): void {
    this.snackBar.open('Academic Program Deletion Failed', undefined, {duration: 4000, panelClass: 'failedSnackBar'});
  }

  ngOnDestroy(): void {
    this.subscriptionsList.forEach(sub => sub.unsubscribe());
  }
}