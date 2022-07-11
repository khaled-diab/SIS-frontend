import {Component, OnInit} from '@angular/core';
import {AdminModel} from '../../../shared/model/security/admin-model';
import {Constants} from '../../../shared/constants';
import {UserFile} from '../../../shared/model/security/user-file';
import {ProfileService} from '../../service/profile.service';
import {PrimeNGConfig} from 'primeng/api';


declare var require: any;
const FileSaver = require('file-saver');

@Component({
   selector: 'app-admin',
   templateUrl: './admin.component.html',
   styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

   loggedInUser: AdminModel;
   adminFilesLinks: UserFile[] | null | any;


   constructor(private profileService: ProfileService, private primengConfig: PrimeNGConfig) {
   }

   ngOnInit(): void {
      this.primengConfig.ripple = true;
      // @ts-ignore
      this.loggedInUser = JSON.parse(localStorage.getItem(Constants.loggedInUser));
      this.extractAdminFiles(this.loggedInUser.user.userFileList);
   }

   private extractAdminFiles(userFileList: UserFile[]): void {
      this.adminFilesLinks = this.profileService.getAdminFilesLinks(userFileList);
      console.log(this.adminFilesLinks);
   }

   downloadFile(userFile: UserFile): void {
      FileSaver.saveAs(userFile.fileLink, userFile.fileName);
   }
}
