import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { HttpProvider } from '../../providers/http/http';
import { DomSanitizer } from '@angular/platform-browser';
import { PostPage } from '../post/post';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [NativeStorage]
})
export class ProfilePage {

  profileData: Object = {};
  mypost = [];
  liked_posts = [];
  tagged_posts = [];
  local = 'http://192.168.1.5:80/trippygram/';
  viewPost = PostPage;
  loggeduser = <any>{};

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private http: HttpProvider,
              private domsan: DomSanitizer, private nativeSto: NativeStorage) {
  }

  ionViewDidEnter() {
    this.nativeSto.getItem('loggeduser')
      .then(
        (data) => this.loggeduser = data,
        (err) => alert('error: ' + err)
      ).catch((err) => alert('error2: ' + err));

    this.liked_posts = [];
    console.log('ionViewDidLoad ProfilePage');
    this.http.fetch(null, 'GET', `profile.php?user_id=${this.loggeduser.username}`)
      .subscribe((res) => {
        console.log(res)
        if(res.status === 200) {
          console.log(res)
          this.profileData = res.data;
          res.posts.map((p) => {
            p.username = res.data.username;
            this.mypost.push(p)
          });
          res.liked_posts.map((lp) => this.liked_posts.push(lp));
          this.getTaggedPosts();
          console.log(this.mypost);
          console.log(this.liked_posts)
          this.liked_posts.push(this.loggeduser);
          this.mypost.push(this.loggeduser);
          this.tagged_posts.push(this.loggeduser)
        }
      });
  }

  getTaggedPosts() {
    this.http.fetch(null, 'GET', `mentions.php?userid=${this.loggeduser.username}`)
      .subscribe((res) => ((res.status === 200) ? res.data.map(r => this.tagged_posts.push(r)) : false));
  }

  editProfile() {
    let modal = this.modalCtrl.create(EditProfilePage, {data: this.profileData});
    modal.present();
  }

}
