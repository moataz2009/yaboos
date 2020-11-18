import { Component ,Output } from '@angular/core';
import { MessagingService } from '../service/messaging.service';
import { HttpClient  } from '@angular/common/http';
	
import { ValidationService } from './validation.service';
import * as $ from 'jquery'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  [x: string]: any;
  @Output('mybutton') mybutton:string;



  title = 'Yaboos';
  devicetok :any;
  message:any;
  constructor(private messagingService: MessagingService ,   private http: HttpClient,) {
   this.devicetok=  this.messagingService ;
  }

   ngOnInit(): void {

    $(document).ready(function() {
      $('audio').on("play",function() {
        $(this.mybutton).children(":first").attr("src" , "../assets/imgs/Materials-05.png");
        $('a#button2').children(":first").attr("src" , "../assets/imgs/CD_GIF.gif");
      });
      $('audio').on("pause",function() {
        $(this.mybutton).children(":first").attr("src" , "../assets/imgs/Materials-04.png");
        $('a#button2').children(":first").attr("src" , "../assets/imgs/CD.png");
      });
    });




    // document.body.classList.remove();
    document.body.classList.add('backGround-1');
    this.messagingService.requestPermission();
  this.messagingService.receiveMessage();
  this.message = this.messagingService.currentMessage;
  let token = localStorage.getItem('token');
 
  if(token) {
  console.log(token.toString());
const headers = { 'Content-Type':'application/json'}
const body = { title: 'Angular POST Request Example' }
this.http.post<any>('http://188.225.184.108:9091/api/notifications/RefreshToken', '"'+token+'"', { headers }).subscribe(data => {
});


  }
  }
  ngOnDestroy(){
    document.body.classList.remove('backGround-1');
  }
}
