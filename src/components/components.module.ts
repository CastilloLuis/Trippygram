import { NgModule } from '@angular/core';
import { PostcardComponent } from './postcard/postcard';
import { CommentsComponent } from './comments/box/comments';
import { CommentsListComponent } from './comments/comments-list/comments-list';
@NgModule({
	declarations: [PostcardComponent,
    CommentsComponent,
    CommentsListComponent
    ],
	imports: [],
	exports: [PostcardComponent,
    CommentsComponent,
    CommentsListComponent
    ]
}) 
export class ComponentsModule {}
