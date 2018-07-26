import { Component, Input } from '@angular/core';

/**
 * Generated class for the PreviewcommentsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'previewcomments',
  templateUrl: 'previewcomments.html'
})
export class PreviewcommentsComponent {
  
  @Input() data: Object = {};
  text: string;

  constructor() {
    console.log('Hello PreviewcommentsComponent Component');
    this.text = 'Hello World';
  }

  ngAfterViewInit() {
    console.warn(this.data);
  }

}
