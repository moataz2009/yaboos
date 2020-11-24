import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
// http for api
import {HttpClient} from '@angular/common/http';
import { program, programsApiData } from '../../../models/program.model';
import { Album } from '../../../models/abum.model';
import {  Artist } from '../../../models/artist.model';

import { ArtistService } from '../../../service/artist.service';
import { programsService } from '../../../service/programs.service';
import { SongsService } from 'src/service/songs.service';
import { AlbumService } from '../../../service/album.service';

import { from, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
// 
import * as $ from 'jquery'
import { Songs } from 'src/models/songs.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {

  [x: string]: any;
  headerMessage : string;
  pagenumber : number =0;
programName:string;
programImage:string;
currentSongURL : any;
currentSongName:any;
currentSongId:any;
songPlayIcon:boolean = false;
  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
 autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    spaceBetween: 30,
     slidesPerView: 3,
    speed:200,
breakpoints:{  //when make it responsive
      280:{
           slidesPerView: 3, 
           spaceBetween: 10
          },
      360:{
            slidesPerView: 3, 
           },
      768:{
            slidesPerView: 3, 
          }
   },
    loop:true,
  };
  configer: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next1',
      prevEl: '.swiper-button-prev1'
    },
 autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    spaceBetween: 30,
     slidesPerView: 3,
    speed:200,
breakpoints:{  //when make it responsive
      280:{
           slidesPerView: 3, 
          },
          768:{
            slidesPerView: 3, 
            spaceBetween: 60,
           }
   },
    loop:true,
  };
//object from imports
  constructor(private http : HttpClient, private programServices: programsService , private SongsService:SongsService , private ArtistService : ArtistService , private route: Router,) { }
  //end call api
  album :Album;
  programsList: program[]=[];
  ArtistList : Artist[] = [];
  programsAPIList: programsApiData[]=[];
  EposidesList: Songs[]=[];
  Reporters :Artist[] = [];
  getAllData(){
    //this.programServices.get
   
    this.programServices.getAll('0','100').subscribe(res =>{
        this.programsList = res.result;
       this.programsList.forEach(function (i , item) {
        i.image = `http://188.225.184.108:9091/${i.image}`;
       }); 
      });
  }
  getReporters(){
    //this.programServices.get
   
    this.ArtistService.GetReporters('0','100').subscribe(res =>{
        this.Reporters = res.result;
        console.log( res.result);
       this.Reporters.forEach(function (i , item) {
        i.image = `http://188.225.184.108:9091/${i.image}`;
       }); 
      });
  }

//start call api


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
  hideprograms:boolean=true;
  hideprogrameer:boolean=true;
  showmyprograms:boolean = false;
  isPlaying:boolean=false;
  // song static modal 
  Played:boolean=true;

  hideshow:boolean=true;


thisicon:boolean=false;
mainicon:boolean=true;

showanotherheart: boolean = false;
hideheart: boolean = true;
programplaying: boolean = false;

allcontent:boolean=true;
stext:boolean=false;
endtext:boolean=true;
myalltext:boolean=false;


opentextsection(){
  this.allcontent=false;
  this.endtext=false;
  this.stext=true;
  this.myalltext=true;
}
openmaunsection(){
  this.allcontent=true;
  this.endtext=true;
  this.stext=false;
  this.myalltext=false;
}

showanothericon(){
  this.thisicon=true;
  this.mainicon=false;
}
showamainicon(){
  this.thisicon=false;
  this.mainicon=true;
}
closeMedia() {
  this.isPlaying= false;
  // 
  this.Played= false;
}
changeheart(){
  this.showanotherheart= true;
  this.hideheart= false;
}

  showprogrmslist(programId , programName , programImg){
    // debugger;
    this.hideprograms=false;
    this.hideprogrameer=false;
    this.showmyprograms = true;
    this.programName = programName;
    this.SongsService.GetSongsOfAlbum("0" , "12" ,programId ).subscribe(res =>{
      this.EposidesList = res.result;
      this.programImage = programImg;
     });

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
  openmusicmodel(songId , name){
this.isPlaying=true;
var audio= document.querySelector("audio");
audio.pause();
this.currentSongURL =`http://188.225.184.108:9091/api/songs/playsong/${songId}`;
this.currentSongId = songId;
this.currentSongName = name;
this.mainicon = false;
this.songPlayIcon = true;
  }
  ChangeIcons()
{
  this.mainicon = ! this.mainicon;
  this.songPlayIcon = ! this.songPlayIcon;
  if(this.songPlayIcon)
  {
    var audio= document.querySelector("audio");
    audio.play();
  }
  else{
    var audio= document.querySelector("audio");
    audio.pause();
  }
}
nextSong(){

  var currentSongIndex = this.EposidesList.indexOf(this.EposidesList.find(item => item.id ===  this.currentSongId));
  if(currentSongIndex == this.EposidesList.length-1)
  {
  
  }
  else{
    var nextSongIndex = this.EposidesList.indexOf(this.EposidesList.find(item => item.id ===  this.currentSongId))+1;
    var nextSong =  this.EposidesList[nextSongIndex];
    this.openmusicmodel(nextSong.id , nextSong.title);
  }
  
  }
  HomeSearch(searchTxt)
  {
    debugger;
    this.route.navigate([`/Libaray/`], { queryParams: { searchText: searchTxt } })
  }
  prevSong(){
  var currentSongIndex = this.EposidesList.indexOf(this.EposidesList.find(item => item.id ===  this.currentSongId));
  if(currentSongIndex == this.EposidesList.length - this.EposidesList.length -1)
  {
  
  }
  else{
    var prevSongIndex = this.EposidesList.indexOf(this.EposidesList.find(item => item.id ===  this.currentSongId))-1;
  var prevSong =  this.EposidesList[prevSongIndex];
  this.openmusicmodel(prevSong.id , prevSong.title);
  }
  }
  DownloadAudio(e ,song)
{
  e.preventDefault();
  var songURL = `http://188.225.184.108:9091/api/songs/playsong/${song}`
  var a = $("<a>")
    .attr("href", songURL)
    .attr("download", "audio.mp3")
    .appendTo("body");

a[0].click();

a.remove();
}
  ngOnInit(): void {
    this.getAllData();
    this.getMobileOperatingSystem();
    this.getReporters();

    // this.http.get('http://www.mocky.io/v2/5ea172973100002d001eeada').subscribe(Response => { console.log(Response)});



  }


backtomain(){
  this.showmyprograms=false;
  this.hideprograms=true;
  this.hideprogrameer=true;
}
  loadmoreEposides(){
 //
  }


}
