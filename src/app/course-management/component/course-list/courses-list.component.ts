import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {CourseManagementService} from '../../service/course-management.service';
import {Subscription} from 'rxjs';
import {PageRequest} from '../../../shared/model/page-request';
import {Sort} from '@angular/material/sort';
import {BsModalService} from 'ngx-bootstrap/modal';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CourseModel} from '../../../shared/model/course-management/course-model';
import {CourseRequestModel} from '../../../shared/model/course-management/course-request-model';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {SaveCourseComponent} from '../save-course/save-course.component';
import {DeleteCourseDialogComponent} from '../delete-courses-dialog/delete-course-dialog.component';
import {take} from 'rxjs/operators';
import {PreviewCourseComponent} from '../preview-course/preview-course.component';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit, OnDestroy {

  @ViewChild('paginator') paginator: MatPaginator;
  tableData: PageRequest<CourseModel>;
  courseRequestModel: CourseRequestModel = new CourseRequestModel();
  displayedColumns = ['No.', 'code', 'nameAr', 'nameEn', 'department', 'college', 'Actions'];
  pageIndex = 1;
  defaultPgeSize = 10;
  subscriptionList: Subscription[] = [];
  isSmallScreen: boolean;
  courseModel = new CourseModel();
  lastPageLength = 0;

  constructor(private courseManagementService: CourseManagementService,
              private modalService: BsModalService,
              private snackBar: MatSnackBar,
              private route: Router,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.subscriptionList = this.subscriptions();
  }


  pageChangeEvent(event: PageEvent): void {
    console.log(event.pageIndex, event.pageSize);
    this.courseManagementService.getCoursePage(event.pageIndex + 1, event.pageSize, this.courseRequestModel)
      .subscribe(value => {
        this.lastPageLength = value.totalCount % value.pageSize;
        this.tableData = value;
      });
  }


  private subscriptions(): Subscription[] {
    this.subscriptionList.push(this.initialDataSubscription());
    this.subscriptionList.push(this.filterEventSubscription());
    return this.subscriptionList;
  }

  sortEvent($event: Sort): void {
    this.courseRequestModel = this.courseManagementService.constructCourseRequestObject($event, this.courseRequestModel);
    this.courseManagementService.getCoursePage(1, this.defaultPgeSize, this.courseRequestModel).subscribe(value => {
      this.tableData = value;
    });
  }

  addOrUpdateCourse(course: CourseModel): void {
    if (this.isSmallScreen) {
      this.route.navigateByUrl('/course-management/create-course', {state: course}).then(_ => console.log());
    } else {
      this.dialog.open(SaveCourseComponent, {width: '800px', height: '542px', data: course});
      this.courseManagementService.courseSaveCloseEvent.subscribe(
        close => {
          this.dialog.closeAll();
          if (close !== 'cancel') {
            this.initialDataSubscription();
          }
        },
      );
    }
  }

  previewCourse(course: CourseModel): void {
    this.dialog.open(PreviewCourseComponent, {width: '800px', height: '542px', data: course});
    this.courseManagementService.courseSaveCloseEvent.subscribe(value => {
      this.dialog.closeAll();
      this.initialDataSubscription();
    });
  }

  deleteCourse(row: CourseModel): void {
    this.dialog.open(DeleteCourseDialogComponent, {width: '450px', data: row.id});
    this.subscriptionList.push(this.courseManagementService.courseDeleteEvent.pipe(take(1)).subscribe(_ => {
      console.log(row.id);
      this.courseManagementService.deleteCourse(row.id).subscribe(() => {
        console.log(row.id);
        this.handleSuccessfulDeletion();
      }, () => {
        this.handleFailedDeletion();
      });
    }));
  }

  private filterEventSubscription(): Subscription {
    return this.courseManagementService.courseFilterEvent
      .subscribe(value => {
        this.courseRequestModel = value;
        this.paginator.pageIndex = 0;
        this.courseManagementService
          .getCoursePage(1, this.defaultPgeSize, this.courseRequestModel)
          .subscribe(filteredData => {
            this.tableData = filteredData;
          });
      });
  }

  private initialDataSubscription(): Subscription {
    return this.courseManagementService
      .getCoursePage(1, this.defaultPgeSize, this.courseRequestModel)
      .subscribe(value => {
        this.lastPageLength = value.totalCount % value.pageSize;
        this.tableData = value;
      });
    // return this.courseManagementService
    //   .getCoursePage(0, this.defaultPgeSize, this.courseRequestModel)
    //   .subscribe(value => {
    //     this.tableData = value;
    //   });
  }

  private handleSuccessfulDeletion(): void {
    console.log('last ', this.lastPageLength);
    console.log(this.paginator.pageIndex, this.paginator.pageSize);
    const newPageIndex = this.paginator.pageIndex + ((this.lastPageLength !== 1 && this.paginator.pageSize !== 1)
    || this.paginator.pageIndex === 0 ? 1 : 0);

    this.courseManagementService
      .getCoursePage(newPageIndex, this.paginator.pageSize, this.courseRequestModel)
      .subscribe(value => {
        this.lastPageLength = value.totalCount % value.pageSize;
        this.tableData = value;
      });
    this.snackBar.open('Course Deleted Successfully', undefined, {duration: 4000, panelClass: 'successSnackBar'});

  }

  private handleFailedDeletion(): void {
    this.snackBar.open('Course Deletion Failed', undefined, {duration: 4000, panelClass: 'failedSnackBar'});

  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach(sub => sub.unsubscribe());
  }
}

