import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {  

  UsernameValidation:string;
  UsernameValidationBool:boolean = true;
  passwordValidation:string;
  isLoading:boolean = false;

  constructor(private userService: UserService, private router : Router) { }

  ngOnInit(): void {
  }

  loginSubmit(username:string, password:string){
    this.isLoading = true;
    this.UsernameValidationBool = true;

    this.userService.loginAuth(username, password).subscribe((data: any) => {
      localStorage.setItem('userToken', data)
      this.router.navigate(['/Home']).then(() => {
        window.location.reload();
      });
    }, (err: HttpErrorResponse) => {
      this.UsernameValidation = 'اسم المستخدم او كلمة المرور غير صحيحة';
      this.UsernameValidationBool = false;
      console.log(err.status);
    } );

    this.isLoading = false;

  }

}
