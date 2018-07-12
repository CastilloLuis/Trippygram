import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {
  
  svhost: string = 'http://192.168.1.5:80/trippygram/api/api';

  constructor(public http: HttpClient) {
    console.log('Hello HttpProvider Provider');
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
