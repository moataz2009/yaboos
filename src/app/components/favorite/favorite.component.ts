import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery'
import { ToastrService } from 'ngx-toastr';
import { FavoritesService } from 'src/app/shared/favorites.service';
import { PlayerService } from 'src/app/shared/player.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  [x: string]: any;
  headerMessage : string;
  myFavourites: any = [];
  playFavourites: any = []; 
  isLogin:boolean ;
  offset: any = 0;
  loadMoreSong:any = true ;
  constructor(
      private favourites: FavoritesService, 
      private routr: Router, 
      private toastr: ToastrService,
      private playerUrl : PlayerService
    ) { }

  PlayTrack(id: any, title, status, image, index){
    if(status === false){
      this.PlayUrlTrack = `http://188.225.184.108:9091/api/songs/playsong/${id}`
      this.playerUrl.changeUrlPlayer(this.PlayUrlTrack);
      this.playerUrl.changePlayerStatus(true);
      this.playerUrl.changePlayerTitle(title);
      this.playerUrl.actionPlayNow("");
      this.playerUrl.actionIsFavorite(true);
      this.playerUrl.actionSongId(id);
      this.playerUrl.actionPlayerType("track");
      this.playerUrl.actionPlayImage(image);

      // indexs
      this.playerUrl.ActionPlayList(this.playFavourites);
      this.playerUrl.ActionPlayerIndex(index);

      console.log(this.myFavourites);
    }else{
      this.playerUrl.ngStop()
      this.playerUrl.changePlayerStatus(false);
      this.playerUrl.changePlayerTitle(title);
      this.playerUrl.actionPlayerType("track");
    }
  }

  fillHeader(message , url)
  {
    this.IsMobileHeader = true;
    this.headerMessage =message;
    this.mobileAppUrl =url;
  }
  getMobileOperatingSystem() {

    var userAgent = navigator.userAgent || navigator.vendor;
      // Windows Phone must come first because its UA also contains "Android"
      if (/android/i.test(userAgent)) {
        this.mobileAppUrl="https://play.google.com/";
        this.fillHeader("Get Yaboos  Mobile App" ,  this.mobileAppUrl);
          return "Android";

      }
  
      // iOS detection from: http://stackoverflow.com/a/9039885/177710
     else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
     this.mobileAppUrl="https://www.apple.com/lae/ios/app-store/";
      this.fillHeader("Get Yaboos  Mobile App" ,  this.mobileAppUrl);
          return "iOS";
      }
      else{
        // this.mobileAppUrl="https://play.anghami.com/";
        // this.fillHeader("Get Yaboos ios Mobile App" ,  this.mobileAppUrl);
        return "PC";
      }
  
     
  }

  isPlaying: boolean = false;
  thisicon:boolean=false;
  mainicon:boolean=true;
  songPlayIcon: boolean = false;


  SongUrl:String;
  SongDataName: String;

  openmusicmodel(SongData: any){ 

    this.SongUrl = SongData.lowQuality;
    this.SongDataName = SongData.title;
    
    this.isPlaying= true;
    
  }
  closeMedia() {
    this.isPlaying= false;
  }

showanothericon(){
  this.songPlayIcon=true;
  this.mainicon=false;
}
showamainicon(){
  this.songPlayIcon=false;
  this.mainicon=true;
}
hidenow:boolean=false;
hidelate:boolean=true;
myhello(){
  this.hidenow=true;
  this.hidelate=false;
  $('#songplayer').css("display","none");
  $('.firstimage').css("display","none");
  // $('.secondModal').css("width","90%");
  $('.secondModal').css("top","78%");

  if(($(window).width() <= 319)){
    $('.secondModal .navigation a').css("font-size","15px");
    $('.secondModal .navigation .secondimage').css("width","59px");
  }
  if(($(window).width() <= 575.98)){
    $('.secondModal').css("top","70%");
  }
  if(($(window).width() >= 575.99)&&($(window).width() <= 767.98)){
    $('.secondModal').css("top","75%");
  }
  if(($(window).width() >= 992)&&($(window).width() <= 1199.98)){
    $('.secondModal').css("top","84%");
  }
  if(($(window).width() >= 1200)&&($(window).width() <= 1399)){
    $('.secondModal').css("top","79%");
  }
  if(($(window).width() >= 1400)&&($(window).width() <= 1900)){
    $('.secondModal').css("top","75%");
  }
  if(($(window).width() >= 1901)){
    $('.secondModal').css("top","79%");
  }

  $('.secondModal .modal-content').css("background-color","#32AAB2");
  $('.secondModal .modal-content').css("width","100%");
  if(($(window).width() >= 1200)){
    $('.secondModal .modal-content').css("width","89%");
  }
  $('.centeredimage').attr("src","../../../assets/imgs/Icons-01.png");
  $('.navigation .our-prev-icon').css("color","#3EB7BA");
  // centeredimage
}
opensmodal(){
  this.hidenow=false;
  this.hidelate=true;

$('#songplayer').css("display","none");
$('.firstimage').css("display","block");
$('.secondModal').css("top","28%");
$('.secondModal .modal-content').css("background-color","#3EB7BA");
$('.secondModal .modal-content').css("width","90%");
// edit
if(($(window).width() <= 319)){
  $('.secondModal .navigation a').css("font-size","15px");
  $('.secondModal .navigation .secondimage').css("width","59px");
}
if(($(window).width() >= 768)&&($(window).width() <= 991)){
  $('.secondModal .modal-content').css("width","80%");
}
if(($(window).width() >= 992)&&($(window).width() <= 1199)){
  $('.secondModal .modal-content').css("width","90%");
}
if(($(window).width() >= 1200)){
  $('.secondModal .modal-content').css("width","80%");
}

// edit
$('.centeredimage').attr("src","../../../assets/imgs/playericon.png");
$('.navigation .our-prev-icon').css("color","#1a5356");
}


  
  showmodalhere(){
    this.isPlaying=true;
    this.hideshow=false;
  }
  showminiwindow2(){
    this.isPlaying=false;
    this.hideshow=true;
   
  }

  loadmoresongs(){
    this.offset = this.offset + 1;
    this.getMyFavourites();
  }

  ngOnInit(): void {
    this.getMobileOperatingSystem();
    this.getMyFavourites();
    
  }

  deleteFromFavorite(SongId: String, i){

 
    this.favourites.deleteFromFavorite(SongId).subscribe((data: any) => {
      
      this.toastr.success('تم الحذف بنجاح');
      this.myFavourites.splice(i, 1);
    

    }, (err: HttpErrorResponse) => {
      if(localStorage.getItem('userToken') != null){
      }else{
         this.router.navigate(['/login']);
         return false;
      }
      this.toastr.error('لم يتم الحذف ');

    });
  }

  getMyFavourites(){
    
    this.favourites.myFavourites(this.offset).subscribe((res: any) => {

      for(var i in res.result) {
        this.myFavourites.push(res.result[i]);
        
        this.playFavourites.push(res.result[i].song);
        res.result[i].song['isFavorite'] =  true;
      }


      if( this.myFavourites.length >= res.length ){
        this.loadMoreSong = false;
      }else{
          this.loadMoreSong = true;
      }

      this.offset = this.offset + 1;

    }, (err: HttpErrorResponse) => {
      //console.log("Error ::ToDo");
    });
  }

}
