import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  postData: Object = {};
  loggeduser: Object = <any>{};
  local = 'http://192.168.1.4:80/trippygram/';
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeSto: NativeStorage) {
    this.postData = navParams.data;
    console.log(this.postData)
  }

  ionViewWillEnter() {
    this.nativeSto.getItem('loggeduser')
      .then(
        (data) => {
          this.loggeduser = data
        },
        (err) => alert('error: ' + err)
      ).catch((err) => alert('error2: ' + err));
  }

}
