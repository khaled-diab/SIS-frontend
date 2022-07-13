import {Component, OnInit} from '@angular/core';
import {SecurityService} from './security/service/security.service';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {Constants} from './shared/constants';
import {AdminModel} from './shared/model/security/admin-model';
import {environment} from '../environments/environment';
import {MessageService} from 'primeng/api';
import {MessageResponse} from './shared/model/message-response';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   title = 'sis-manager';
   loggedInUser: AdminModel;
   stompClient: any;

   constructor(private securityService: SecurityService, private messageService: MessageService) {

   }

   ngOnInit(): void {
      this.securityService.loginEvent.subscribe(_ => {
         // @ts-ignore
         this.loggedInUser = JSON.parse(localStorage.getItem(Constants.loggedInUser));
         if (this.loggedInUser.user.type === Constants.ADMIN_TYPE) {
            this.connect();
         }
      });
   }

   connect(): void {
      const socket = new SockJS(environment.socketUrl);
      this.stompClient = Stomp.over(socket);
      // tslint:disable-next-line:variable-name
      const _this = this;
      this.stompClient.connect({}, (_: string) => {
         _this.stompClient.subscribe(Constants.FILE_UPLOAD_TOPIC_NAME, (value: any) => {
            const messageResponse: MessageResponse = JSON.parse(value.body);
            if (messageResponse.status === 200) {
               this.messageService.add({severity: 'success', summary: 'Success', detail: messageResponse.message, life: 4000});
            } else {
               this.messageService.add({severity: 'error', summary: 'Error', detail: messageResponse.message, life: 6000});
            }
         });
      });
   }
}
