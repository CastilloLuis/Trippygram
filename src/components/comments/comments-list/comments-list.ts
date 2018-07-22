import { Component, Input } from '@angular/core';
import { PostProvider } from '../../../providers/http/post/post';
import { TokenProvider } from '../../../providers/token/token';
import { distanceInWords } from 'date-fns';
@Component({
  selector: 'comments-list',
  templateUrl: 'comments-list.html',
  providers: [PostProvider]
})
export class CommentsListComponent {

  @Input() data: Object = {};
  comments: Array<any> = [];

  constructor(private http: PostProvider) {
    console.log('Hello CommentsListComponent Component');
  }

  ngAfterViewInit() {
    console.log(this.data);
    this.getComments();
  }

  getComments() {
    this.http.getComments(`getComments.php?id=${this.data['postid']}`)
      .subscribe((res) => {
        console.log(res.data)
        res.data.map((c) => c.created_at = this.newDate(
          (((c['created_at']).split(' ')[0]).split('-')),
          (((c['created_at']).split(' ')[1]).split(':'))
        ));
        console.log(res.data)
        this.comments = res.data;
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



}
