import { Component, Input } from '@angular/core';
import { PostProvider } from '../../../providers/http/post/post';
import { TokenProvider } from '../../../providers/token/token';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'comments',
  templateUrl: 'comments.html',
  providers: [PostProvider]
})
export class CommentsComponent {
  
  @Input() userdata: any = null;

  comment_text: string = '';

  constructor(private tokenProvider: TokenProvider, 
              private http: PostProvider, 
              private toastCtrl: ToastController) {
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
      .subscribe((res) => {
        console.warn(res)
        if(res.status === 200) {
          (this.successToast(true)).present();
          this.comment_text = '';
        } else {
          (this.successToast(false)).present();
        }
      });
  }

  successToast(commented: boolean) {
    if(commented) {
      return this.toastCtrl.create({
        message: 'Comment added successfully!',
        duration: 2000
      });
    } else {
      return this.toastCtrl.create({
        message: 'An error ocurred while commeting... try again',
        duration: 2000
      });
    }
  }
}
