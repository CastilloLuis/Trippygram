import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { TokenProvider } from '../../providers/token/token';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
  providers: [NativeStorage, TokenProvider]
})
export class PostPage {

  postData: Object = {};
  loggeduser: Object = <any>{};
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeSto: NativeStorage,
              private userToken: TokenProvider) {
                this.postData = navParams.data;
                console.log(this.postData);
                userToken.userToken()
                  .then((data) => this.loggeduser = data)
                  .catch((err) => console.log(err))
  }

  ionViewWillEnter() {
  }

}
