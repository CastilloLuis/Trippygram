import { Component, Input } from '@angular/core';
import { ProfilePage } from '../../../pages/profile/profile';
import { UserProvider } from '../../../providers/http/user/user';
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'followlist',
  templateUrl: 'followlist.html'
})
export class FollowlistComponent {

  @Input() data: Object = {};
  userList: Array<any> = [];
  profilePage = ProfilePage;
  isEmpty: boolean = false;

  constructor(private http: UserProvider, private modalCtrl: ModalController) {
  }

  ngAfterViewInit() {
    console.log('Component ng after view init');
    console.warn(this.data);
    this.getFollowList();
  }

  getFollowList() {
    this.http.userFollowers(`getFollowList.php?id=${this.data['loggeduser']}&followers=${this.data['followers']}`)
      .subscribe(
        (res) => {
          console.log(res);
          if(res.status === 200) {
            ((res.data.length != 0) ? this.userList = res.data : this.isEmpty = true);
          } else {
            alert('Oopss, we sorry :( Please, try it later...');
          }
        },
        (err) => {
          console.log(err);
          alert(`Oopss, we sorry :( Please, try it later... ${err}`);
        }
      );
  }

  goToProfile(id: any) {
    console.log(id);
    (this.modalCtrl.create(this.profilePage, {visit: true, id: id})).present();
  }

}
