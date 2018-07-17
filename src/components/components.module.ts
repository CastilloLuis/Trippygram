import { NgModule } from '@angular/core';
import { PostcardComponent } from './postcard/postcard';
import { MediaComponent } from './media/media';
@NgModule({
	declarations: [PostcardComponent,
    MediaComponent],
	imports: [],
	exports: [PostcardComponent,
    MediaComponent]
})
export class ComponentsModule {}
