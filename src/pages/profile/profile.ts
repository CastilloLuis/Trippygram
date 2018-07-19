import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { HttpProvider } from '../../providers/http/http';
import { TokenProvider } from '../../providers/token/token';
import { DomSanitizer } from '@angular/platform-browser';
import { PostPage } from '../post/post';
import { NativeStorage } from '@ionic-native/native-storage';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [NativeStorage, TokenProvider]
})
export class ProfilePage {

  profileData: Object = {};
  mypost = [];
  liked_posts = [];
  tagged_posts = [];
  local = 'http://192.168.1.6:80/trippygram/';
  viewPost = PostPage;
  loggeduser: Object = <any>{};
  posts = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private http: HttpProvider,
              private domsan: DomSanitizer, private nativeSto: NativeStorage, private userToken: TokenProvider) {
                this.posts = "userPosts";
                userToken.userToken()
                  .then((data) => this.loggeduser = data)
                  .catch((err) => console.log(err))
                //this.loggeduser = userToken.userToken();
  }

  ionViewWillEnter() {
    // alert('userdatashit' + this.loggeduser);
    this.http.fetch(null, 'GET', `profile.php?user_id=${this.loggeduser['userid']}`)
      .subscribe((res) => {
        console.log(res)
        if(res.status === 200) {
          console.log(res)
          this.profileData = res.data;
          this.profileData['myavatar'] = (res.data.avatar).split('trippygram/')[1];          
          delete this.profileData['avatar']
          // alert(this.profileData['myavatar'])
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
          this.tagged_posts.push(this.loggeduser);
          // alert(JSON.stringify(this.profileData));
        }
      });
  }

  ionViewWillLeave(){
    this.mypost = [];
    this.liked_posts = [];
    this.tagged_posts = [];
  }

  getTaggedPosts() {
    this.http.fetch(null, 'GET', `mentions.php?userid=${this.loggeduser['userid']}`)
      .subscribe((res) => ((res.status === 200) ? res.data.map(r => this.tagged_posts.push(r)) : false));
  }

  editProfile() {
    let modal = this.modalCtrl.create(EditProfilePage, {data: this.profileData});
    modal.present();
  }

  logOut() {
    this.nativeSto.clear()
      .then(() => {
        alert('Logged out');
        // this.navCtrl.setRoot(HomePage);
        this.navCtrl.parent.parent.setRoot(HomePage)
      })
      .catch(() => alert('Error while logout action...'))
  }

}
