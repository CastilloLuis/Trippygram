import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { PostProvider } from '../../providers/http/post/post';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [NativeStorage, PostProvider]
})
export class ListPage {

  data: Object = {};
  likelist: boolean = false;
  isEmpty: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    this.data = this.navParams.get('data');
    this.likelist = this.data['likelist'];
    console.log(this.data)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

  closeit() {
    this.viewCtrl.dismiss();
  }

}
