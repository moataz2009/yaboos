import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/shared/player.service';
import { MainURL } from 'src/service/globals/global-config';


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
  PlayerTitle:String;
  playerVolumeVal: any;
  TimePlayer:any;
  FooterPostion:any;
  PlayerTypes:any;
  PlayImageVar:any;
  Main_URL:any;
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

    this.Main_URL = MainURL;
    
    this.playerUrl.currentUrl.subscribe(data => {
      this.playUrl = data ;
      this.openMusic(this.playUrl, '');
    } );

    this.playerUrl.PlayImageVar.subscribe(data => {
      this.PlayImageVar = data;
    });

    this.playerUrl.PlayerStatus.subscribe(data => {
      this.playerStatus = data;
    });

    this.playerUrl.PlayerTypes.subscribe(data => {
      this.PlayerTypes = data;
    });

    this.playerUrl.StopPlayerVar.subscribe(data => {
      this.TimePlayer = data;
    });

    this.playerUrl.PlayerTitle.subscribe(data => {
      this.PlayerTitle = data;
    });

    this.playerUrl.playerVolumeVal.subscribe(data => {
      this.playerVolumeVal = data;
    });

    //playerVolumeVal
  
    

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
