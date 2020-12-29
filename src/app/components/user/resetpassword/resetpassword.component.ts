import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  isLoading:boolean = false;
  isMathchs: boolean = false; /// true = show error , false = hide error message match password
  
  
  constructor(
    private userService: UserService , 
    private toastr: ToastrService,
    private router : Router
    ) { }

    [x: string]: any;
    headerMessage : string;
  
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



  ngOnInit(): void {
    this.getMobileOperatingSystem();
  }


  resetSubmit(oldPassword:string, newPassword:string, confPassword:string){
    this.isLoading = true;
    
    if(newPassword != confPassword){
      this.isLoading = false;
      this.isMathchs = true; // view error message
      return false;
    }else {
      this.isMathchs = false ; //  hide error message
    }


    this.userService.ChangePassword(oldPassword, newPassword).subscribe((data: any) => {

      this.toastr.success('تم اعادة التعيين بنجاح');
  

      this.router.navigate(['/Home']).then(() => {

        this.userService.actionChangeStatus(true);
        
      });
    }, (err: HttpErrorResponse) => {
    
      this.toastr.error('لم يتم اعادة التعيين بنجاح');

    } );

  
    this.isLoading = false;
  }

  hideError(){
    this.isMathchs = false ; 
    this.isLoading = false;
  }

  returntoolpage(){
    this.router.navigate(['/Tools']);
  }

}
