import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ActivityPage } from '../pages/activity/activity';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { SearchPage } from '../pages/search/search';
import { UploadPage } from '../pages/upload/upload';
import { PostPage } from '../pages/post/post';
import { ProfilePage } from '../pages/profile/profile';
import { ListPage } from '../pages/list/list';

import { PostcardComponent } from '../components/postcard/postcard';
import { CommentsComponent } from '../components/comments/box/comments';
import { CommentsListComponent } from '../components/comments/comments-list/comments-list';
import { LikesListComponent } from '../components/likes/likes-list/likes-list';
import { FollowbuttonComponent } from '../components/buttons/followbutton/followbutton';
import { DeletebuttonComponent } from '../components/buttons/deletebutton/deletebutton';
import { PreviewcommentsComponent } from '../components/comments/previewcomments/previewcomments';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UserProvider } from '../providers/http/user/user';
import { AuthProvider } from '../providers/http/auth/auth';
import { PostProvider } from '../providers/http/post/post';
import { TokenProvider } from '../providers/token/token';
import { CameraProvider } from '../providers/camera/camera';

import { ReactiveFormsModule } from "@angular/forms";
import { AgmCoreModule } from '@agm/core';
import { DateFnsModule } from 'ngx-date-fns';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    DashboardPage,
    ActivityPage,
    EditProfilePage,
    LoginPage,
    RegisterPage,
    SearchPage,
    UploadPage,
    PostPage,
    ProfilePage,
    ListPage,
    PostcardComponent ,
    CommentsComponent,
    CommentsListComponent,
    LikesListComponent,
    FollowbuttonComponent,
    DeletebuttonComponent,
    PreviewcommentsComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ReactiveFormsModule, 
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyABL10rVzKJzz95UMOp1Jy6mkpMMGsRGAg'
    }),
    DateFnsModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    DashboardPage,
    ActivityPage,
    EditProfilePage,
    LoginPage,
    RegisterPage,
    SearchPage,
    UploadPage,
    PostPage,
    ProfilePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    AuthProvider,
    PostProvider,
    HttpClientModule,
    CameraProvider,
    TokenProvider,
    PostProvider
  ]
})
export class AppModule {}
