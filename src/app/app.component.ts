import { Component ,Output } from '@angular/core';
import { MessagingService } from '../service/messaging.service';
import { HttpClient  } from '@angular/common/http';
	
import { ValidationService } from './validation.service';
import * as $ from 'jquery'
import { PlayerOptionsService } from './shared/player-options.service';
import { PlayerService } from './shared/player.service';
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
  constructor(
    //private messagingService: MessagingService ,   
    private http: HttpClient,
    private PlayerOptions: PlayerOptionsService,
    private Player: PlayerService
    ) {
   this.devicetok=  this.messagingService ;
  }

   ngOnInit(): void {

    // if(localStorage.getItem('playerVolume') === null){
    //   this.PlayerOptions.changeVolumePlayer("meduim");
    // }

    // if(localStorage.getItem('playerVolumeValue') === null){
    //   this.Player.PlayerVolumeValue("0.50");
    // }

    this.PlayerOptions.PlayerVolume.subscribe(data => {
      this.playerVolume = data;
    });

    if(localStorage.getItem('playerVolume') != null){
      this.PlayerOptions.changeVolumePlayer(localStorage.getItem('playerVolume'));
    }



    $(document).ready(function() {
      $('audio').on("play",function() {
        $(this.mybutton).children(":first").attr("src" , "../assets/imgs/materials_05.png");
        $('a#button2').children(":first").attr("src" , "../assets/imgs/CD_GIF.gif");
      });
      $('audio').on("pause",function() {
        $(this.mybutton).children(":first").attr("src" , "../assets/imgs/materials_play.png");
        $('a#button2').children(":first").attr("src" , "../assets/imgs/CD.png");
      });
    });



    document.body.classList.add('backGround-1');
/*
    // document.body.classList.remove();
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
    let token = localStorage.getItem('token');
 
    if(token) {
     //console.log(token.toString());
      const headers = { 'Content-Type':'application/json'}
      const body = { title: 'Angular POST Request Example' }
      this.http.post<any>('http://188.225.184.108:9091/api/notifications/RefreshToken', '"'+token+'"', { headers }).subscribe(data => {
    
      });
    }*/
  }
  ngOnDestroy(){
    document.body.classList.remove('backGround-1');
  }
}
