import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { TokenProvider } from '../../token/token';
import { Observable } from 'rxjs';

@Injectable()
export class AuthProvider {
  
  svhost: string = '';

  constructor(public http: HttpClient, private TokenProvider: TokenProvider) {
    console.log('Hello HttpProvider Provider');
    this.svhost = `${this.TokenProvider.serverIP()}/api/api`;
  }
  
  userLogin = (url, data) => {
    // console.log(newUser);
    return this.http.post(`${this.svhost}/${url}`, data)
        .map((res: any) => res);
  }

  userRegister = (url, data) => {
    return this.http.post(`${this.svhost}/${url}`, data)
        .map((res: any) => res);
  }


}
