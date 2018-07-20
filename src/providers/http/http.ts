import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { TokenProvider } from '../token/token';

@Injectable()
export class HttpProvider {
  
  svhost: string = '';

  constructor(public http: HttpClient, private TokenProvider: TokenProvider) {
    console.log('Hello HttpProvider Provider');
    this.svhost = `${this.TokenProvider.serverIP()}/api/api`;
  }
  
  fetch(data, method, url){
    switch(method){
        case 'GET': {
            return this.http.get(`${this.svhost}/${url}`)
                .map((res: any) => res);
        }
        case 'POST': {
            return this.http.post(`${this.svhost}/${url}`, data)
                .map((res: any) => res);
        }
        case 'PUT': {
            return this.http.put(`${this.svhost}/${url}`, data)
                .map((res: any) => res);
        }
        case 'DELETE': {
            return this.http.delete(`${this.svhost}/${url}`)
                .map((res: any) => res);
        }
    }
}  

}
