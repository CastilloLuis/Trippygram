import { Component, Input } from '@angular/core';
import { PostProvider } from '../../../providers/http/post/post';
import { TokenProvider } from '../../../providers/token/token';

@Component({
  selector: 'comments',
  templateUrl: 'comments.html',
  providers: [PostProvider]
})
export class CommentsComponent {
  
  @Input() userdata: any = null;

  comment_text: string = '';

  constructor(private tokenProvider: TokenProvider, private http: PostProvider) {
    //console.log('Hello CommentsComponent Component');
  }

  sendComment(userdata) {
    // alert('userid '+id);
    let json = {
      comment_text: this.comment_text,
      id_user: userdata.userid, //userdata.userid
      post_id: userdata.postid
    }
    console.warn(json)
    this.http.sendComment('comment.php', json)
      .subscribe((res) => console.warn(res));
  }
}
