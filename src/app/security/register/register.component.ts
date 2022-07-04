import {Component, OnInit} from '@angular/core';
import {SecurityService} from '../service/security.service';
import {RegisterModel} from '../../shared/model/security/register-model';
import {Constants} from '../../shared/constants';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
   selector: 'app-register',
   templateUrl: './register.component.html',
   styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

   registerModel: RegisterModel = new RegisterModel();
   userType: string;

   constructor(private securityService: SecurityService, private router: Router, private messageService: MessageService) {
   }

   ngOnInit(): void {
      if (localStorage.getItem(Constants.authHeader) !== null) {
         this.router.navigate(['/']).then(_ => {
         });
      }
   }

   public register(): void {
      this.securityService.register(this.registerModel, this.userType).subscribe(value => {
         if (value.status === 500) {
            this.handleFailedRegister(value.message);
         } else {
            this.handleSuccessfulRegister(value.message);
         }
      });
   }

   private handleSuccessfulRegister(message: string): void {
      this.messageService.add({severity: 'success', summary: 'Success', detail: message});
      setTimeout(() => {
         this.router.navigate(['/login']).then(__ => {
         });
      }, 2000);
   }

   private handleFailedRegister(message: string): void {
      this.messageService.add({severity: 'error', summary: 'Error', detail: message});
   }
}

