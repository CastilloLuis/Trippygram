import { NgModule } from '@angular/core';
import { PostcardComponent } from './postcard/postcard';
import { CommentsComponent } from './comments/box/comments';
import { CommentsListComponent } from './comments/comments-list/comments-list';
import { LikesListComponent } from './likes/likes-list/likes-list';
@NgModule({
	declarations: [PostcardComponent,
    CommentsComponent,
    CommentsListComponent,
    LikesListComponent
    ],
	imports: [],
	exports: [PostcardComponent,
    CommentsComponent,
    CommentsListComponent,
    LikesListComponent
    ]
}) 
export class ComponentsModule {}
