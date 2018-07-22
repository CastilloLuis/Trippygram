import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ViewController } from 'ionic-angular';
import { helpers } from '../../global';
import { AuthProvider } from '../../providers/http/auth/auth';
import { TokenProvider } from '../../providers/token/token';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [helpers, AuthProvider, TokenProvider, NativeStorage]
})
export class RegisterPage {

  fields = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private helpers: helpers, private alertCtrl: AlertController,
              private http: AuthProvider, private toastCtrl: ToastController, private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  registerForm() {
    const success = this.toastCtrl.create({
      message: 'SUCCESSFUL REGISTER !!',
      duration: 1500,
      cssClass: 'addedToast'
    });
    if(!(this.helpers.validateJSON(this.fields,5))) {
      const alert = this.alertCtrl.create({
        title: 'Error :(',
        subTitle: 'Please fill all the fields...',
        buttons: ['OK']
      });
      alert.present();
    } else {
      this.http.userRegister('register.php', this.fields)
        .subscribe((res) => {
          if(res.status === 200) {
            success.present();
            success.onDidDismiss(() => this.viewCtrl.dismiss());
          } else {
            const alert = this.alertCtrl.create({
              title: 'Error :(',
              subTitle: res.message,
              buttons: ['OK']
            });
            alert.present();
          }
        });
    }
  }

  closeit() {
    this.viewCtrl.dismiss();
  }

}
