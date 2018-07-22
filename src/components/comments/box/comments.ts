import { Component, Input } from '@angular/core';
import { HttpProvider } from '../../../providers/http/http';
import { TokenProvider } from '../../../providers/token/token';

@Component({
  selector: 'comments',
  templateUrl: 'comments.html'
})
export class CommentsComponent {
  
  @Input() userid: any = null;

  comment_text: string = '';

  constructor(private http: HttpProvider, private tokenProvider: TokenProvider) {
    console.log('Hello CommentsComponent Component');
  }

  sendComment(id) {
    console.log(id);
    console.log(this.comment_text);
  }
}
