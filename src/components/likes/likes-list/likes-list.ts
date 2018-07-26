import { Component, Input } from '@angular/core';
import { PostProvider } from '../../../providers/http/post/post';
import { distanceInWords } from 'date-fns';
import { ModalController } from 'ionic-angular';
import { ProfilePage } from '../../../pages/profile/profile';

@Component({
  selector: 'likes-list',
  templateUrl: 'likes-list.html'
})
export class LikesListComponent {

  @Input() data: Object = {};
  likes: Array<any> = [];
  profilePage = ProfilePage;
  isEmpty: boolean = false;
  
  constructor(private http: PostProvider, private modalCtrl: ModalController) {
    console.log('Hello CommentsListComponent Component');
  }

  ngAfterViewInit() {
    console.log(this.data);
    this.getLikes();
  }

  getLikes() {
    this.http.getLikes(`getLikes.php?id=${this.data['postid']}`)
      .subscribe((res) => {
        console.log(res);
        ((res.status === 200 && res.data.length != 0) ? this.likes = res.data : this.isEmpty = true);
      });
  }

  goToProfile(id: any) {
    (this.modalCtrl.create(this.profilePage, {visit: true, id: id})).present();
  }
}
