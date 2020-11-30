import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/shared/player.service';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  host: {
    '(document:storage)': 'onStorageChange($event)'
  }
})
export class PlayerComponent implements OnInit {

  playUrl: String;

  currentTime:String;
  duration:String;
  durationSeek:any;
  seek = 0;
  playerStatus:boolean ;
  PlayerTypes:String;
  constructor(private playerUrl : PlayerService) { }


  PlayRadio(status){
    if(status === false){
      this.playerUrl.ngPlay();
      this.playerUrl.changePlayerStatus(true);
    }else{
      this.playerUrl.ngStop()
      this.playerUrl.changePlayerStatus(false);
    }
  }

  ngOnInit(): void {
    
    this.playerUrl.currentUrl.subscribe(data => {
      this.playUrl = data ;
      this.openMusic(this.playUrl, '');
    } );


    this.playerUrl.PlayerStatus.subscribe(data => {
      this.playerStatus = data;
    });
  
    

    this.playerUrl.currentTime.subscribe(data => {
      this.currentTime = data ;
    } );

    this.playerUrl.duration.subscribe(data => {
      this.duration = data ;
    } );

    this.playerUrl.durationSeek.subscribe(data => {
      this.durationSeek = data ;
    } );

    this.playerUrl.seek.subscribe(data => {
      this.seek = data ;
    } );

  }
  
  /*  ---- Moataz Al-Ali -----  */

  openMusic(playUrl, title){
    this.playerUrl.openMusic(playUrl, title)
  }
  

  ngPlay(){
    this.playerUrl.ngPlay();
    console.log('play');
  }

  ngPause(){
    this.playerUrl.ngPause();
    console.log('ngPause');
  }

  ngStop(){
    this.playerUrl.ngStop();
    console.log('ngStop');
  }

  setVolume(event){
    this.playerUrl.setVolume(event);
  }

  setSeekTo(event){
    this.playerUrl.setSeekTo(event);
  }

}
