import {Component, OnInit} from '@angular/core';
import {GeneralSearchRequest} from '../shared/model/general-search-request';
import {ImportedUsersService} from './imported-users.service';
import {PageRequest} from '../shared/model/page-request';
import {UserFile} from '../shared/model/security/user-file';
import {LoadDataEvent} from '../shared/model/load-data-event';
import {Constants} from '../shared/constants';

declare var require: any;
const FileSaver = require('file-saver');

@Component({
   selector: 'app-imported-users',
   templateUrl: './imported-users.component.html',
   styleUrls: ['./imported-users.component.css']
})
export class ImportedUsersComponent implements OnInit {


   userFilesRequestModel: GeneralSearchRequest = new GeneralSearchRequest();
   tableData: PageRequest<UserFile>;
   pageIndex = 0;
   pageSize = 5;
   loading = true;
   firstTime = true;

   constructor(private importedUsersService: ImportedUsersService) {
   }

   ngOnInit(): void {
      this.initialDataSubscription();
   }

   applyFilter(): void {
      this.loading = true;
      this.importedUsersService.getUsersFilesPage(0, this.pageSize, this.userFilesRequestModel)
         .subscribe(filteredData => {
            this.loading = false;
            this.tableData = filteredData;
            this.tableData.data = this.importedUsersService.getAdminFilesLinks(this.tableData.data);
         });
   }

   loadData(event: LoadDataEvent): void {
      this.loading = true;
      this.userFilesRequestModel.sortBy = event.sortField !== undefined ? event.sortField : this.userFilesRequestModel.sortBy;
      this.userFilesRequestModel.sortDirection = event.sortOrder === 1 ? Constants.ASC : Constants.DESC;
      if (this.firstTime) {
         this.loading = false;
         this.firstTime = false;
      } else {
         this.importedUsersService.getUsersFilesPage(
            this.pageIndex, this.pageSize, this.userFilesRequestModel).subscribe(value => {
            this.loading = false;
            this.tableData = value;
            this.tableData.data = this.importedUsersService.getAdminFilesLinks(this.tableData.data);
         });
      }
   }

   paginate(page: any): void {
      this.loading = true;
      if (page === null) {
         this.importedUsersService.getUsersFilesPage(this.pageIndex, this.pageSize, this.userFilesRequestModel).subscribe(value => {
            this.loading = false;
            this.tableData = value;
         });
      } else {
         this.pageIndex = page.page;
         this.pageSize = page.rows;
         this.importedUsersService.getUsersFilesPage(this.pageIndex, this.pageSize, this.userFilesRequestModel).subscribe(value => {
            this.loading = false;
            this.tableData = value;
            this.tableData.data = this.importedUsersService.getAdminFilesLinks(this.tableData.data);
         });
      }
   }


   private initialDataSubscription(): void {
      this.userFilesRequestModel = new GeneralSearchRequest();
      this.loading = true;
      this.importedUsersService.getUsersFilesPage(0, this.pageSize, this.userFilesRequestModel).subscribe(value => {
         this.tableData = value;
         this.tableData.data = this.importedUsersService.getAdminFilesLinks(this.tableData.data);
         this.loading = false;
      });
   }

   downloadFile(userFile: UserFile): void {
      FileSaver.saveAs(userFile.fileLink, userFile.fileName);
   }
}
