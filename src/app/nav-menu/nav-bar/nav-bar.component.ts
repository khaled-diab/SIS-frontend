import {Component, Input, OnInit} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {Constants} from '../../shared/constants';
import {Router} from '@angular/router';
import {StudentModel} from '../../shared/model/student-management/student-model';
import {FacultyMemberModel} from '../../shared/model/facultyMember-management/facultyMember-model';
import {AdminModel} from '../../shared/model/security/admin-model';
import {UserFile} from '../../shared/model/security/user-file';
import {ProfileService} from '../../profile/service/profile.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input() sideMenu: MatSidenav;
  loggedInUser: StudentModel | FacultyMemberModel | AdminModel;
  profilePicture: UserFile | undefined;
  profilePictureLink: string | undefined;

  constructor(private router: Router, private profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.profileService.updateProfilePictureEvent.subscribe(value => this.profilePictureLink = value);
    // @ts-ignore
    this.loggedInUser = JSON.parse(localStorage.getItem(Constants.loggedInUser));
    this.profilePicture = this.loggedInUser?.user?.userFileList.filter(value => value.type === Constants.FILE_TYPE_PROFILE_PICTURE).pop();
    this.getProfileImageLink();
  }

  public logout(): void {
    localStorage.removeItem(Constants.authHeader);
    localStorage.removeItem(Constants.loggedInUser);
    localStorage.removeItem(Constants.screens);
    this.router.navigate(['/login']).then(_ => {
    });
  }

  getProfileImageLink(): void {
    this.profilePictureLink = Constants.downloadFileURL + this.profilePicture?.directories;
  }

  goToProfile(): void {
    this.router.navigate(['/profile']).then(_ => {
    });
  }
}
