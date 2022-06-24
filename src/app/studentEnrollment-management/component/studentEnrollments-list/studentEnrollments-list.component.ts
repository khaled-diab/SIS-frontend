import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {PageRequest} from '../../../shared/model/page-request';
import {Subscription} from 'rxjs';
import {Sort} from '@angular/material/sort';
import {BsModalService} from 'ngx-bootstrap/modal';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DeleteStudentEnrollmentComponent} from '../studentEnrollment-delete/delete-studentEnrollment.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {StudentEnrollmentModel} from '../../../shared/model/studentEnrollment-management/student-enrollment-model';
import {StudentEnrollmentRequestModel} from '../../../shared/model/studentEnrollment-management/student-enrollment-request-model';
import {StudentEnrollmentManagementService} from '../../service/studentEnrollment-management.service';
import {EditStudentEnrollmentComponent} from '../studentEnrollment-edit/edit-studentEnrollment.component';

@Component({
  selector: 'app-studentEnrollments-list',
  templateUrl: './studentEnrollments-list.component.html',
  styleUrls: ['./studentEnrollments-list.component.css']
})
export class StudentEnrollmentsListComponent implements OnInit, OnDestroy {

  studentEnrollment: StudentEnrollmentModel;
  @ViewChild('paginator') paginator: MatPaginator;
  tableData: PageRequest<StudentEnrollmentModel>;
  studentEnrollmentRequestModel: StudentEnrollmentRequestModel = new StudentEnrollmentRequestModel();
  displayedColumns = ['No.', 'university_id', 'name_en', 'Level', 'Actions'];
  pageIndex = 0;
  defaultPgeSize = 10;
  subscriptionList: Subscription[] = [];

  constructor(private studentEnrollmentManagementService: StudentEnrollmentManagementService,
              private dialog: MatDialog,
              private modalService: BsModalService,
              private snackBar: MatSnackBar,
              private route: Router){
  }

  ngOnInit(): void {
    this.subscriptionList = this.subscriptions();
  }

  pageChangeEvent(event: PageEvent): void {
    this.studentEnrollmentManagementService.getStudentEnrollmentsPage(event.pageIndex, event.pageSize)
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
    return this.studentEnrollmentManagementService.studentEnrollmentFilterEvent
      .subscribe(value => {
        this.studentEnrollmentRequestModel = value;
        this.paginator.pageIndex = 0;
        this.studentEnrollmentManagementService.searchStudentEnrollments
        (this.paginator.pageIndex, this.paginator.pageSize, this.studentEnrollmentRequestModel)
          .subscribe(filteredData => {
            this.tableData = filteredData;
          });
      });
  }

  private initialDataSubscription(): Subscription {
    const filter = new StudentEnrollmentRequestModel();

    return this.studentEnrollmentManagementService
      .searchStudentEnrollments(0, this.defaultPgeSize, filter).subscribe(value => {
        this.tableData = value;
        // console.log(value);
      });
  }

  sortEvent($event: Sort): void {
    this.studentEnrollmentRequestModel = this.studentEnrollmentManagementService
      .constructStudentEnrollmentRequestObject($event, this.studentEnrollmentRequestModel);
    this.studentEnrollmentManagementService.searchStudentEnrollments(this.paginator
      .pageIndex, this.paginator.pageSize, this.studentEnrollmentRequestModel).subscribe(value => {
      this.tableData = value;
    });
  }

  saveStudentEnrollment(): void {
    this.route.navigate(['/studentEnrollments-management', 'studentEnrollment-save']);
  }

  private refreshStudentEnrollments(): void {
    this.studentEnrollmentManagementService
      .getStudentEnrollmentsPage(this.paginator.pageIndex, this.paginator.pageSize)
      .subscribe(value => {
        this.tableData = value;
      });
  }

  updateStudentEnrollment(row: StudentEnrollmentModel): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.height = '700px';
    dialogConfig.data = row;
    this.dialog.open(EditStudentEnrollmentComponent, dialogConfig);
    this.studentEnrollmentManagementService.studentEnrollmentCloseUpdateEvent.pipe(take(1)).subscribe(value => {
        this.dialog.closeAll();
        this.refreshStudentEnrollments();
      }
    );
  }

  deleteStudentEnrollment(row: StudentEnrollmentModel): void {
    this.modalService.show(DeleteStudentEnrollmentComponent, {
      backdrop: 'static',
      ignoreBackdropClick: true,
      keyboard: false
    });
    this.studentEnrollmentManagementService.studentEnrollmentDeleteEvent.pipe(take(1)).subscribe(_ => {
      this.studentEnrollmentManagementService.deleteStudentEnrollment(row.id).subscribe(value => {
        this.handleSuccessfulDeletion();
      }, error => {
        this.handleFailedDeletion();
      });
    });
  }

  private handleSuccessfulDeletion(): void {
    this.studentEnrollmentManagementService
      .getStudentEnrollmentsPage(this.paginator.pageIndex, this.paginator.pageSize)
      .subscribe(value => {
        this.tableData = value;
      });
    this.snackBar.open('Student Enrollment Deleted Successfully', undefined, {
      duration: 2000,
      panelClass: 'successSnackBar'
    });
  }

  private handleFailedDeletion(): void {
    this.snackBar.open('Student Enrollment Deletion Failed', undefined, {duration: 2000});
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach(sub => sub.unsubscribe());
  }
}
