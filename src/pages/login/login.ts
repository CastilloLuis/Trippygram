import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ViewController } from 'ionic-angular';
import { helpers } from '../../global';
import { HttpProvider } from '../../providers/http/http';
import { TabsPage } from '../tabs/tabs';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { TokenProvider } from '../../providers/token/token';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [helpers, NativeStorage, TokenProvider, HttpProvider]
})
export class LoginPage {

  user_login = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private helpers: helpers, private alertCtrl: AlertController,
              private http: HttpProvider, private modalCtrl: ModalController, private viewCtrl: ViewController,
              private nativeSto: NativeStorage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginForm() {
   if(!(this.helpers.validateJSON(this.user_login, 2))) {
      (this.alertCtrl.create({
        title: 'Error :(',
        subTitle: 'Please, fill all the fields...',
        buttons: ['OK']
      })).present();
    } else {
      this.http.fetch(this.user_login, 'POST', 'login.php')
        .subscribe((res) => {
          if(res.status === 200) {
            this.nativeSto.setItem('loggeduser', {username: res.username, userid: res.user_id});
            this.navCtrl.setRoot(TabsPage);
          } else {
            (this.alertCtrl.create({
              title: 'Error :(',
              subTitle: res.message,
              buttons: ['OK']
            })).present();
          }
        },
        (err) => {
          (this.alertCtrl.create({
            title: 'Error :(',
            subTitle: JSON.stringify(err),
            buttons: ['OK']
          })).present();          
        }
      );
    }
  }

  closeit() {
    this.viewCtrl.dismiss();
  }


}
