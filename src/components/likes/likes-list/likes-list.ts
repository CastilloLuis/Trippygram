import { Component, Input } from '@angular/core';
import { PostProvider } from '../../../providers/http/post/post';
import { ModalController } from 'ionic-angular';
import { ProfilePage } from '../../../pages/profile/profile';
import { environment as ENV } from '../../../environments/enviroment';

@Component({
  selector: 'likes-list',
  templateUrl: 'likes-list.html'
})
export class LikesListComponent {

  @Input() data: Object = {};
  likes: Array<any> = [];
  profilePage = ProfilePage;
  isEmpty: boolean = false;
  local: string = '';

  constructor(private http: PostProvider, private modalCtrl: ModalController) {
    console.log('Hello CommentsListComponent Component');
    this.local = `${ENV.BASE_URL}`;
  }

  ngAfterViewInit() {
    console.log(this.data);
    this.getLikes();
  }

  getLikes() {
    this.http.getLikes(`getLikes.php?id=${this.data['postid']}`)
      .subscribe((res) => {
        console.log(res);
        if ((res.status === 200) && (res.data.length != 0)) {
          res.data.map(u => u.avatar = `${this.local}${(((u['avatar']).split('trippygram/'))[1])}`);
          this.likes = res.data;
        } else {
          this.isEmpty = true
        }
      });
  }

  goToProfile(id: any) {
    (this.modalCtrl.create(this.profilePage, {visit: true, id: id})).present();
  }
}
