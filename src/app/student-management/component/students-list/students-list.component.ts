import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {PageRequest} from '../../../shared/model/page-request';
import {Subscription} from 'rxjs';
import {StudentManagementService, UpdatePreviewData} from '../../service/student-management.service';
import {StudentModel} from '../../../shared/model/student-management/student-model';
import {StudentRequestModel} from '../../../shared/model/student-management/student-request-model';
import {Sort} from '@angular/material/sort';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DeleteStudentModalComponent} from '../delete-student-modal/delete-student-modal.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {UpdateStudentComponent} from '../update-student/update-student.component';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {DepartmentModel} from '../../../shared/model/department-management/department-model';
import {StudentRecordModel} from '../../../shared/model/student-management/student-record-model';
import {MessageService} from 'primeng/api';

@Component({
   selector: 'app-students-list',
   templateUrl: './students-list.component.html',
   styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit, OnDestroy {


   @ViewChild('paginator') paginator: MatPaginator;

   tableData: PageRequest<StudentRecordModel>;
   x: number;
   studentRequestModel: StudentRequestModel = new StudentRequestModel();
   displayedColumns = ['NO.', 'universityId', 'nameAr', 'departmentId', 'collegeId', 'level', 'Actions'];
   pageIndex = 0;
   defaultPgeSize = 10;
   department: string;
   departments: DepartmentModel[];
   subs: Subscription[] = [];
   public modalRefDelete: BsModalRef;

   constructor(private studentManagementService: StudentManagementService,
               private dialog: MatDialog,
               private modalService: BsModalService,
               private snackBar: MatSnackBar,
               private route: Router, private messageService: MessageService) {
   }


   addStudent(): void {
      this.route.navigate(['/students-management', 'student-add']);
   }


   ngOnInit(): void {

      this.subs = this.subscriptions();
   }

   pageChangeEvent(event: PageEvent): void {
      this.studentManagementService.searchRecords(this.paginator.pageIndex, this.paginator.pageSize, this.studentRequestModel)
         .subscribe(value => {
            this.tableData = value;

         });
   }


   private subscriptions(): Subscription[] {
      const subscriptions = [];
      subscriptions.push(this.initialDataSubscription());
      subscriptions.push(this.filterEventSubscription());
      subscriptions.push(this.deleteStudentEventSubscription());
      return subscriptions;
   }

   private filterEventSubscription(): Subscription {
      return this.studentManagementService.studentFilterEvent
         .subscribe(value => {
            this.studentRequestModel = value;
            this.paginator.pageIndex = 0;
            this.studentManagementService.searchRecords(this.paginator.pageIndex, this.paginator.pageSize, this.studentRequestModel)
               .subscribe(filteredData => {
                  this.tableData = filteredData;
               });
         });

   }

   private initialDataSubscription(): Subscription {
      const filter = new StudentRequestModel();

      return this.studentManagementService
         .searchRecords(0, this.defaultPgeSize, filter).subscribe(value => {

            this.tableData = value;
            console.log(value);
         });
   }

   sortEvent($event: Sort): void {
      this.studentRequestModel = this.studentManagementService.constructStudentRequestObject($event, this.studentRequestModel);
      this.paginator.pageIndex = 0;
      this.studentManagementService.searchRecords(this.paginator.pageIndex, this.paginator.pageSize, this.studentRequestModel).subscribe(value => {
         this.tableData = value;
      });
   }

   private refreshStudents(): void {
      this.studentManagementService
         .searchRecords(this.paginator.pageIndex, this.paginator.pageSize, this.studentRequestModel)
         .subscribe(value => {
            this.tableData = value;
         });
   }

   private handleSuccessfulDeletion(): void {

      this.refreshStudents();
      // this.studentManagementService
      //   .searchStudents(this.paginator.pageIndex, this.paginator.pageSize, this.studentRequestModel)
      //   .subscribe(value => {
      //     this.tableData = value;
      //   });
      this.snackBar.open('Student Deleted Successfully', undefined, {duration: 2000, panelClass: 'successSnackBar'});

      // this.refreshStudents();
   }

   private handleFailedDeletion(): void {
      this.snackBar.open('Student Deletion Failed', undefined, {duration: 2000});
   }

   deleteStudent(row: StudentModel): void {
      this.modalRefDelete = this.modalService.show(DeleteStudentModalComponent, {
         backdrop: 'static',
         ignoreBackdropClick: true,
         keyboard: false
      });
      this.modalRefDelete.content.id = row.id;
   }

   private deleteStudentEventSubscription(): Subscription {
      return this.studentManagementService.studentDeleteEvent.subscribe(id => {
         this.studentManagementService.deleteStudent(id).subscribe(value => {
            this.handleSuccessfulDeletion();
         }, error => {
            this.handleFailedDeletion();
         });
      });
   }

   updateOrPreviewStudent(row: StudentRecordModel, selection: number): void {
      //
      //
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      dialogConfig.height = '800px';
      const data = new UpdatePreviewData();
      this.studentManagementService.getStudent(row.id).subscribe(value => {
         data.st = value;
         data.sel = selection;
         dialogConfig.data = data;
         this.dialog.open(UpdateStudentComponent, dialogConfig);

         this.studentManagementService.studentCloseUpdateEvent.pipe(take(1)).subscribe(_ => {
               this.dialog.closeAll();
               this.refreshStudents();
            }
         );
      });

   }

   ngOnDestroy(): void {
      this.subs.forEach(sub => sub.unsubscribe());
   }

   uploadBulkStudents($event: any): void {
      this.studentManagementService.uploadBulkStudents($event).subscribe(value => {
         this.messageService.add({severity: 'success', summary: 'Success', detail: value.message, life: 4000});
      }, _ => {
         this.messageService.add({severity: 'error', summary: 'Error', detail: 'File could not be uploaded try again later', life: 4000});
      });
   }
}

