import {Component, OnInit} from '@angular/core';
import {SecurityService} from '../service/security.service';
import {LoginModel} from '../../shared/model/security/login-model';
import {Constants} from '../../shared/constants';
import {FacultyMemberModel} from '../../shared/model/facultyMember-management/facultyMember-model';
import {StudentModel} from '../../shared/model/student-management/student-model';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AdminModel} from '../../shared/model/security/admin-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginModel: LoginModel = new LoginModel();

  constructor(public securityService: SecurityService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    if (localStorage.getItem(Constants.authHeader) !== null) {
      this.router.navigate(['/']).then(_ => {
      });
    }
  }

  public login(): void {
    this.securityService.login(this.loginModel)
      .subscribe(value => {
        this.handleSuccessfulLogin(value);
      }, _ => {
        this.handleFailedLogin();
      });
  }


  private handleSuccessfulLogin(value: FacultyMemberModel | StudentModel | AdminModel): void {
    localStorage.setItem(Constants.authHeader, 'Bearer ' + value.user.token);
    localStorage.setItem(Constants.loggedInUser, JSON.stringify(value));
    localStorage.setItem(Constants.screens, value.user.role.roleScreens.map(screens => screens.screen).map(screen => screen.name).join());
    this.router.navigate(['/']).then(_ => {
    });
  }

  private handleFailedLogin(): void {
    this.snackBar.open('Invalid Email Or Password', undefined, {duration: 4000, panelClass: 'failedSnackBar'});
  }

}
