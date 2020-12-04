import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
import { HttpClient  } from '@angular/common/http';
@Injectable()
export class MessagingService {
currentMessage = new BehaviorSubject(null);
constructor(private angularFireMessaging: AngularFireMessaging, private http: HttpClient,) {
this.angularFireMessaging.messaging.subscribe(
(_messaging) => {
_messaging.onMessage = _messaging.onMessage.bind(_messaging);
_messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
}
)
}
 token:string
 requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
    (token) => {
   //console.log("devicetoken" , token);
    localStorage.setItem('token' ,token );
    },
    (err) => {
    console.error('Unable to get permission to notify.', err);
    }
    );
    }
    receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
    (payload) => {
    this.currentMessage.next(payload);
    })
    }
    }