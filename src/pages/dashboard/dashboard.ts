import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers: [NativeStorage]
})
export class DashboardPage {

  dashboardPosts = [];
  loggeduser: Object = <any>{};

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpProvider,
              private nativeSto: NativeStorage) {
  }

  ionViewWillEnter() {
    this.dashboardPosts = [];
    this.nativeSto.getItem('loggeduser')
      .then(
        (data) => {
          this.loggeduser = data
          this.showDashboard();
        },
        (err) => alert('error: ' + err)
      ).catch((err) => alert('error2: ' + err));
      // alert(JSON.stringify(this.loggeduser))
    console.log('ionViewDidLoad DashboardPage');
  }
  
  showDashboard() {
    this.http.fetch(null, 'GET', `home.php?id=${this.loggeduser['userid']}`)
      .subscribe(
        (res) =>  {
          if(res.status === 200) {
            res.data.map(p => this.dashboardPosts.push(p));
          }
        }
      );
  }

}
