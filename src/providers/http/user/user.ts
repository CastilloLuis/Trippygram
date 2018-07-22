import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { TokenProvider } from '../../token/token';

@Injectable()
export class UserProvider {
  
  svhost: string = '';

  constructor(public http: HttpClient, private TokenProvider: TokenProvider) {
    console.log('Hello HttpProvider Provider');
    this.svhost = `${this.TokenProvider.serverIP()}/api/api`;
  }
  
  userDashboard = (url) => {
    return this.http.get(`${this.svhost}/${url}`)
      .map((res: any) => res);
  }

  searchAction = (url, data) => {
    return this.http.post(`${this.svhost}/${url}`, data)
      .map((res: any) => res);    
  }

  uploadAction = (url, data) => {
    return this.http.post(`${this.svhost}/${url}`, data)
      .map((res: any) => res);       
  }

  userActivity = (url) => {
    return this.http.get(`${this.svhost}/${url}`)
      .map((res: any) => res);    
  }

  userProfile = (url) => {
    return this.http.get(`${this.svhost}/${url}`)
      .map((res: any) => res); 
  }

  userEditProfile = (url, data) => {
    return this.http.post(`${this.svhost}/${url}`, data)
      .map((res: any) => res);       
  }

  taggedPosts = (url) => {
    return this.http.get(`${this.svhost}/${url}`)
      .map((res: any) => res); 
  }

}
