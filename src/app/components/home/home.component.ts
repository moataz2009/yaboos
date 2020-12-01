import { Component, OnInit , HostListener } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as $ from 'jquery'
import {AppComponent} from "../../app.component";
import {RadioService} from 'src/service/radio.service';
import {UsersService} from 'src/service/users.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from 'src/models/user.model';
import { ToastrService } from 'ngx-toastr';   
import { PlayerService } from 'src/app/shared/player.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  done: boolean = false;
  Message: string;
  errorShow: boolean = false;
  ErrorMessage: string;
  div1:boolean=false;
  div2:boolean=true;
  div3:boolean=true;
  div4:boolean=false;
  social:boolean=false;
  hideall:boolean=true;
  headerMessage : string;
  IsMobileHeader:boolean = false;
  mobileAppUrl: string;
  IsPlaying:boolean = true;
  prevlive:boolean=false;
  userObj :User = new User();
  notificationCounter :number;
  currentUser:boolean;
  
  playerStatus:boolean = false;
  PlayerTypes:any;
  playNowVar:any;
PlayerURl = "http://188.225.182.10:8000/live";
  constructor( 
    private playerUrlTrack : PlayerService,
      private http: HttpClient ,
        private RadioService :RadioService , 
          private route: Router, 
          private UsersService: UsersService ,
          private router: Router ,
          private toastr: ToastrService
          ) { 
    this.notificationCounter = 0;
  }

  PlayRadio(playUrl, status){
    if(status === false){
      this.playerUrlTrack.openMusic(playUrl, "live");
      this.playerUrlTrack.changePlayerStatus(true);
      this.playerUrlTrack.actionPlayerType("live");
      this.playerUrlTrack.getPlayNow();
    }else{
      this.playerUrlTrack.ngStop()
      this.playerUrlTrack.changePlayerStatus(false);
      this.playerUrlTrack.getPlayNow();
    }
  }

  openimage5(){
    this.div1=true;
    this.div2=false;
  }
  openimage4(){
    this.div1=false;
    this.div2=true;
  }
  opengif(){
    this.div4=true;
    this.div3=false;
  }
  opencd(){
    this.div4=false;
    this.div3=true;
  }
  socialsection(){
    this.hideall=false;
    this.social=true;
  }
  showmainsection(){
  //code here
  this.social=false;
  this.hideall=true;
  }
  previouslive(){
   
    this.prevlive = true;
  }
//login
engez:boolean = false;
signpop:boolean = false;

