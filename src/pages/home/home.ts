import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loginPage = LoginPage;

  constructor(public navCtrl: NavController, private modalCtrl: ModalController) {
  }

  swipeEvent(e) {
    if(e.direction == '2'){
       (this.modalCtrl.create(this.loginPage)).present();
    }
  }

}
