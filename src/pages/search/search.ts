import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { TokenProvider } from '../../providers/token/token';
import { NativeStorage } from '@ionic-native/native-storage';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers: [TokenProvider, NativeStorage, HttpProvider]
})
export class SearchPage {

  keyword = '';
  searchResults = [];
  ht = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpProvider) {
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
      console.log('HTTTT');
        data['key'] = `#${this.keyword}`;
        data['ht'] = true;
        console.log(data)
        this.http.fetch(data, 'POST', 'search.php')
          .subscribe((res) => res.map((r) => this.searchResults.push(r)));
          console.log(this.searchResults)
        break;
      case 'u':
        this.ht = false;
      console.log('UUUUUUU')
        data['key'] = this.keyword;
        data['ht'] = false;
        console.log(data)
        this.http.fetch(data, 'POST', 'search.php')
          .subscribe((res) => res.map((r) => this.searchResults.push(r)));
        break;
    }
  }

}
