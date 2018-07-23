import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { UserProvider } from '../../providers/http/user/user';
import { TokenProvider } from '../../providers/token/token';
import { PostPage } from '../post/post';
import { NativeStorage } from '@ionic-native/native-storage';
import { HomePage } from '../home/home';
import { environment as ENV } from '../../environments/enviroment';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [NativeStorage, TokenProvider, UserProvider]
})
export class ProfilePage {

  profileData: Object = {};
  mypost = [];
  liked_posts = [];
  tagged_posts = [];
  viewPost = PostPage;
  loggeduser: Object = <any>{};
  posts = '';
  local = '';
  visit: boolean = false;
  searchid: any;
  dataFollow: Object = <any>{};

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, 
              private http: UserProvider, private nativeSto: NativeStorage, private userToken: TokenProvider,
              private viewCtrl: ViewController) {
                this.posts = "userPosts";
                userToken.userToken()
                  .then((data) => {
                    this.loggeduser = data;
                      this.local = `${ENV.BASE_URL}/`;
                      console.warn((navParams.get('visit')));
                      if(navParams.get('visit')) {
                        this.searchid = navParams.get('id');
                        this.visit = true;
                        this.dataFollow['followerid'] = this.loggeduser['userid'];
                        this.dataFollow['followedid'] = parseInt(this.searchid);
                      } else {
                        alert(JSON.stringify(this.loggeduser['userid']));
                        alert(JSON.stringify(this.loggeduser));
                        this.searchid = this.loggeduser['userid'];
                      }                  
                  })
                  .catch((err) => console.log(err))
                //this.loggeduser = userToken.userToken();
  }

  ionViewWillEnter() {
    alert(JSON.stringify(this.searchid));
    this.http.userProfile(`profile.php?user_id=${this.searchid}`)
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
    this.http.taggedPosts(`mentions.php?userid=${this.searchid}`)
      .subscribe((res) => ((res.status === 200) ? res.data.map(r => this.tagged_posts.push(r)) : false));
  }

  editProfile() {
    let modal = this.modalCtrl.create(EditProfilePage, {data: this.profileData});
    modal.present();
  }

  closeAction(visit: boolean) {
    if(visit) {
      this.viewCtrl.dismiss();
    } else {
      this.nativeSto.clear()
        .then(() => {
          alert('Logged out');
          // this.navCtrl.setRoot(HomePage);
          this.navCtrl.parent.parent.setRoot(HomePage)
        })
        .catch(() => alert('Error while logout action...'))      
    }
  }

}
