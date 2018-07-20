import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';

@Injectable()
export class TokenProvider {
 
  loggeduser: Object = <any>{};
  constructor(public http: HttpClient, private nativeSto: NativeStorage) {
    console.log('Hello TokenProvider Provider');
  }

  userToken() {
    return new Promise((res, rej) => {
      this.nativeSto.getItem('loggeduser')
          .then((data) => res(data),
                (err) => rej(err)
          )
          .catch((err) => rej(err));      
    })
  }

  serverIP() {
    return 'http://192.168.1.5:80/trippygram';
  }

}
