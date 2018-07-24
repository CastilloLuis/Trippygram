import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/http/user/user';
import { TokenProvider } from '../../providers/token/token';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers: [TokenProvider, NativeStorage, UserProvider]
})
export class DashboardPage {

  dashboardPosts = [];
  dashboard_arr = [];
  loggeduser: Object = <any>{};
  loaded: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: UserProvider,
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
    this.http.userDashboard(`home.php?id=${2}`) //this.loggeduser['userid']
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