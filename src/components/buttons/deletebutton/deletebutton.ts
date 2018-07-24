import { Component } from '@angular/core';

/**
 * Generated class for the DeletebuttonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'deletebutton',
  templateUrl: 'deletebutton.html'
})
export class DeletebuttonComponent {

  text: string;

  constructor() {
    console.log('Hello DeletebuttonComponent Component');
    this.text = 'Hello World';
  }

}
