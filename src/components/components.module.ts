import { NgModule } from '@angular/core';
import { PostcardComponent } from './postcard/postcard';
import { CommentsComponent } from './comments/box/comments';
import { CommentsListComponent } from './comments/comments-list/comments-list';
import { LikesListComponent } from './likes/likes-list/likes-list';
import { FollowbuttonComponent } from './buttons/followbutton/followbutton';
@NgModule({
	declarations: [PostcardComponent,
    CommentsComponent,
    CommentsListComponent,
    LikesListComponent,
    FollowbuttonComponent
    ],
	imports: [],
	exports: [PostcardComponent,
    CommentsComponent,
    CommentsListComponent,
    LikesListComponent,
    FollowbuttonComponent
    ]
}) 
export class ComponentsModule {}
