import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { UserProvider } from '../../providers/http/user/user';
import { TokenProvider } from '../../providers/token/token';
import { NativeStorage } from '@ionic-native/native-storage';
import { CameraProvider } from '../../providers/camera/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { DashboardPage } from '../dashboard/dashboard';
import { environment as ENV } from '../../environments/enviroment';

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
  providers: [
    Camera,
    FileTransfer,
    FileTransferObject,
    UserProvider,
    NativeStorage,
    CameraProvider,
    TokenProvider,
    Geolocation
  ]
})
export class UploadPage {

  caption: string = '';
  ht: string = '';
  tagged: string = '';
  path: string = '';
  checkedLocation: boolean;
  lat: number = null;
  long: number = null;
  loggeduser: Object = <any>{};
  dashboard = DashboardPage;
  local = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaHandler: CameraProvider,
              private geolocation: Geolocation, private nativeSto: NativeStorage, private userToken: TokenProvider,
              private loading: LoadingController) {
                userToken.userToken()
                  .then((data) => this.loggeduser = data)
                  .catch((err) => console.log(err));

                this.local = ENV.BASE_URL;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
    this.caption = '';
    this.ht = '';
    this.tagged = '';
    this.path = '';
    this.checkedLocation = false;
    this.lat = null;
    this.long = null;    
  }

  choosePicture() {
    this.mediaHandler.choose();
  }

  submitForm() {
    const loader = this.showLoader();
    loader.present();
    let json = {
      userid: this.loggeduser['userid'],
      caption: this.caption,
      tagged: ((this.tagged).split(',')),
      ht: ((this.ht).split(',')),
    }
    if(this.checkedLocation) {
      this.getLocation()
        .then((pos: any) => {
          json['lat'] = pos.latitude;
          json['long'] = pos.longitude;
          // alert(this.checkedLocation);
          // alert(JSON.stringify(json));
          this.mediaHandler.upload(json, true, 'upload.php');
          loader.dismiss();
          loader.onDidDismiss(() => this.navCtrl.setRoot(this.dashboard));
        })
    }
  }

  getLocation() {
    return new Promise((res, rej) => {
      this.geolocation.getCurrentPosition({timeout: 20000})
        .then((pos) => res(pos.coords))
        .catch((error) => rej(error));    
    });
  }

  showLoader() {
    const loading = this.loading.create({
      content: 'Uploading...',
      spinner: 'dots'
    });
    return loading;  
  }

}
