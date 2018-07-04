import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { HttpProvider } from '../../providers/http/http';
import { DomSanitizer } from '@angular/platform-browser';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profileData: Object = {};
  mypost = [];
  liked_posts = [];
  local = 'http://localhost:80/trippygram/';

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private http: HttpProvider,
              private domsan: DomSanitizer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.http.fetch(null, 'GET', `profile.php?user_id=${1}`)
      .subscribe((res) => {
        console.log(res)
        if(res.status === 200) {
          console.log(res)
          this.profileData = res.data;
          res.posts.map((p) => this.mypost.push(p));
          res.liked_posts.map((lp) => this.liked_posts.push(lp));
          console.log(this.mypost);
          console.log(this.liked_posts)
        }
      });
  }

  editProfile() {
    let modal = this.modalCtrl.create(EditProfilePage);
    modal.present();
  }

}
