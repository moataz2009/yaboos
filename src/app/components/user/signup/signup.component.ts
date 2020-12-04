import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/models/user.model';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user : User;
  
  UsernameValidation:string;
  UsernameValidationBool:boolean = true;
  nameValidation:string;
  passwordValidation:string;
  isLoading:boolean = false;

  constructor(
    private userService: UserService, 
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm){

    if(form != null)
    form.reset();
    this.user = {
      username: '',
      name :'',
      password :'',
      confirmPassword:'',
      deviceToken:'',
    }
  }


  OnSubmit(form: NgForm){
    this.isLoading = true;
    this.userService.regestarUser(form.value)
    .subscribe((data: any) => {
      if(data.errors == null){
        this.resetForm(form);
        this.UsernameValidationBool = true;
        this.toastr.success('تم الحفظ بنجاح');
        this.router.navigate(['/login']);
      }else{

        if(data.errors == "Username is already taken"){
          this.UsernameValidationBool = false;
          this.UsernameValidation = ' البريد الالكتروني سبق استخدامه';
          this.toastr.error(' البريد الالكتروني سبق استخدامه', '');
        }else {
          this.toastr.error('حدث خطا');
        }

      }


      this.isLoading = false;

    });

  }
  

}
