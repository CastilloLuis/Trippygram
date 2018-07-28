import { NgModule } from '@angular/core';
import { PostcardComponent } from './postcard/postcard';
import { CommentsComponent } from './comments/box/comments';
import { CommentsListComponent } from './comments/comments-list/comments-list';
import { LikesListComponent } from './likes/likes-list/likes-list';
import { FollowbuttonComponent } from './buttons/followbutton/followbutton';
import { DeletebuttonComponent } from './buttons/deletebutton/deletebutton';
import { PreviewcommentsComponent } from './comments/previewcomments/previewcomments';
import { FollowlistComponent } from './profile/followlist/followlist';
@NgModule({
	declarations: [PostcardComponent,
    CommentsComponent,
    CommentsListComponent,
    LikesListComponent,
    FollowbuttonComponent,
    DeletebuttonComponent,
    PreviewcommentsComponent,
    FollowlistComponent
    ],
	imports: [],
	exports: [PostcardComponent,
    CommentsComponent,
    CommentsListComponent,
    LikesListComponent,
    FollowbuttonComponent,
    DeletebuttonComponent,
    PreviewcommentsComponent,
    FollowlistComponent
    ]
}) 
export class ComponentsModule {}
