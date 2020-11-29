import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  check:boolean=false;
  show:boolean=false;
  show2:boolean=false;
  show3:boolean;
  userToken:string ;
  username: string;
  navbt:boolean=false;
  navbtt:boolean=true;

  showLogout: boolean = false;
  showLogin: boolean = true;

  constructor(private router: Router) { }

  ngOnInit():void{

    if(localStorage.getItem('userToken') != null){
      this.showLogout = true;
      this.showLogin = false;
    }else{
      this.showLogout = false;
      this.showLogin = true;
    }


   this.userToken = localStorage.getItem('usertoken');
   this.username = localStorage.getItem('username');
   if( this.userToken == null)
   {
     this.show3 = false;
     this.show = true;
     this.show2 = true;
   }
   else{
    this.show3 = true;
    this.show = false;
    this.show2 = false;
   }
   $(function() {
    if( $('.navbar-toggler[aria-expanded="false"] ')){
     $(".navbar-nav").css("position","relative");
     $(".navbar-nav").css("right","12px");
    }
    var $window = $(window);

    $window.on("scroll", function() {
      if ($(window).width() <= 991) { 

        var scrollTop = $window.scrollTop();
        if(scrollTop > 80) {
          // $('.navbar-toggler[aria-expanded="false"] ').hide();
        }
        else{
            // $('.navbar-toggler[aria-expanded="false"] ').show();
        }
        
      }
        
    });
  });
  }
  overlay:boolean=false;

  savechange(){
    this.navbtt=false;
    this.navbt=true;
    this.overlay=true;
    $(".navbar").css("width","100px");

    if(this.check===false){
      this.check=true;
    }
    else{
      this.check=false;
    }

  }
  savechange1(){
    this.navbtt=true;
    this.navbt=false;
    this.overlay=false;
    $(".navbar").css("width","0px");
    $(".navbar-nav").css("position","relative");
    $(".navbar-nav").css("right","12px");
    if(this.check===false){this.check=true;}
    else{this.check=false}

  }
  saveoutside(){
    this.navbtt=true;
    this.navbt=false;
    this.overlay=false;
    $(".navbar").css("width","0px");
    if(this.check===false){this.check=true;}
    else{this.check=false}


  }

  showinfo(){this.show=true;this.show2=true;this.show3=false}
  signupinfo(){
    this.show2=false;
    this.show=false;
    this.show3=true;
    localStorage.removeItem('username');
    window.location.reload();
  }


  Logout(){
    localStorage.removeItem('userToken');
    if(localStorage.getItem('userToken') != null){
          
      this.router.navigate(['/home']).then(() => {
        window.location.reload();
      });
      return true;

    }else{
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
      return false;
    }
  }
}
