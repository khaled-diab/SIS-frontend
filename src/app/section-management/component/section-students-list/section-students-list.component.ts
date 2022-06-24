import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {PageRequest} from '../../../shared/model/page-request';
import {Subscription} from 'rxjs';
import {Sort} from '@angular/material/sort';
import {BsModalService} from 'ngx-bootstrap/modal';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {take} from 'rxjs/operators';
import {StudentEnrollmentModel} from '../../../shared/model/studentEnrollment-management/student-enrollment-model';
import {StudentEnrollmentRequestModel} from '../../../shared/model/studentEnrollment-management/student-enrollment-request-model';
import {StudentEnrollmentManagementService} from '../../../studentEnrollment-management/service/studentEnrollment-management.service';
import {DeleteStudentEnrollmentComponent} from '../../../studentEnrollment-management/component/studentEnrollment-delete/delete-studentEnrollment.component';
import {Navigation, Router} from '@angular/router';
import {SectionModel} from '../../../shared/model/section-model';

@Component({
  selector: 'app-section-students-list',
  templateUrl: './section-students-list.component.html',
  styleUrls: ['./section-students-list.component.css']
})
export class SectionStudentsListComponent implements OnInit {

  studentEnrollment: StudentEnrollmentModel;
  section = new SectionModel();
  nav: Navigation | null;
  @ViewChild('paginator') paginator: MatPaginator;
  tableData: PageRequest<StudentEnrollmentModel>;
  studentEnrollmentRequestModel: StudentEnrollmentRequestModel = new StudentEnrollmentRequestModel();
  displayedColumns = ['No.', 'university_id', 'name_en', 'Level', 'Actions'];
  pageIndex = 0;
  defaultPgeSize = 10;


  constructor(private studentEnrollmentManagementService: StudentEnrollmentManagementService,
              private dialog: MatDialog,
              private route: Router,
              private modalService: BsModalService,
              private snackBar: MatSnackBar) {

    this.nav = this.route.getCurrentNavigation();
    if (this.nav?.extras && this.nav.extras.state && this.nav.extras.state.section) {
      this.section = this.nav.extras.state.section;
      console.log(this.section);
    }

    // this.studentEnrollmentRequestModel.filterSection = this.section.id;
  }

  ngOnInit(): void {
    this.subscriptions();
  }

  pageChangeEvent(event: PageEvent): void {
    const filter = new StudentEnrollmentRequestModel();
    filter.filterSection = this.section.id;
    this.studentEnrollmentManagementService
      .searchStudentEnrollments(event.pageIndex, this.defaultPgeSize, filter).subscribe(value => {
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
        this.studentEnrollmentRequestModel.filterSection = this.section.id;
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
    filter.filterSection = this.section.id;
    return this.studentEnrollmentManagementService
      .searchStudentEnrollments(this.pageIndex, this.defaultPgeSize, filter).subscribe(value => {
        this.tableData = value;
      });
  }

  sortEvent($event: Sort): void {
    this.studentEnrollmentRequestModel = this.studentEnrollmentManagementService
      .constructStudentEnrollmentRequestObject($event, this.studentEnrollmentRequestModel);
    this.studentEnrollmentRequestModel.filterSection = this.section.id;
    this.studentEnrollmentManagementService.searchStudentEnrollments(this.paginator
      .pageIndex, this.paginator.pageSize, this.studentEnrollmentRequestModel).subscribe(value => {
      this.tableData = value;
    });
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
}
