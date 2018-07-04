import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { HttpProvider } from '../../providers/http/http';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profileData: Object = {};
  post = [];
  liked_posts = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private http: HttpProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.http.fetch(null, 'GET', `profile.php?user_id=${1}`)
      .subscribe((res) => {
        console.log(res)
        if(res.status === 200) {
          console.log('asdasdasd')
          this.profileData = res.data;
          console.log(this.profileData)
        }
      });
      console.log(this.profileData)
  }

  editProfile() {
    let modal = this.modalCtrl.create(EditProfilePage);
    modal.present();
  }

}
