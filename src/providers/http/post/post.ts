import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { environment as ENV } from '../../../environments/enviroment';

@Injectable()
export class PostProvider {
  
  svhost: string = ''; 

  constructor(public http: HttpClient) {
    console.log('Hello HttpProvider Provider');
    this.svhost = `${ENV.BASE_URL}/api/api`;
  }
  
  setLike = (url) => {
    return this.http.get(`${this.svhost}/${url}`)
      .map((res: any) => res);  
  }

  sendComment = (url, data) => {
    return this.http.post(`${this.svhost}/${url}`, data)
      .map((res: any) => res);    
  }

  postData = (url, data) => {
    return this.http.get(`${this.svhost}/${url}`)
      .map((res: any) => res);    
  }

  verifyLike = (url) => {
    return this.http.get(`${this.svhost}/${url}`)
      .map((res: any) => res);        
  }

  getComments = (url) => {
    return this.http.get(`${this.svhost}/${url}`)
      .map((res: any) => res);            
  }

  getLikes = (url) => {
    return this.http.get(`${this.svhost}/${url}`)
      .map((res: any) => res);          
  }

}
