import {Component, OnInit} from '@angular/core';
import {SecurityService} from './security/service/security.service';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {Constants} from './shared/constants';
import {AdminModel} from './shared/model/security/admin-model';
import {environment} from '../environments/environment';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   title = 'sis-manager';
   loggedInUser: AdminModel;
   private connecting = false;
   private topicQueue: any[] = [];
   socket = new SockJS(environment.socketUrl);
   stompClient = Stomp.over(this.socket);

   constructor(private securityService: SecurityService) {

   }

   ngOnInit(): void {
      this.securityService.loginEvent.subscribe(_ => {
         // @ts-ignore
         this.loggedInUser = JSON.parse(localStorage.getItem(Constants.loggedInUser));
         if (this.loggedInUser.user.type === Constants.ADMIN_TYPE) {
            this.subscribe(Constants.FILE_UPLOAD_TOPIC_NAME);
         }
      });
   }

   subscribe(topic: string): void {
      // If stomp client is currently connecting add the topic to the queue
      if (this.connecting) {
         this.topicQueue.push(topic);
         return;
      }

      const connected: boolean = this.stompClient.connected;
      if (connected) {
         // Once we are connected set connecting flag to false
         this.connecting = false;
         this.subscribeToTopic(topic);
         return;
      }

      // If stomp client is not connected connect and subscribe to topic
      this.connecting = true;
      this.stompClient.connect({}, (): any => {
         this.subscribeToTopic(topic);

         // Once we are connected loop the queue and subscribe to remaining topics from it
         this.topicQueue.forEach(value => {
            this.subscribeToTopic(value);
         });
         // Once done empty the queue
         this.topicQueue = [];
      });
   }

   private subscribeToTopic(topic: string): void {
      this.stompClient.subscribe(topic, (response?: string): any => {
         console.log('hello from webSocket' + response);
      });
   }
}
