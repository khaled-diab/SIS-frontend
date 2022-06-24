import {Component, OnInit} from '@angular/core';
import {StudentModel} from '../../shared/model/student-management/student-model';
import {FacultyMemberModel} from '../../shared/model/facultyMember-management/facultyMember-model';
import {AdminModel} from '../../shared/model/security/admin-model';
import {UserFile} from '../../shared/model/security/user-file';
import {Router} from '@angular/router';
import {Constants} from '../../shared/constants';
import {ProfileService} from '../service/profile.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  loggedInUser: StudentModel | FacultyMemberModel | AdminModel;
  profilePicture: UserFile | undefined;
  profilePictureLink: string;

  constructor(private router: Router, private profileService: ProfileService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.loggedInUser = JSON.parse(localStorage.getItem(Constants.loggedInUser));
    this.profilePicture = this.loggedInUser?.user?.userFileList.filter(value => value.type === Constants.FILE_TYPE_PROFILE_PICTURE).pop();
    this.getProfileImageLink();
  }

  uploadPhoto(event: any): void {
    this.profileService.uploadProfilePicture(event, this.loggedInUser.user.email, this.loggedInUser.user.id.toString()).subscribe(response => {
      const profilePicture = new UserFile(response.message, null, Constants.FILE_TYPE_PROFILE_PICTURE, null);
      if (this.loggedInUser.user.userFileList.length === 0) {
        this.loggedInUser.user.userFileList.push(profilePicture);
        this.profilePicture = profilePicture;
      } else {
        this.loggedInUser.user.userFileList.map(value => {
          if (value.type === Constants.FILE_TYPE_PROFILE_PICTURE) {
            value.directories = response.message;
            this.profilePicture = profilePicture;
          }
          return value;
        });
      }
      localStorage.removeItem(Constants.loggedInUser);
      localStorage.setItem(Constants.loggedInUser, JSON.stringify(this.loggedInUser));
      this.profilePictureLink = Constants.downloadFileURL + this.profilePicture?.directories;
      this.profileService.updateProfilePictureEvent.next(Constants.downloadFileURL + this.profilePicture?.directories);
    }, _ => {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Upload Failed'});
    });
  }

  getProfileImageLink(): void {
    this.profilePictureLink = Constants.downloadFileURL + this.profilePicture?.directories;
  }
}
