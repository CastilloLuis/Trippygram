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
import { PostcardComponent } from '../components/postcard/postcard';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpProvider } from '../providers/http/http';
import { ReactiveFormsModule } from "@angular/forms";
import { CameraProvider } from '../providers/camera/camera';
import { TokenProvider } from '../providers/token/token';

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
    PostcardComponent  
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
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpProvider,
    HttpClientModule,
    CameraProvider,
    TokenProvider
  ]
})
export class AppModule {}
