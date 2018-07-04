import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  dashboardPosts = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    this.http.fetch(null, 'GET', `home.php?id=${1}`)
      .subscribe((res) => ((res.status === 200) ? res.data.map(p => this.dashboardPosts.push(p)) : false ));
  }

}
