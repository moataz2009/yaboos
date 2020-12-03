import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import * as moment from 'moment'
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MainURL } from 'src/service/globals/global-config';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  playUrl: String;
  PlayNowStrind: any;
  PlayNowType: any;
  
  private minStatus = new BehaviorSubject<boolean>(false);
  PlayerStatus = this.minStatus.asObservable();

  private minPlayerTitle = new BehaviorSubject<String>(undefined);
  PlayerTitle = this.minPlayerTitle.asObservable();

  private minType = new BehaviorSubject<String>(null);
  PlayerTypes = this.minType.asObservable();

  private minPlayerVolumeValue = new BehaviorSubject<number>(0.5);
  playerVolumeVal = this.minPlayerVolumeValue.asObservable();

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

  private mainStopPlayer = new BehaviorSubject<any>(undefined);
  StopPlayerVar = this.mainStopPlayer.asObservable();

  private mainPlayNow = new BehaviorSubject<any>(undefined);
  playNowVar = this.mainPlayNow.asObservable();

  private mainPlayImage = new BehaviorSubject<any>(undefined);
  PlayImageVar = this.mainPlayImage.asObservable();

  private mainPopUp = new BehaviorSubject<any>('true');
  popupVar = this.mainPopUp.asObservable();

  private mainSongId = new BehaviorSubject<String>(null);
  songIdVar = this.mainSongId.asObservable();

  private mainStopImage = new BehaviorSubject<String>(null);
  StopImage = this.mainStopImage.asObservable();


  private mianPlaySearch = new BehaviorSubject<any>(null);
  PlaySearch = this.mianPlaySearch.asObservable();

  private mianIsFavorite = new BehaviorSubject<any>(null);
  IsFavorite = this.mianIsFavorite.asObservable();


  audiObg = new Audio();

  constructor(private http: HttpClient) {

    
    if(localStorage.getItem('playerVolumeValue') === null){
      this.minPlayerVolumeValue.next(0.50);
      this.setVolumePlayer(0.50);
    }



   }

   changeUrlPlayer(UrlPlayer: any){
    this.minUrlSource.next(UrlPlayer);
  }

  actionSongId(attr: any){
    this.mainSongId.next(attr);
  }

  actionIsFavorite(event: any){
    this.mianIsFavorite.next(event);
  }

  actionPlayerSearch(attr: any){
    this.mianPlaySearch.next(attr);
  }

  actionChangeStopImage(attr: any){
    this.mainStopImage.next(attr);
  }

  actionPopUp(attr: any){
    this.mainPopUp.next(attr);
  }

  actionPlayNow(NowPlayer: any){
    this.mainPlayNow.next(NowPlayer);
  }

  actionPlayImage(vars: any){
    this.mainPlayImage.next(vars);
  }

  actionPlayerType(NowPlayer: any){
    this.PlayNowStrind = NowPlayer;
    this.minType.next(NowPlayer);
  }

  ActionStopPlayer(TimePlayer: any, status: any){
    this.mainStopPlayer.next(TimePlayer);
    this.autoStopPlayerAction(TimePlayer);
    this.actionChangeStopImage(status);
  }

  ActionAutoPlayPlayer(TimePlayer: any){
    this.autoPlayPlayerAction(TimePlayer);
  }

  PlayerVolumeValue(UrlPlayer: any){
    this.minPlayerVolumeValue.next(UrlPlayer);
    this.setVolumePlayer(UrlPlayer);
  }

  changePlayerStatus(UrlPlayer: any){
    this.minStatus.next(UrlPlayer);
  }

  changePlayerTitle(title: any){
    this.minPlayerTitle.next(title);
  }

  /** plauer actions  */
  

  autoStopPlayerAction(TimePlayer){
    console.log("Start auto stop");
    console.log(TimePlayer);
    console.log("End auto stop");
    setTimeout( () => {
      this.ngAutoStop();
      this.actionChangeStopImage(null);
    },TimePlayer);
  }

  readonly rootUrl = MainURL;
  getPlayNow(){

    
    this.mainPlayNow.next('جاري التحميل ...');
    this.minPlayerTitle.next('جاري التحميل ...');

    setTimeout( () => {
      
      if(this.PlayNowStrind === "live"){
        //console.log("Play log note");
        this.http.get(this.rootUrl+'/api/Radio/GetCurrentSong').subscribe((data: any) => {
          
          this.mainPlayNow.next(data.date);
          this.minPlayerTitle.next(data.date);
          
        }, (err: HttpErrorResponse) => {
          //console.log("Error ::ToDo");
        });
      }

    } ,5000);


    setInterval( () => {
      
      if(this.PlayNowStrind === "live"){
        //console.log("Play log note");
        this.http.get(this.rootUrl+'/api/Radio/GetCurrentSong').subscribe((data: any) => {
          
          this.mainPlayNow.next(data.date);
          this.minPlayerTitle.next(data.date);
          
          //console.log('Do change');
        }, (err: HttpErrorResponse) => {
          //console.log("Error ::ToDo");
        });
      }

    } ,20000);
    
  }

  autoPlayPlayerAction(TimePlayer){
    console.log("Start auto stop");
    console.log(TimePlayer);
    console.log("End auto stop");
    setTimeout( () => this.ngAutoPlay() ,TimePlayer);
  }

  
  
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

  ngAutoPlay(){
    
    this.openMusic('http://188.225.182.10:8000/live', "live");

    this.minStatus.next(true);
    this.actionPlayerType("live");
    this.getPlayNow();

    console.log('ng auto Func Play');
  }

  openMusic(playUrl, PlayType){
    this.streamObserv(playUrl, PlayType).subscribe(event => {});
    console.log('loded');
  }

  ngPlay(){
    this.audiObg.play();
    console.log('play');
  }

  ngStop(){
    this.audiObg.pause();

    if(this.PlayNowStrind === 'live'){
      this.audiObg.currentTime = 0;
      console.log('ngStop zero');
    }
    
    console.log('ngStop');
  }

  ngAutoStop(){
    this.audiObg.pause();
    this.audiObg.currentTime = 0;
    this.minStatus.next(false);

    console.log('ng auto Func Stop');
  }

  

  timeFormat(time, format="HH:mm:ss"){
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  

  streamObserv(Url, PlayType){
    
    return new Observable(observer => {

      this.audiObg.src = Url;
      this.audiObg.load();

      this.ngPlay();

      const handler = (event: Event) => {

        
        if(event.type === 'ended'){
          this.changePlayerStatus(false);
        }
        
        if(PlayType === 'live'){

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
  }
  setVolumePlayer(ev){
    this.audiObg.volume = ev;


    //console.log(ev.target.value);
  }

  ngPause(){
    this.audiObg.pause();
    console.log('ngPause');
  }


}
