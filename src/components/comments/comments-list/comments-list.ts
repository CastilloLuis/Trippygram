import { Component, Input } from '@angular/core';
import { PostProvider } from '../../../providers/http/post/post';
import { distanceInWords } from 'date-fns';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'comments-list',
  templateUrl: 'comments-list.html',
  providers: [PostProvider]
})
export class CommentsListComponent {

  @Input() data: Object = {};
  comments: Array<any> = [];
  url: string = '';
  isEmpty: boolean = false;
  
  constructor(private http: PostProvider, private toastCtrl: ToastController) {
    console.log('Hello CommentsListComponent Component');
  }

  ngAfterViewInit() {
    console.warn(this.data);
    this.getComments();
  }

  getComments() {
    this.http.getComments(`getComments.php?id=${this.data['postid']}&limit=${this.data['limit']}`)
      .subscribe((res) => {
        console.log(res.data)
        if(res.status === 200 && res.data.length != 0) {
          res.data.map((c) => c.created_at = this.newDate(
            (((c['created_at']).split(' ')[0]).split('-')),
            (((c['created_at']).split(' ')[1]).split(':'))
          )); 
          console.log(res.data);
          res.data.map(c => (parseInt(c.id_user) === this.data['loggeduser'] || (parseInt(this.data['postUserId']) === this.data['loggeduser']))? c.own = true : c.own = false);
          //alert("asdadasd"+this.data['loggeduser']+1);
          //res.data.map(c => parseInt(c.id_user) === parseInt("1") ? c.own = true : c.own = false);
          console.warn(res.data)
          this.comments = res.data;          
        } else {
          this.isEmpty = true;
        }

      });
  }

  newDate(d, d1) {
    let today = new Date();
    console.warn(d);
    console.warn(d1);
    return distanceInWords(
      new Date(d[0], d[1], d[2], d1[0], d1[1], d1[2]),
      new Date(today.getFullYear(), today.getMonth()+1, today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds()),
      {addSuffix: true}
    );
  }

  deleteComment(item, comment_id) {
    let json = {comment_id: comment_id, post_id: this.data['postid']};
    console.log(json);
    this.http.deleteComment('deleteComment.php', json)
      .subscribe((res) => {
        if(res.status === 200) {
          this.comments.map((c) => ((c.comment_id === comment_id) ? this.comments.splice(this.comments.indexOf(c), 1) : false));
          (this.deleteToast(true)).present();
        } else {
          (this.deleteToast(false)).present();
        }
      });
  }

  deleteToast(deleted: boolean) {
    if(deleted) {
      return this.toastCtrl.create({
        message: 'Comment deleted successfully!',
        duration: 2000,
        cssClass: 'deleteToast'
      });
    } else {
      return this.toastCtrl.create({
        message: 'An error ocurred while deleting... try again',
        duration: 2000,
        cssClass: 'deleteToast'
      });
    }
  }


}
