import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/http/user/user';
import { TokenProvider } from '../../providers/token/token';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
  providers: [NativeStorage, TokenProvider, UserProvider]
})
export class ActivityPage {

  mentions = [];
  loggeduser = <any>{};

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: UserProvider,
              private nativeSto: NativeStorage, private userToken: TokenProvider) {
                userToken.userToken()
                  .then((data) => this.loggeduser = data)
                  .catch((err) => console.log(err))                
  }

  ionViewWillEnter() {
    this.http.userActivity(`mentions.php?userid=${this.loggeduser.userid}`)
      .subscribe((res) => res.data.map((r) => this.mentions.push(r)));
  }

  ionViewWillLeave(){
   this.mentions = [];
  }

}
