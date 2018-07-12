import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
  providers: [NativeStorage]
})
export class ActivityPage {

  mentions = [];
  loggeduser = <any>{};

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpProvider,
              private nativeSto: NativeStorage) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad ActivityPage');
    this.nativeSto.getItem('loggeduser')
      .then(
        (data) => this.loggeduser = data,
        (err) => alert('error: ' + err)
      ).catch((err) => alert('error2: ' + err));

    this.http.fetch(null, 'GET', `mentions.php?userid=${this.loggeduser.userid}`)
      .subscribe((res) => res.data.map((r) => this.mentions.push(r)));
      console.log(this.mentions)
  }

}
