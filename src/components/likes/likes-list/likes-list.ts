import { Component, Input } from '@angular/core';
import { PostProvider } from '../../../providers/http/post/post';
import { distanceInWords } from 'date-fns';

@Component({
  selector: 'likes-list',
  templateUrl: 'likes-list.html'
})
export class LikesListComponent {

  @Input() data: Object = {};
  likes: Array<any> = [];

  constructor(private http: PostProvider) {
    console.log('Hello CommentsListComponent Component');
  }

  ngAfterViewInit() {
    console.log(this.data);
    this.getLikes();
  }

  getLikes() {
    this.http.getLikes(`getLikes.php?id=${this.data['postid']}`)
      .subscribe((res) => {
        console.log(res)
        this.likes = res.data;
        /*res.data.map((c) => c.created_at = this.newDate(
          (((c['created_at']).split(' ')[0]).split('-')),
          (((c['created_at']).split(' ')[1]).split(':'))
        ));
        console.log(res.data)
        this.likes = res.data;*/
      });
  }

}
