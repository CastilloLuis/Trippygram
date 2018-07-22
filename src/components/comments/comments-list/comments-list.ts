import { Component, Input } from '@angular/core';
import { PostProvider } from '../../../providers/http/post/post';
import { TokenProvider } from '../../../providers/token/token';
@Component({
  selector: 'comments-list',
  templateUrl: 'comments-list.html',
  providers: [PostProvider]
})
export class CommentsListComponent {

  @Input() data: Object = {};

  constructor(private http: PostProvider) {
    console.log('Hello CommentsListComponent Component');
  }

  ngAfterViewInit() {
    console.log(this.data);
    this.getComments();
  }

  getComments() {
    this.http.getComments(`getComments.php?id=${this.data['postid']}`)
      .subscribe((res) => console.warn(res));
  }



}
