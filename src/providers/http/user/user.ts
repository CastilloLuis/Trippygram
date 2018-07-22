import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { environment as ENV } from '../../../environments/enviroment';

@Injectable()
export class UserProvider {
  
  svhost: string = '';

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
    this.svhost = `${ENV.BASE_URL}/api/api`;
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
