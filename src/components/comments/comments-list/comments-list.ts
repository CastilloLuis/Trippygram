import { Component } from '@angular/core';

/**
 * Generated class for the CommentsListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'comments-list',
  templateUrl: 'comments-list.html'
})
export class CommentsListComponent {

  text: string;

  constructor() {
    console.log('Hello CommentsListComponent Component');
    this.text = 'Hello World';
  }

}
