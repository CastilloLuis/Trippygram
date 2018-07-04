import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  postData: Object = {};
  local = 'http://localhost:80/trippygram/';
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.postData = navParams.data;
    console.log(this.postData)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
  }

}
