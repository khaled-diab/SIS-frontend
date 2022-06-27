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

@Component({
   selector: 'app-students-list',
   templateUrl: './students-list.component.html',
   styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit , OnDestroy{



   @ViewChild('paginator') paginator: MatPaginator;

   tableData: PageRequest<StudentModel>;
   x: number;
   studentRequestModel: StudentRequestModel = new StudentRequestModel();
   displayedColumns = ['NO.', 'universityId', 'nameAr',  'collegeId', 'departmentId', 'year', 'Actions'];
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
               private route: Router, ){}



   addStudent(): void{
      this.route.navigate(['/students-management', 'student-add']);
   }



   ngOnInit(): void {
      this.subs = this.subscriptions();
   }
   pageChangeEvent(event: PageEvent): void {
      this.studentManagementService.searchStudents(this.paginator.pageIndex, this.paginator.pageSize, this.studentRequestModel)
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
            this.studentManagementService.searchStudents( this.paginator.pageIndex , this.paginator.pageSize, this.studentRequestModel)
               .subscribe(filteredData => {
                  this.tableData = filteredData;
               });
         });

   }

   private initialDataSubscription(): Subscription {
      const filter = new StudentRequestModel();

      return this.studentManagementService
         .searchStudents( 0, this.defaultPgeSize, filter).subscribe(value => {

            this.tableData = value;
         });
   }

   sortEvent($event: Sort): void {
      this.studentRequestModel = this.studentManagementService.constructStudentRequestObject($event, this.studentRequestModel);
      this.paginator.pageIndex = 0;
      this.studentManagementService.searchStudents( this.paginator.pageIndex , this.paginator.pageSize, this.studentRequestModel).subscribe(value => {
         this.tableData = value;
      });
   }

   private refreshStudents(): void {
      this.studentManagementService
         .searchStudents(this.paginator.pageIndex, this.paginator.pageSize, this.studentRequestModel)
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
      this.modalRefDelete = this.modalService.show( DeleteStudentModalComponent, { backdrop: 'static', ignoreBackdropClick: true, keyboard: false});
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
   updateOrPreviewStudent(row: StudentModel, selection: number): void {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      dialogConfig.height = '800px';
      const data = new  UpdatePreviewData();
      data.st = row;
      data.sel = selection;
      dialogConfig.data = data;
      this.dialog.open(UpdateStudentComponent, dialogConfig);
      this.studentManagementService.studentCloseUpdateEvent.pipe(take(1)).subscribe(value => {
            this.dialog.closeAll();
            this.refreshStudents();
         }
      );
   }

   ngOnDestroy(): void {
      this.subs.forEach(sub => sub.unsubscribe());
   }
}

