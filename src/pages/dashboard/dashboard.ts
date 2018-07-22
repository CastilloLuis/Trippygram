import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { TokenProvider } from '../../providers/token/token';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers: [NativeStorage, TokenProvider, HttpProvider]
})
export class DashboardPage {

  dashboardPosts = [];
  dashboard_arr = [];
  loggeduser: Object = <any>{};
  loaded: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpProvider,
              private nativeSto: NativeStorage, private userToken: TokenProvider) {
                userToken.userToken()
                .then((data) => this.loggeduser = data)
                .catch((err) => console.log(err))

  }

  ionViewWillEnter() {
    this.loaded = false;
    this.dashboardPosts = [];
    this.showDashboard();
  }

  ionViewWillLeave(){
    this.dashboardPosts = [];
  }
  
  showDashboard() {
    this.http.fetch(null, 'GET', `home.php?id=${1}`) //this.loggeduser['userid']
      .subscribe(
        (res) =>  {
          if(res.status === 200) {
            res.data.map(p => this.dashboardPosts.push(p));
            this.loaded = true;
            // alert(JSON.stringify(this.dashboardPosts))
            console.log(this.dashboardPosts)
          } else {
            alert('Error finding posts :(');
          }
        }
      );
  }

  spinnerStyle() {
    let style = {
      'display': this.loaded ? 'none' : 'block'
    }
    return style;
  }

}