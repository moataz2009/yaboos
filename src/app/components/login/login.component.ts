
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { User } from 'src/models/user.model';
import {UsersService} from 'src/service/users.service';
import * as $ from 'jquery'
import { ToastrService } from 'ngx-toastr'; 
import { ValidationService } from 'src/app/validation.service';  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  [x: string]: any;
  headerMessage : string;
  loginForm: FormGroup;
  submitted   =  false;
  registerForm : FormGroup;
  registersubmitted = false;
  get formControls() { return this.loginForm.controls; }
  constructor( private UsersService: UsersService , private toastr: ToastrService , private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.getMobileOperatingSystem();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
     
    });
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, ValidationService.password ]]
    }, {
      validator: [
        ValidationService.match('password', 'confirmPassword'),
       
      ]
    });
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

  userObj :User = new User();
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
  singinfun(){
    this.submitted = true;
    if (this.loginForm.invalid) {
      return ;
  }
  ValidationService.password(this.loginForm.value.password);
   this.userObj.username = this.loginForm.value.username;
   this.userObj.password = this.loginForm.value.password;
   
    // stop the process here if form is invalid
   
    this.UsersService.login( this.userObj ).subscribe(
     res=>{
       if(res != null)
       {
        
        let userToken:any = res;
        localStorage.setItem('usertoken' ,userToken );
        localStorage.setItem('username' ,this.userObj.username );
        $("#signneIn").hide();
        this.toastr.success("تم تسجيل الدخول بنجاح")  
        window.location.assign("/Home");
       }
      // this.closeSingup();
     },
(err) => { this.toastr.error("   حدث خطأ يرجي التأكد من البيانات")  }
);  
}

 user:User;

//Register
Register(formvalue)
{
  // debugger;
  this.registersubmitted = true;
  // ValidationService.password(this.loginForm.value.password);
//   if (this.registerForm.invalid) {
//     return this.toastr.error("   حدث خطأ يرجي التأكد من البيانات");
// }
   
    this.userObj.username = this.registerForm.value.username;
    this.userObj.password = this.registerForm.value.password;
    this.userObj.name = this.registerForm.value.name;
   
      this.UsersService.register(formvalue).subscribe(
       mydata =>{
      console.log(mydata);
      localStorage.setItem('username' ,this.userObj.username );
      this.toastr.success("تم إنشاء الحساب بنجاح");
      $("#Register").hide();
      window.location.assign("/Home");
       },
  (err) => {  this.toastr.error("حدث خطأ تأكد من الإيميل والرقم السري")  }
  );
  }



}
