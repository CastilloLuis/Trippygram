import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';

/**
 * Generated class for the ActivityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {

  mentions = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpProvider) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad ActivityPage');
    this.http.fetch(null, 'GET', `mentions.php?userid=${1}`)
      .subscribe((res) => res.data.map((r) => this.mentions.push(r)));
      console.log(this.mentions)
  }

}
