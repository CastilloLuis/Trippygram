import { Component, Input, EventEmitter, Output } from '@angular/core';
import { HttpProvider } from '../../providers/http/http';

@Component({
  selector: 'postcard',
  templateUrl: 'postcard.html'
})
export class PostcardComponent {

  @Input() postData: Object = {};
  local = 'http://localhost:80/trippygram/'
  text: string;

  constructor(private http: HttpProvider) {
    console.log('Hello PostcardComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit() {
    let data = {
      post_id: this.postData['post_id'],
      user_id: 1
    }
    console.warn(data)
    this.http.fetch(null, 'GET', `verifyLikes.php?user_id=${data.user_id}&post_id=${data.post_id}`)
      .subscribe((res) => {
        if(res.status === 200) {
          (document.getElementById('like-icon') as HTMLButtonElement).style.color = 'red';
        } else {
          (document.getElementById('like-icon') as HTMLButtonElement).style.color = 'white';
        }
      });
  }

  likePost(postID: any) {
    let data = {
      post_id: postID,
      user_id: 1
    }
    console.log(postID);
    this.http.fetch(null, 'GET', `like.php?user_id=${data.user_id}&post_id=${data.post_id}`)
      .subscribe((res) => {
        this.httpStatus(res);
        console.log(res);
      })
    console.log(this.postData)
  }

  httpStatus(caseType) {
    switch(caseType.status) {
      case 200:
        (document.getElementById('like-icon') as HTMLButtonElement).style.color = 'red';
        console.log('todo bien wey!!!!')
        break;
      case 207:
        (document.getElementById('like-icon') as HTMLButtonElement).style.color = 'white';
        console.log('ya le haz dado like wey... dislike x feo');
        break;
      case 400:
        (document.getElementById('like-icon') as HTMLButtonElement).style.color = 'white';
        console.log('errorrrrr');
        break;
    }
  }

}
