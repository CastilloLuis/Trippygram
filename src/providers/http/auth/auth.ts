import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { environment as ENV } from '../../../environments/enviroment';
import { Observable } from 'rxjs';

@Injectable()
export class AuthProvider {
  
  svhost: string = '';

  constructor(public http: HttpClient) {
    console.log('Hello HttpProvider Provisssder');
    this.svhost = `${ENV.BASE_URL}/api/api`;
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
