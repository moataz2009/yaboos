
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  constructor(private http: HttpClient) { }

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
}
