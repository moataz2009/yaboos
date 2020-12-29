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

  ngOnInit(): void {
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

}
