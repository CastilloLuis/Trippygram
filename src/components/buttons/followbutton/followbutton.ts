import { Component, Input } from '@angular/core';
import { PostProvider } from '../../../providers/http/post/post';
import { subscribeOn } from 'rxjs/operator/subscribeOn';

@Component({
  selector: 'followbutton',
  templateUrl: 'followbutton.html',
  providers: [ PostProvider ]
})
export class FollowbuttonComponent {

  @Input() dataFollow: any = '';

  constructor(private http: PostProvider) {
    console.log('Hello FollowbuttonComponent Component');
  }

  ngAfterViewInit() {
    // console.log(this.dataFollow);
    this.checkFollow(this.dataFollow);
  }

  checkFollow(data: any) {
    this.http.verifyFollow('checkFollow.php', data)
      .subscribe((res) => {
        console.warn(res);
        this.httpStatus(res, 'follow-btn');
      });
  }

  followAction() {
    // console.log(this.dataFollow)
    this.http.setFollow('follow.php', this.dataFollow)
      .subscribe((res) => this.httpStatus(res, 'follow-btn'));
  }

  httpStatus(caseType, id) {
    switch(caseType.status) {
      case 200:
        (document.getElementById(id) as HTMLButtonElement).style.backgroundColor = 'rgb(32, 221, 32)';
        (document.getElementById(id) as HTMLButtonElement).style.color = 'white';
        console.log('todo bien wey!!!!')
        break;
      case 207:
        (document.getElementById(id) as HTMLButtonElement).style.backgroundColor = 'white';
        (document.getElementById(id) as HTMLButtonElement).style.color = 'black';
        console.log('already followed. UNFOLLOW THIS USER');
        break;
      case 400:
        (document.getElementById(id) as HTMLButtonElement).style.color = 'white';
        (document.getElementById(id) as HTMLButtonElement).style.color = 'black';
        console.log('errorrrrr');
        break;
    }
  }

}
