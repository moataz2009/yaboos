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
import {generate, generateSync} from 'text-to-image'

declare const $: any;

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

  clockBack: any = 0;
  errorClock:any = '';
  
  searchTxt:string = '';
  playNowimagVar:any = '';
  ifLogin:boolean ;
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

  
  addToClock(){
    if(this.clockBack == 23){
      this.clockBack = 0;
    }else{
      this.clockBack = this.clockBack + 1;
    }
  }

  removeFromClock(){
    if(this.clockBack == 0){
      this.clockBack = 23;
    }else{
      this.clockBack = this.clockBack - 1;
    }
  }

  keytabcheck(ev){
    if(ev.target.value > 23){
      this.errorClock = 'لايمكن ادخال قيمة اكبر من 23 او اقل من صفر';
    }else {
      this.errorClock = '';
    }
  }

  PlayRadio(playUrl, status){
    if(status === false){
      this.playerUrlTrack.openMusic(playUrl, "live");
      this.playerUrlTrack.changePlayerStatus(true);
      this.playerUrlTrack.actionPlayerType("live");
      this.playerUrlTrack.getPlayNow();
      this.playerUrlTrack.actionSongId('');
      this.playerUrlTrack.actionPopUp(false);

      // indexs
      this.playerUrlTrack.ActionPlayList(null);
      this.playerUrlTrack.ActionPlayerIndex(0);
    }else{
      this.playerUrlTrack.ngStop()
      this.playerUrlTrack.changePlayerStatus(false);
    }
  }

  setNext30(){
    this.playerUrlTrack.setNext30();
  }

  setBack30(){
    this.playerUrlTrack.setBack30();
  }


  //
  openloginpage(){
    this.router.navigate(['/login']);
  }
  //

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

    $(document).ready(function(){
     
      var d = new Date();
      var selecVal = d.getHours() *1; 

      $("#slider").roundSlider({
        min: 0,
        max: 24,
        step: 1,
        value: selecVal,
        width: 25,
        sliderType: "min-range",
        startAngle: 90,
        beforeCreate:  function traceEvent(e) {
         
          changeTime(e);
        },
        create:  function traceEvent(e) {
          changeTime(e);
        },
        start:  function traceEvent(e) {
          changeTime(e);
        },
        stop:  function traceEvent(e) {
          changeTime(e);
        },
        change:  function traceEvent(e) {
          changeTime(e);
        },
        valueChange: function traceEvent(e) {
          changeTime(e);
        },
        drag: function traceEvent(e) {
          changeTime(e)
        }
      });

      $('.timeType').click(function(){
        var typeSelected = $(this).text();
        if(typeSelected === 'AM'){
          $(this).text("PM");
        }else{
          $(this).text("AM");
        }

        calcTimeToBac();
      }); 

      $("#ChangTimeFormInputView").change(function(){

        calcTimeToBac();

      });

      $("#ChangTimeFormInputView").keyup(function(){

        calcTimeToBac();

      });

      function calcTimeToBac(){

    
        $("input[type='hidden']").focusin();

        var typeSelected = $('.timeType').text();
        var plusH = 12;
        var changedVal = $("#ChangTimeFormInputView").val() * 1;

        if(typeSelected === 'AM'){

          if($("#ChangTimeFormInputView").val() < 12 ){
            $("#ChangTimeFormInput").val($("#ChangTimeFormInputView").val());
            $('.rs-tooltip-text').text($("#ChangTimeFormInputView").val());
            $("input[type='hidden']").val(12);
          }else{

            $("#ChangTimeFormInput").val(0);
            $(".rs-tooltip-text").text(0);
            $("input[type='hidden']").val(12);

          }
        }else{
          if($("#ChangTimeFormInputView").val() === 12 ){

            $(".rs-tooltip-text").text(12);
            $("#ChangTimeFormInput").val(12);
            $("input[type='hidden']").val(12);

          }else{

            var resX = changedVal * 1 + plusH * 1;

            $("#ChangTimeFormInput").val(resX);
            $(".rs-tooltip-text").text(resX);
            $("input[type='hidden']").val(12);

          }
          

        }

        $("input[type='hidden']").focusin();
        $("input[type='hidden']").keydown();
        $("input[type='hidden']").keypress();
        $("input[type='hidden']").keyup();
        $("input[type='hidden']").click();
        $("input[type='hidden']").focusout();

        
    


      }

      function changeTime(e){

        var timeH;
        if(e.value < 12 ){
          $('.timeType').text('AM');

          if(e.value === 0){
            timeH = 12;
          }else {
            timeH = e.value;
          }

        }else{
          $('.timeType').text('PM');

          if(e.value === 24){
            timeH = 12;
            $('.timeType').text('AM');
          }else {
            if(e.value === 12){
              timeH = e.value;
            }else{
              timeH = e.value - 12;
            }
            
          }

          
        }

        if(e.value === 24){
          $("#ChangTimeFormInput").val(0);
        }else {
          $("#ChangTimeFormInput").val(e.value);
        }

        $("#ChangTimeFormInputView").val(timeH);
        
      }


      

    });
    


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
        $("#Register").hide();
      },
      (err) => {
       //console.log(err)
      }
  );
}

   



  HomeSearch(searchTxt:any)
  {
    localStorage.setItem('searchTxt',searchTxt);
    this.route.navigate([`/Libaray/`], { queryParams: { searchText: searchTxt } })
  }

  
  closesection(clock1){
    console.log("Done");
  
    this.prevlive =false;
    let date: Date = new Date(); 

    if(clock1 === ""){
      clock1 ="00";
    }
    let hours;
    if(clock1 <= 9){
      hours = '0' + `${clock1}`;
    }else{
      hours = `${clock1}`;
    }
    

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
      
      let title = `تسجيل سابق ${hours}:00 ${today} `

      if(localStorage.getItem("tp-2") === null){

        localStorage.setItem("tp-1", `0`);
        localStorage.setItem("tp-2", title);
        this.playerUrlTrack.ActionPlayCurruntTime(0);
        this.playerUrlTrack.ActionContinuePlayer(false);
        console.log("First");
        
      }else{

        var PlayerInfoFromLocalStorage = localStorage.getItem("tp-2");
        if(PlayerInfoFromLocalStorage === title){

          this.playerUrlTrack.ActionPlayCurruntTime(localStorage.getItem("tp-1"));
          this.playerUrlTrack.ActionContinuePlayer(true);

          // next time service
          console.log("Done local");

        }else{
          console.log("First update");

          this.playerUrlTrack.ActionPlayCurruntTime(0);
          this.playerUrlTrack.ActionContinuePlayer(false);

          localStorage.setItem("tp-1", `0`);
          localStorage.setItem("tp-2", title);
        }

      }

      this.PlayerURl =`http://188.225.184.108:9091/api/Radio/PlayHistory?datetime=${today}&hour=${hours}`;
      this.playerUrlTrack.changeUrlPlayer(this.PlayerURl);

      this.playerUrlTrack.changePlayerStatus(true);
      this.playerUrlTrack.changePlayerTitle(title);
      this.playerUrlTrack.actionPlayNow(`تسجيل سابق ${hours}:00 ${today} `);
      this.playerUrlTrack.actionPlayImage(null);
      this.playerUrlTrack.actionSongId(null);
      this.playerUrlTrack.actionPlayerType("track");

    $('a#button').children(":first").attr("src" , "../../../assets/imgs/materials_05.png");
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

 dataChange(event){

 }

//close back to behind section
 closeMedia() {
  this.prevlive= false;
}

  

  ngOnInit() { 

    if(localStorage.getItem('searchTxt') != null){
      this.searchTxt = localStorage.getItem('searchTxt');
    }else {
      this.searchTxt = '';
    }

    this.playerUrlTrack.PlayerStatus.subscribe(data => {
      this.playerStatus = data;
    });

    this.playerUrlTrack.playNowVar.subscribe(data => {
      this.playNowVar = data;

      $(document).ready(function(){
        var width = 400;

        const test = $("#Test").css("fontSize", "25px");;
        width = (test.width() + 1);

        generate(`${data}`+'***Yaboos 87.8 FM***', {maxWidth: width }).then(function (dataUri) {
          $('.sliding-background').css('background-image', 'url(' + dataUri + ')');
        },(err: any) => {
        });

    
    

      });

    });

    this.playerUrlTrack.PlayerTypes.subscribe(data => {
      this.PlayerTypes = data;
    });

    
    if(localStorage.getItem('userToken') != null){
      this.ifLogin = true;
    }else {
      this.ifLogin = false;
    }
       


   if( localStorage.getItem('userToken') != null)
   {
     this.currentUser = true;
   }
   else{
    this.currentUser = false;
   }



  this.getMobileOperatingSystem();

  


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
      setTimeout(() => { this.errorShow = false;}, 3000)
      return ;
      // alert( " من فضلك ادخل الاغنيه"); 
    }
    if( data.song.trim() != ""){

      let header = {}
      let token = localStorage.getItem('userToken');

      if(token) {
        header['Authorization'] = "Bearer" + " "+  token;
        header['Content-Type'] ='application/json';

        this.http.post("http://188.225.184.108:9091/api/requests"
      ,{Message : data.song},header).subscribe(
        res=>{  this.errorShow = false;
          this.Message =  "تم إرسال طلبك بنجاح "
          this.done = true;
          setTimeout(() => { this.done = false;}, 3000)
          $('.songSend textarea').val('');
          return ;
        },
        err=>{
          this.errorShow = true;
          this.ErrorMessage =  "لم يتم أرسال طلبك "
          this.done = false;
          data.song = '';
          setTimeout(() => { this.errorShow = false;}, 3000)
          return ;
        }

      );
      }
      else{
        this.errorShow = true;
        this.ErrorMessage =  "من فضلك لابد من تسجيل الدخول "
        this.done = false;
        setTimeout(() => { this.errorShow = false;}, 3000)
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
      $('a#button').children(":first").attr("src" , "../../../assets/imgs/materials_05.png");
      $('a#button2').children(":first").attr("src" , "../../../assets/imgs/CD_GIF.gif");
     }
     else{
      $('#player').get(0).pause();
      $('a#button').children(":first").attr("src" , "../../../assets/imgs/materials_play.png");
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
  $('a#button').children(":first").attr("src" , "../../../assets/imgs/materials_05.png");
  $('a#button2').children(":first").attr("src" , "../../../assets/imgs/CD_GIF.gif");
 }

 BackwardMins(PlayerURl)
 {
  //$("audio").prop("currentTime",$("#player").prop("currentTime")-30);
  var audio= document.querySelector("audio");
  audio.currentTime= audio.currentTime -30;
  audio.play();
  $('a#button').children(":first").attr("src" , "../../../assets/imgs/materials_05.png");
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

soon:boolean = false;

opensoon(){
  this.soon= true;
}
closesoonsection(){
  this.soon= false;
}

savetelephone(){
  this.toastr.success('تم الحفظ بنجاح ... سيتم ابلاغكم قريبا');     
}

input_search_value() {
      
  if($("#inputsearch2").val()  == ''){
   $(".clear").css('display','none');
  }
  else {
   $(".clear").css('display','inline');
  }
 }
 clearsearch(){
  //  this.searchTxtx.value="";
  this.searchTxt = '';
  this.HomeSearch( this.searchTxt);
  // localStorage.setItem('searchTxt','');
  // this.route.navigate([`/Libaray/`], { queryParams: { searchText: '' } });
 }


}
