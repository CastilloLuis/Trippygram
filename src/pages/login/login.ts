import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { helpers } from '../../global';
import { HttpProvider } from '../../providers/http/http';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [helpers]
})
export class LoginPage {

  user_login = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private helpers: helpers, private alertCtrl: AlertController,
              private http: HttpProvider) {
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
            this.navCtrl.setRoot(TabsPage);
          } else {
            (this.alertCtrl.create({
              title: 'Error :(',
              subTitle: res.message,
              buttons: ['OK']
            })).present()
          }
        });
    }
  }

}
