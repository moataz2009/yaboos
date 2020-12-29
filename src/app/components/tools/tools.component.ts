import { Component, OnInit } from '@angular/core';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import * as $ from 'jquery';
import { PlayerOptionsService } from 'src/app/shared/player-options.service';
import { PlayerService } from 'src/app/shared/player.service';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { ToastrService } from 'ngx-toastr';

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
  alarmsection:boolean=false;
  playerVolume: String;
  stopImage: String;
  constructor( private PlayerOptions: PlayerOptionsService,private atp: AmazingTimePickerService,
  private playerUrl: PlayerService , private toastr: ToastrService, ) { }

  public selectedTime: string;
   

  AutoStopTime(time, status){
    if(this.stopImage == status){
      this.playerUrl.ActionStopPlayer(null, null);
    }else{
      this.playerUrl.ActionStopPlayer(time, status);
    }
  }

  fillHeader(message , url)
  {
    this.IsMobileHeader = true;
    this.headerMessage =message;
    this.mobileAppUrl =url;
  }

  rhTime: any;
  mTime: any;
  rmTime:any;
  PlayerAutoPlaySubmit(hour1, hour2, minute1, minute2){

    if(hour1 === null){
      hour1 = 0;
    }
    if(hour2 === null){
      hour2 = 0;
    }

    if(minute1 === null){
      minute1 = 0;
    }
    if(minute2 === null){
      minute2 = 0;
    }

    this.rhTime = hour1 + "" + hour2 * 60 ;

    this.mTime = minute1+""+minute2 * 1;
    this.rmTime = (this.mTime * 1 + this.rhTime * 1) * 60000 ;
    this.playerUrl.ActionAutoPlayPlayer(this.rmTime);
    
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
    // debugger;
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

  sohwalarm(){
    this.alarmsection=true;
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

  returnmainpage(){
    this.alarmsection=false;
    this.hidesection=true;
  }

  keytab(event){
    let nextInput = event.srcElement.nextElementSibling; // get the sibling element

    if(nextInput == null) // check the maxLength from here
    {
      return;
    } 
    else{
      nextInput.focus();   // focus if not null
    }     
  }

  thisicon:boolean=false;
  mainicon:boolean=true;
  isPlaying:boolean=false;
  showanotherheart: boolean = false;
  hideheart: boolean = true;
  hideshow:boolean=true;
  

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

    this.PlayerOptions.PlayerVolume.subscribe(data => {
      this.playerVolume = data;
    });

    this.playerUrl.StopImage.subscribe(data => {
      this.stopImage = data;
    });

    if(localStorage.getItem('playerVolume') != null){
      this.PlayerOptions.changeVolumePlayer(localStorage.getItem('playerVolume'));
    }

  }

  Highest(){
    this.PlayerOptions.changeVolumePlayer("Highest");
  }
  meduim()
  {
    this.PlayerOptions.changeVolumePlayer("meduim");
  }
  low(){
    this.PlayerOptions.changeVolumePlayer("low");
  }
  lowest(){
    this.PlayerOptions.changeVolumePlayer("lowest");
  }

  StopLive(num:number)
  {
  var audio= document.querySelector("audio");
  setTimeout(function(){
    audio.pause();
  }, num);

}


  closmymedia: boolean = false; //show or hide model, it is display none modal now
  //  mainicon:boolean=true;
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




   toTime(timeString){
    var timeTokens = timeString.split(':');
    return new Date(1970,0,1, timeTokens[0], timeTokens[1], timeTokens[2]);
}
  open() {
    let configTimer = this.atp.open({
      time:  this.selectedTime,
      // time: new Date().getHours() +":"+new Date().getMinutes(),
      theme: 'dark',
      preference: { 
        labels: { 
          ok: "تأكيد",
          cancel: "إلغاء"
        },
      },
      arrowStyle: {
            background: 'red',
            color: 'white',
      },
      changeToMinutes: true,
    });
    configTimer.afterClose().subscribe(time => {
      this.selectedTime = time;
      // console.log(typeof(time));
      //
      var timeArr =  this.selectedTime.split(':');
      var hours = Number(timeArr[0]);
      var minutes = Number(timeArr[1]);

      var CurrentDate = new Date();
      var currenthour = CurrentDate.getHours();
      var currentminute = CurrentDate.getMinutes();
      //
      if(((hours - currenthour) == 0) &&((minutes - currentminute) == 0)){
        var one = (minutes - currentminute); //minutes
        var resultone = 60000 * one; //milliseconds
        console.log(resultone);
        this.playerUrl.ActionAutoPlayPlayer(resultone);
        this.toastr.success(' سيتم تشغيل البث المباشر تلقائيا الأن ');
      }

     else if(((hours - currenthour)==0) &&((minutes - currentminute) < 0)){
        var one = ((minutes - currentminute)+(24 * 60)); //minutes
        var resultone = 60000 * one; //milliseconds
        console.log(resultone);
        this.playerUrl.ActionAutoPlayPlayer(resultone);

        var totalh= Math.floor(one/60);
        var totalm = one%60;
        this.toastr.success(' سيتم تشغيل البث المباشر تلقائيا بعد '+ totalh +' ساعه و   '+
        totalm +' دقيقة من الأن  ');
      }
      else if (((hours - currenthour) == 0) &&((minutes - currentminute) > 0)){
        var two =(minutes - currentminute); //minutes
        var resulttwo = 60000 * two; //milliseconds
        console.log(resulttwo);
        this.playerUrl.ActionAutoPlayPlayer(resulttwo);
        this.toastr.success(' سيتم تشغيل البث المباشر تلقائيا بعد '+ two +' دقيقة من الأن  ');
      }

      else if ((hours - currenthour)< 0){
        var three =(((hours - currenthour) + 24)*60) + (minutes - currentminute); //minutes
        var resultthree = 60000 * three; //milliseconds
  
          console.log(resultthree);
          this.playerUrl.ActionAutoPlayPlayer(resultthree);
          var totalh= Math.floor(three/60);
          var totalm = three%60;
          this.toastr.success(' سيتم تشغيل البث المباشر تلقائيا بعد '+ totalh +' ساعه و   '+
          totalm +' دقيقة من الأن  ');
      }
      else if ((hours - currenthour)> 0){
        var four=((hours - currenthour) * 60) + (minutes - currentminute);
        var resultfour = 60000 * four; 
        console.log(resultfour);
        this.playerUrl.ActionAutoPlayPlayer(resultfour);
        if (four <= 60){
          this.toastr.success(' سيتم تشغيل البث المباشر تلقائيا بعد '+ four +' دقيقة من الأن  ');
        }
        else{
          var totalh= Math.floor(four/60);
          var totalm = four%60;
          this.toastr.success(' سيتم تشغيل البث المباشر تلقائيا بعد '+ totalh +' ساعه و   '+
          totalm +' دقيقة من الأن  ');
        }

      }

    }
  );
  }
}