mylogsection(){
    this.engez=true;
  
}
//login
  mysignupsection(){
    this.engez=false;
    this.signpop = true;
  }
  singinfun(obj: User){
   this.userObj.username = obj.username;
  this.userObj.password = obj.password;
  this.userObj.deviceToken = localStorage.getItem('token');
 
    this.UsersService.login( this.userObj ).subscribe(
     res=>{
       if(res != null)
       {
        let userToken:any = res;
        localStorage.setItem('usertoken' ,userToken );
        localStorage.setItem('username' ,this.userObj.username );
        $("#signneIn").hide();
        window.location.reload();
       // this.route.navigate([`//`]);
       }
      // this.closeSingup();
     },
(err) => {console.log(err)}
); 
  
}
///////////////Register
Register(user:User)
{
  this.userObj.username = user.username;
  this.userObj.password = user.password;
  this.userObj.name = user.name;
 // this.userObj.deviceToken = localStorage.getItem('token');
 
  this.UsersService.register( this.userObj ).subscribe(
    res=>{
      var userName =  localStorage.getItem('username' );
      if(userName != null)
      {
        localStorage.setItem('username' ,this.userObj.username );
      }
        window.location.reload();
        $("#Register").hide();
      },
      (err) => {
        console.log(err)
      }
  );
}

   



  HomeSearch(searchTxt)
  {
    localStorage.setItem('searchTxt',searchTxt);
    this.route.navigate([`/Libaray/`], { queryParams: { searchText: searchTxt } })
  }
  closesection(clock1:String , clock2:String , min1 , min2){
    debugger;
    this.prevlive =false;
    let date: Date = new Date(); 
    console.log("Start");
    if(clock1 === ""){
      clock1 ="0";
    }
    console.log(clock1);
    console.log("end");

    let hours = `${clock1}` + `${clock2}`;
    let x :number = date.getHours();
    let y :number = parseInt(hours);
    if(x < y)
    //currentSongURL
    {
      this.toastr.error("لا يمكن الرجوع لوقت أكبر من الوقت الحالي");
    }
    else{
      var day = ("0" + date.getDate()).slice(-2);
      var month = ("0" + (date.getMonth() + 1)).slice(-2);
      var today = date.getFullYear()+"-"+(month)+"-"+(day);
      
      this.PlayerURl =`http://188.225.184.108:9091/api/Radio/PlayHistory?datetime=${today}&hour=${hours}`;
      this.playerUrlTrack.changeUrlPlayer(this.PlayerURl);

    //   var audio= document.querySelector("audio");
    // audio.src = this.PlayerURl;
    // audio.play();
    $('a#button').children(":first").attr("src" , "../../../assets/imgs/Materials-05.png");
    $('a#button2').children(":first").attr("src" , "../../../assets/imgs/CD_GIF.gif");
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

//close back to behind section
 closeMedia() {
  this.prevlive= false;
}

  ngOnInit() { 

    this.playerUrlTrack.PlayerStatus.subscribe(data => {
      this.playerStatus = data;
    });

    this.playerUrlTrack.playNowVar.subscribe(data => {
      this.playNowVar = data;
    });

    this.playerUrlTrack.PlayerTypes.subscribe(data => {
      this.PlayerTypes = data;
    });
       


   if( localStorage.getItem('userToken') != null)
   {
     this.currentUser = true;
   }
   else{
    this.currentUser = false;
   }


  this.getMobileOperatingSystem();

  $(document).ready(function() {
  //  debugger;
  var playing = false;
  var paused ;
  // var audelem = document.querySelector("audio");
  function isPlaying(audelem) {
    return !audelem.paused; 

    
    }
    if(isPlaying( document.querySelector("audio")) == false)
    {
      $('a#button').children(":first").attr("src" , "../../../assets/imgs/Materials-04.png");
      $('a#button2').children(":first").attr("src" , "../../../assets/imgs/CD.png");
    }
    if(isPlaying( document.querySelector("audio")) == true){
      $('a#button').children(":first").attr("src" , "../../../assets/imgs/Materials-05.png");
      $('a#button2').children(":first").attr("src" , "../../../assets/imgs/CD_GIF.gif");
    }


    $('#button').click(function() {
        $(this).toggleClass("down");

        if (playing == false) {
          var audio= document.querySelector("audio").src="http://188.225.182.10:8000/live";
            $('audio').get(0).play();
            playing = true;
            this.IsPlaying = true;
            // $(this).text("stop sound");
            $('a#button').children(":first").attr("src" , "../../../assets/imgs/Materials-05.png");
            $('a#button2').children(":first").attr("src" , "../../../assets/imgs/CD_GIF.gif");

        } else {
          $('audio').get(0).pause();
            playing = false;
            this.IsPlaying = false;
            // $(this).text("restart sound");
            $('a#button').children(":first").attr("src" , "../../../assets/imgs/Materials-04.png");
            $('a#button2').children(":first").attr("src" , "../../../assets/imgs/CD.png");

        }


    });
   

// $('audio').on("play",function() {
//   debugger;
//   $('a#button').children(":first").attr("src" , "../../../assets/imgs/Materials-05.png");
//   $('a#button2').children(":first").attr("src" , "../../../assets/imgs/CD_GIF.gif");
// });
// $('audio').on("pause",function() {
//   $('a#button').children(":first").attr("src" , "../../../assets/imgs/Materials-04.png");
//   $('a#button2').children(":first").attr("src" , "../../../assets/imgs/CD.png");
// });


});


  }
  
  closeMessage() {
    this.errorShow = false;
  }
  closeMessageDone(){
    this.done = false
  }



  //song try

  onClick_RequestSong (data){

    if (data.song == "" )
    {
      this.errorShow = true;
      this.ErrorMessage =  " من فضلك ادخل الاغنيه"
      this.done = false;
      return ;
      // alert( " من فضلك ادخل الاغنيه"); 
    }
    if( data.song.trim() != ""){

      let header = {}
      let token = localStorage.getItem('token');

      if(token) {
        header['Authorization'] = "Bearer" + " "+  token;
        header['Content-Type'] ='application/json';

        this.http.post("http://188.225.184.108:9091/api/requests"
      ,{Message : data.song},header).subscribe(
        res=>{  this.errorShow = false;
          this.Message =  "تم إرسال طلبك بنجاح "
          this.done = true;
          return ;},
        err=>{
          this.errorShow = true;
          this.ErrorMessage =  "لم يتم أرسال طلبك "
          this.done = false;
          return ;
        }

      );
      }
      else{
        this.errorShow = true;
        this.ErrorMessage =  "من فضلك لابد من تسجيل الدخول "
        this.done = false;
        return ;
        // alert("من فضلك لابد من تسجيل الدخول ");
      }
    }
  }
  // ForwardMins()
  // {
  //   var aud = document.getElementById("player");
  //   aud.currentTime=3;
  //   alert("ForwardMins");
  // }



 //song try
 @HostListener('document:navigator', ['$event'])
 navigator() {
   this.checkHiddenDocument();
 }


   checkHiddenDocument(){

   if (document.hidden){

     if(this.IsPlaying)
     {
      $('#player').get(0).play();
      $('a#button').children(":first").attr("src" , "../../../assets/imgs/Materials-05.png");
      $('a#button2').children(":first").attr("src" , "../../../assets/imgs/CD_GIF.gif");
     }
     else{
      $('#player').get(0).pause();
      $('a#button').children(":first").attr("src" , "../../../assets/imgs/Materials-04.png");
      $('a#button2').children(":first").attr("src" , "../../../assets/imgs/CD.png");
     }
   }
 }



 ////////////forward
 ForwardMins(PlayerURl)
 {
  // $("audio").prop("currentTime",$("#player").prop("currentTime")+30);
  var audio= document.querySelector("audio");
  audio.currentTime = audio.currentTime +1;
  audio.play();
  $('a#button').children(":first").attr("src" , "../../../assets/imgs/Materials-05.png");
  $('a#button2').children(":first").attr("src" , "../../../assets/imgs/CD_GIF.gif");
 }

 BackwardMins(PlayerURl)
 {
  //$("audio").prop("currentTime",$("#player").prop("currentTime")-30);
  var audio= document.querySelector("audio");
  audio.currentTime= audio.currentTime -30;
  audio.play();
  $('a#button').children(":first").attr("src" , "../../../assets/imgs/Materials-05.png");
  $('a#button2').children(":first").attr("src" , "../../../assets/imgs/CD_GIF.gif");
 }


//  minimize song model
//   music model


closmymedia: boolean = false; //show or hide model, it is display none modal now
 mainicon:boolean=true;
 songPlayIcon: boolean = false;

closemyMedia() {
    this.closmymedia= false;
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
//  minimize song model
//   music model

}
