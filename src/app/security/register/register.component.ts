import {Component, OnInit} from '@angular/core';
import {SecurityService} from '../service/security.service';
import {RegisterModel} from '../../shared/model/security/register-model';
import {Constants} from '../../shared/constants';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoginModel} from '../../shared/model/security/login-model';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerModel: RegisterModel = new RegisterModel();

  constructor(private securityService: SecurityService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    if (localStorage.getItem(Constants.authHeader) !== null) {
      this.router.navigate(['/']).then(_ => {
      });
    }
  }

  public register(): void {
    this.securityService.register(this.registerModel)
      .subscribe(_ => {
        this.handleSuccessfulRegister();
      }, error => {
        this.handleFailedRegister(error);
      });
  }

  private handleSuccessfulRegister(): void {
    const loginModel = new LoginModel();
    loginModel.username = this.registerModel.username;
    loginModel.password = this.registerModel.password;
    this.securityService.login(loginModel).subscribe(_ => {
      this.router.navigate(['/']).then(__ => {
      });
    });
  }

  private handleFailedRegister(error: HttpErrorResponse): void {
    this.snackBar.open(error.error.message, undefined, {duration: 4000, panelClass: 'failedSnackBar'});
  }
}

