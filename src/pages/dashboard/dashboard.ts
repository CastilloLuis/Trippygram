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
  }

  ionViewWillEnter() {
    this.userToken.userToken()
    .then((data) => this.loggeduser = data)
    .catch((err) => console.log(err))     
    this.loaded = false;
    this.dashboardPosts = [];
    this.showDashboard();
  }

  ionViewWillLeave() {
    this.dashboardPosts = [];
  }
  
  showDashboard() {
    this.http.userDashboard(`home.php?id=${1}`) // this.loggeduser['userid']
      .subscribe(
        (res) =>  {
          if(res.status === 200) {
            res.data.map(p => this.dashboardPosts.push(p));
            console.log(this.dashboardPosts);
            for(let i = 0; i < 5; i++) {
              this.dashboard_arr.push(this.dashboardPosts[this.dashboard_arr.length]);
            }
            //(this.dashboardPosts.sort((d1, d2) => new Date(d1.created_at).getTime() - new Date(d2.created_at).getTime())).reverse();
            this.loaded = true;
            // alert(JSON.stringify(this.dashboardPosts))
            console.log(this.dashboardPosts)
          } else {
            alert('Error finding posts :(');
          }
        }
      );
  }

  doInfinite(e) {
    setTimeout( ()=> {
      for (let i = 0; i < 5; i++) {
        this.dashboard_arr.push(this.dashboardPosts[this.dashboard_arr.length]);
      }    
      e.complete();
    }, 2000);    
  }


  spinnerStyle() {
    let style = {
      'display': this.loaded ? 'none' : 'block',
      'margin-top': '20px'
    }
    return style;
  }

}