
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/models/user.model';
import { BaseURL } from '../../service/globals/global-config';
//import { Response } from '@angular/http'
map

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly rootUrl = BaseURL;
  
  private mianIsLogedIn = new BehaviorSubject<any>(null);
  isLogedIn = this.mianIsLogedIn.asObservable();


  constructor(private http: HttpClient) { }

  actionChangeStatus(attr: any){
    this.mianIsLogedIn.next(attr);
  }


  regestarUser(user: User){
    const body: User = {
        username: user.username,
        name: user.name,
        password: user.password,
        confirmPassword: user.confirmPassword,
        deviceToken: null,
    }

    return this.http.post(this.rootUrl+'/api/Account/register', body);
  }

  loginAuth(userName:string, password:string){

    var data = `{ "username": "${userName}", "password": "${password}", "deviceToken": "" }`;
    var ReqHrder = new HttpHeaders({  'Content-Type':  'application/json' });

    return this.http.post(this.rootUrl+'/api/Account/login', data, {headers: ReqHrder});

  }

  ChangePassword(oldPassword:string, newPassword:string){

    var data = `{ "oldPassword": "${oldPassword}", "newPassword": "${newPassword}", "deviceToken": "" }`;
    var ReqHrder = new HttpHeaders({  
      'Content-Type':  'application/json',
      'Authorization': "Bearer "+localStorage.getItem('userToken')
     });

    return this.http.post(this.rootUrl+'/api/Account/ChangePassword', data, {headers: ReqHrder});

  }
}
