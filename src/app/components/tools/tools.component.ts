import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

  [x: string]: any;
  headerMessage : string;

  soundratesection:boolean=false;
  hidesection:boolean=true;
  stoplivesection:boolean=false;

  constructor() { }

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

  sohwsoundrate(){
    this.soundratesection=true;
    this.hidesection=false;
    this.funShowImgs();
  }
  funShowImgs(){
    debugger;
    if(document.querySelector("audio").volume == 0.999){
      $('div.firstdiv li a img#Highest').attr("src", "../../../assets/imgs/playedImg.png");
    }
    if( document.querySelector("audio").volume == 0.7)
    {
      $('#meduim').attr("src", "../../../assets/imgs/playedImg.png");
    }
    if(document.querySelector("audio").volume == 0.3)
    {
      $('#low').attr("src", "../../../assets/imgs/playedImg.png");
    }
    if(document.querySelector("audio").volume == 0.1)
    {
      $('#lowest').attr("src", "../../../assets/imgs/playedImg.png");
    }
  }

  sohwtoplive(){
    this.stoplivesection=true;
    this.hidesection=false;
  }

  returntoolpage(){
    this.soundratesection=false;
    this.hidesection=true;
  }

  returnpage(){
    this.stoplivesection=false;
    this.hidesection=true;
  }

  thisicon:boolean=false;
  mainicon:boolean=true;
   isPlaying:boolean=false;
  showanotherheart: boolean = false;
  hideheart: boolean = true;
  hideshow:boolean=true;
  
  // showanothericon(){
  //   this.thisicon=true;
  //   this.mainicon=false;
  // }
  // showamainicon(){
  //   this.thisicon=false;
  //   this.mainicon=true;
  // }
  closeMedia() {
    this.isPlaying= false;
  }
  changeheart(){
    this.showanotherheart= true;
    this.hideheart= false;
  }
  showmodalhere(){
    this.isPlaying=true;
    this.hideshow=false;
  } 
   showminiwindow2(){
    this.isPlaying=false;
    this.hideshow=true;
  }




  ngOnInit(): void {

  }
  Highest(){
const volume = document.querySelector("audio").volume; // 1 
// Setting volume level
document.querySelector("audio").volume = 0.999;
$('#Highest').attr("src", "../../../assets/imgs/btn_open.jpg");
$('#meduim').attr("src", "../../../assets/imgs/Selected.png");
$('#low').attr("src", "../../../assets/imgs/Selected.png");
$('#lowest').attr("src", "../../../assets/imgs/Selected.png");
  }
  meduim()
  {
    const volume = document.querySelector("audio").volume; // 1 
    // Setting volume level
    document.querySelector("audio").volume = 0.7;
    $('#meduim').attr("src", "../../../assets/imgs/btn_open.jpg");
    $('#low').attr("src", "../../../assets/imgs/Selected.png");
$('#lowest').attr("src", "../../../assets/imgs/Selected.png");
$('#Highest').attr("src", "../../../assets/imgs/Selected.png");
  }
  low(){
    const volume = document.querySelector("audio").volume; // 1 
    // Setting volume level
    document.querySelector("audio").volume = 0.3;
    $('#low').attr("src", "../../../assets/imgs/btn_open.jpg");
    $('#lowest').attr("src", "../../../assets/imgs/Selected.png");
$('#Highest').attr("src", "../../../assets/imgs/Selected.png");
$('#meduim').attr("src", "../../../assets/imgs/Selected.png");

  }
lowest(){
  const volume = document.querySelector("audio").volume; // 1 
  // Setting volume level
  document.querySelector("audio").volume = 0.1;
  $('#lowest').attr("src", "../../../assets/imgs/btn_open.jpg");
  $('#Highest').attr("src", "../../../assets/imgs/Selected.png");
  $('#meduim').attr("src", "../../../assets/imgs/Selected.png");
  $('#low').attr("src", "../../../assets/imgs/Selected.png");


}
StopLive(num:number)
{
 var audio= document.querySelector("audio");
 setTimeout(function(){
  audio.pause();
}, num);
// if(num == 1800000){
//   debugger;
//   $('#stopThirtyMin').attr("src", "../../../assets/imgs/btn_open.jpg");
// }
}

// minimize song model
// music model
closmymedia: boolean = false; //show or hide model, it is display none modal now
 mainicon:boolean=true;
 songPlayIcon: boolean = false;

 closemyMedia() {
    this.closmymedia = false;
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




}
