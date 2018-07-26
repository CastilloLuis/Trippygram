import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TokenProvider } from '../../providers/token/token';
import { NativeStorage } from '@ionic-native/native-storage';
import { UserProvider } from '../../providers/http/user/user';
import { ProfilePage } from '../profile/profile';
import { PostPage } from '../post/post';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers: [TokenProvider, NativeStorage, UserProvider]
})
export class SearchPage {

  keyword = '';
  searchResults = [];
  ht = false;
  profilePage = ProfilePage;
  viewPost = PostPage;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: UserProvider,
              private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  search(type: any) {
    let data = {
      key: '',
      ht: null
    };
    this.searchResults = [];    
    switch(type) {
      case 'ht':
      this.ht = true;
        data['key'] = `#${this.keyword}`;
        data['ht'] = true;
        // console.log(data)
        this.http.searchAction('search.php', data)
          .subscribe((res) => res.map((r) => this.searchResults.push(r)));
          console.log(this.searchResults)
        break;
      case 'u':
        this.ht = false;
        data['key'] = this.keyword;
        data['ht'] = false;
        // console.log(data)
        this.http.searchAction('search.php', data)
          .subscribe((res) => res.map((r) => {console.log(r);this.searchResults.push(r)}));
          console.log(this.searchResults)
        break;
    }
  }

  goToProfile(id) {
    console.log(id);
    (this.modalCtrl.create(this.profilePage, {visit: true, id: id})).present();

  }

}
