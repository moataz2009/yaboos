import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import * as moment from 'moment'

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  playUrl: String;

  private minStatus = new BehaviorSubject<boolean>(false);
  PlayerStatus = this.minStatus.asObservable();

  private minType = new BehaviorSubject<String>(undefined);
  PlayerTypes = this.minType.asObservable();

  private minUrlSource = new BehaviorSubject<string>("");
  currentUrl = this.minUrlSource.asObservable();

  private mincurrentTime = new BehaviorSubject<string>("00:00:00");
  currentTime = this.mincurrentTime.asObservable();

  private minDuration = new BehaviorSubject<string>("00:00:00");
  duration = this.minDuration.asObservable();

  private mainDurationSeek = new BehaviorSubject<any>('');
  durationSeek = this.mainDurationSeek.asObservable();

  private mainSeek = new BehaviorSubject<any>(0);
  seek = this.mainSeek.asObservable();

  constructor() { }

  changeUrlPlayer(UrlPlayer: any){
    this.minUrlSource.next(UrlPlayer);
  }

  changePlayerStatus(UrlPlayer: any){
    this.minStatus.next(UrlPlayer);
  }

  /** plauer actions  */
  

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

  openMusic(playUrl, title){
    this.streamObserv(playUrl, title).subscribe(event => {});
    console.log('loded');
  }

  ngPlay(){
    this.audiObg.play();
    console.log('play');
  }

  ngStop(){
    this.audiObg.pause();
    //this.audiObg.currentTime = 0;
    console.log('ngStop');
  }

  timeFormat(time, format="HH:mm:ss"){
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  

  streamObserv(Url, title){
    return new Observable(observer => {

      this.audiObg.src = Url;
      this.audiObg.load();
      this.ngPlay();

      const handler = (event: Event) => {

        //console.log(event);
        if(title === 'live'){

          this.mainSeek.next(0);
          this.mincurrentTime.next(this.timeFormat(this.audiObg.currentTime));
          this.minDuration.next("00:00:00");
          this.mainDurationSeek.next(0);

        }else{

          this.mainSeek.next(this.audiObg.currentTime);
          this.mincurrentTime.next(this.timeFormat(this.audiObg.currentTime));
          this.minDuration.next(this.timeFormat(this.audiObg.duration));
          this.mainDurationSeek.next(this.audiObg.duration);

        }

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

  ngPause(){
    this.audiObg.pause();
    console.log('ngPause');
  }


}
