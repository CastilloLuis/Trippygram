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
  registerPage = RegisterPage;

  constructor(public navCtrl: NavController, private modalCtrl: ModalController) {

  }

  goToPage(page: any) {
    let modal;
    ((page === 'login') ? modal = this.modalCtrl.create(this.loginPage) : modal = this.modalCtrl.create(this.registerPage));
    modal.present();
  }

}
