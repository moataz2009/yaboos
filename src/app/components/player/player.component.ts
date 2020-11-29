import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/shared/player.service';
import { Observable } from 'rxjs';
import * as moment from 'moment'

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

  currentTime = "00:00:00";
  duration = "00:00:00";
  durationSeek:any;
  seek = 0;

  constructor(private playerUrl : PlayerService) { }

  ngOnInit(): void {
    
    this.playerUrl.currentUrl.subscribe(data => {
      this.playUrl = data ;
      this.openMusic();
    } );

  }
  
  audiObg = new Audio();
  audioEvent = [
    'ended',
    'error',
    'play',
    'playing',
    'pause',
    'timeupdate',
    'canplay',
    'loadedmetadata',
    'loadstart'
  ];
  ngPlay(){
    this.audiObg.play();
    console.log('play');
  }

  ngPause(){

    this.audiObg.pause();
    console.log('ngPause');
  }

  ngStop(){
    this.audiObg.pause();
    this.audiObg.currentTime = 0;
    console.log('ngStop');
  }

  timeFormat(time, format="HH:mm:ss"){
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  openMusic(){
    this.streamObserv(this.playUrl).subscribe(event => {});
    console.log('loded');
  }



  streamObserv(Url){
    return new Observable(observer => {

      this.audiObg.src = Url;
      this.audiObg.load();
      this.audiObg.play();

      const handler = (event: Event) => {
        //console.log(event);
        this.seek = this.audiObg.currentTime;
        this.currentTime = this.timeFormat(this.audiObg.currentTime);
        this.duration = this.timeFormat(this.audiObg.duration);
        this.durationSeek = this.audiObg.duration;
      }

      this.addEvent(this.audiObg, this.audioEvent, handler);

      return () => {
        this.audiObg.pause();
        this.audiObg.currentTime = 0;
        this.removeEvent(this.audiObg, this.audioEvent, handler);
      }

    });
  }

  addEvent(obj, events, handler){
    events.forEach(event => {
      obj.addEventListener(event, handler);
    });
  }

  setSeekTo(ev) {
    this.audiObg.currentTime = ev.target.value;
  }
  removeEvent(obj, events, handler){
    events.forEach(event => {
      obj.removeEventListener(event, handler);
    });
  }


  setVolume(ev){
    this.audiObg.volume = ev.target.value;
    //console.log(ev.target.value);
  }




}
