import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FavoritesService } from 'src/app/shared/favorites.service';
import { PlayerService } from 'src/app/shared/player.service';
import { Songs } from 'src/models/songs.model';
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
  popupVar:any;
  songIdVar:String;

  minUrlPage:any;
  isFavorite: any;
  PlayIndex: any;
  PlayList: Songs[] = [];
  ContinuePlayer: any;
  CurreuntTime: any;
  PlayUrlTrack: any;
  constructor(
    private playerUrl : PlayerService,
    private favorites : FavoritesService,
    private toastr: ToastrService,
    private router: Router
    ) { 

      router.events.forEach((event) => {
        if(event instanceof NavigationStart) {
          this.minUrlPage = event.url;
        }
      });
    }


    // next to play

    nextPrevPlay(varNP: any){

      let nextToPlay = this.PlayIndex;
      
      
        if(varNP === 'next'){
          if(nextToPlay >= 0 && nextToPlay < this.PlayList.length - 1){
            nextToPlay  = this.PlayIndex + 1;
          }
        }
        
        if(varNP === 'back'){
          if(nextToPlay > 0 && nextToPlay <= this.PlayList.length){
            nextToPlay  = this.PlayIndex - 1;
          }
        }


      let list        = this.PlayList[nextToPlay];
      let title       = list.titleAr;
      let id           = list.id;

      this.PlayUrlTrack = `http://188.225.184.108:9091/api/songs/playsong/${id}`
      this.playerUrl.changeUrlPlayer(this.PlayUrlTrack);
      this.playerUrl.changePlayerStatus(true);
      this.playerUrl.changePlayerTitle(title);
      this.playerUrl.actionPlayNow("");
      this.playerUrl.actionPlayImage(list.album.artist.image);
      this.playerUrl.actionSongId(id);
      this.playerUrl.actionIsFavorite(list.isFavourite);
      this.playerUrl.actionPlayerType("track");

      // indexs
      this.playerUrl.ActionPlayList(this.PlayList);
      this.playerUrl.ActionPlayerIndex(nextToPlay);

    }

    ActionclosePlayer(){
      this.playerUrl.actionPlayerType(null);
      this.playerUrl.ngPause();
      this.playerUrl.changePlayerStatus(false);
    }


  addToFavorite(){

    if(localStorage.getItem('userToken') === null){
       this.router.navigate(['/login']);
       return false;
    }

    this.favorites.addToFavorite(this.songIdVar).subscribe((data) => {      
      this.toastr.success('تم الحفظ بنجاح');
      this.isFavorite = true;
    }, (err: HttpErrorResponse) => {
      this.toastr.success('لم يتم الحفظ ');
    });
  }

  deleteFromFavorite(){
    if(localStorage.getItem('userToken') === null){
      this.router.navigate(['/login']);
      return false;
    }

    this.favorites.deleteFromFavorite(this.songIdVar).subscribe((data: any) => {
      this.toastr.success('تم الحذف بنجاح');
      this.isFavorite = false;
    }, (err: HttpErrorResponse) => {
      this.toastr.error('لم يتم الحذف ');
    });

  }

  PlayRadio(status){
    if(status === false){
      this.playerUrl.ngPlay();
      this.playerUrl.changePlayerStatus(true);
    }else{
      this.playerUrl.ngStop()
      this.playerUrl.changePlayerStatus(false);
    }
  }

  setNext30(){
    this.playerUrl.setNext30();
  }

  setBack30(){
    this.playerUrl.setBack30();
  }

  ngOnInit(): void {

    var getUrl = window.location.pathname.split('/');
    this.minUrlPage = getUrl[1];
    this.Main_URL = MainURL;
    
    this.playerUrl.currentUrl.subscribe(data => {
      this.playUrl = data ;
      this.openMusic(this.playUrl, '');
    } );

    this.playerUrl.IsFavorite.subscribe(data => {
      this.isFavorite = data;
    });

    this.playerUrl.ContinuePlayerVar.subscribe(data => {
      this.ContinuePlayer = data;
    });

    this.playerUrl.CurreuntTimeVar.subscribe(data => {
      this.CurreuntTime = data;
    });

    this.playerUrl.PlayIndexVar.subscribe(data => {
      this.PlayIndex = data;
    });

    this.playerUrl.PlayListVar.subscribe(data => {
      this.PlayList = data;
    });

    this.playerUrl.songIdVar.subscribe(data => {
      this.songIdVar = data;
    });

    this.playerUrl.PlayImageVar.subscribe(data => {
      this.PlayImageVar = data;
    });

    this.playerUrl.popupVar.subscribe(data => {
      this.popupVar = data;
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
  
  ContinuePlay(){
    this.playerUrl.ngContinuePlay(this.CurreuntTime);
    this.playerUrl.ActionContinuePlayer(false);
  }

  StartPlay(){
    this.ngPlay();
    this.playerUrl.ActionContinuePlayer(false);
  }

  ngPlay(){
    this.playerUrl.ngPlay();
   //console.log('play');
  }

  ngPause(){
    this.playerUrl.ngPause();
   //console.log('ngPause');
  }

  ngStop(){
    this.playerUrl.ngStop();
   //console.log('ngStop');
  }

  setVolume(event){
    this.playerUrl.setVolume(event);
  }

  setSeekTo(event){
    this.playerUrl.setSeekTo(event);
  }

  setPopUp(){
    if(this.popupVar === 'true'){
      this.playerUrl.actionPopUp('false');
    }else{
      this.playerUrl.actionPopUp('true');
    }
  }

  

}
