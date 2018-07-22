import { Component, Input, EventEmitter, Output, ElementRef } from '@angular/core';
import distanceInWords from 'date-fns/distance_in_words'
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { ListPage } from '../../pages/list/list';
import { ModalController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { PostProvider } from '../../providers/http/post/post';
import { environment as ENV } from '../../environments/enviroment';

@Component({
  selector: 'postcard',
  templateUrl: 'postcard.html',
  providers: [ LaunchNavigator, NativeStorage, PostProvider ]
})
export class PostcardComponent {

  @Input() postData: Object = {};
  @Input() loggedUser: Object = {};
  local = '';
  text: string;
  avatar: string = '';
  date: any;
  comment_info = {};
  listPage = ListPage;
  constructor(private http: PostProvider, private ref: ElementRef, private launchNavigator: LaunchNavigator, 
              private modalCtrl: ModalController, private nativeSto: NativeStorage) {
    console.log('Hello PostcardComponent Component');
   // this.text = 'Hello World';
    this.local = `${ENV.BASE_URL}/`;
  }

  ngAfterViewInit() {
    let data = {
      post_id: this.postData['post_id'],
      user_id: this.loggedUser['userid']
    }
    //console.log(data)
    //console.log((this.ref.nativeElement.querySelectorAll('.hello') as HTMLButtonElement));
    this.http.getLikes(`verifyLikes.php?user_id=${data.user_id}&post_id=${data.post_id}`)
      .subscribe((res) => {
        if(res.status === 200) {
          (document.getElementById(data.post_id) as HTMLButtonElement).style.color = 'red';
          console.log('siuuuuuuu');
        } else {
          (document.getElementById(data.post_id) as HTMLButtonElement).style.color = 'white';
        }
      });
  }

  ngOnChanges() {
    this.avatar = `${this.local}${(((this.postData['avatar']).split('trippygram/'))[1])}`;
    this.date = this.newDate((((this.postData['created_at']).split(' ')[0]).split('-')));
    this.comment_info['postid'] = this.postData['post_id'];
    this.comment_info['userid'] = 1;
  }

  newDate(d) {
    let today = new Date();
    return distanceInWords(
      new Date(today.getFullYear(), today.getMonth()+1, today.getDate()),
      new Date(d[0], d[1], d[2])
    );
  }

  likePost(postID: any) {
    let data = {
      post_id: postID,
      user_id: this.loggedUser['userid']
    }
    console.log(data)
    console.log(postID);
    this.http.getLikes(`like.php?user_id=${data.user_id}&post_id=${data.post_id}`)
      .subscribe((res) => {
        this.httpStatus(res, postID);
        console.log(res);
      })
    console.log(this.postData)
  }

  showList(id, likelist) {
    console.warn(id);
    let data = {postid: id};
    ((likelist) ? data['likelist'] = true : data['likelist'] = false);
    let modal = this.modalCtrl.create(this.listPage, {data: data});
    modal.present()
  }

  getMap(lat, long) {
    /*alert(lat)
    alert(long)*/
    this.launchNavigator.navigate([lat, long],{app: this.launchNavigator.APP.GOOGLE_MAPS})
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );    
  } 

  httpStatus(caseType, id) {
    switch(caseType.status) {
      case 200:
        (document.getElementById(id) as HTMLButtonElement).style.color = 'red';
        console.log('todo bien wey!!!!')
        break;
      case 207:
        (document.getElementById(id) as HTMLButtonElement).style.color = 'white';
        console.log('ya le haz dado like wey... dislike x feo');
        break;
      case 400:
        (document.getElementById(id) as HTMLButtonElement).style.color = 'white';
        console.log('errorrrrr');
        break;
    }
  }

}