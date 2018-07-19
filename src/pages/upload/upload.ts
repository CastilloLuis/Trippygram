import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { HttpProvider } from '../../providers/http/http';
import { TokenProvider } from '../../providers/token/token';
import { NativeStorage } from '@ionic-native/native-storage';
import { CameraProvider } from '../../providers/camera/camera';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
  providers: [
    Camera,
    FileTransfer,
    FileTransferObject,
    HttpProvider,
    NativeStorage,
    CameraProvider,
    TokenProvider,
    Geolocation
  ]
})
export class UploadPage {

  uploadForm;
  caption: string = '';
  ht: string = '';
  tagged: string = '';
  path: string = '';
  checkedLocation: boolean;
  lat: number = null;
  long: number = null;
  loggeduser: Object = <any>{};

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaHandler: CameraProvider,
              private geolocation: Geolocation, private nativeSto: NativeStorage, private userToken: TokenProvider) {
                userToken.userToken()
                  .then((data) => this.loggeduser = data)
                  .catch((err) => console.log(err))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  choosePicture() {
    this.mediaHandler.choose();
  }

  submitForm() {
    let json = {
      userid: this.loggeduser['userid'],
      caption: this.caption,
      tagged: ((this.tagged).split(',')),
      ht: ((this.ht).split(',')),
    }
    if(this.checkedLocation) {
      this.getLocation();
      json['lat'] = this.lat,
      json['long'] = this.long
    }
    alert(this.checkedLocation)
    alert(JSON.stringify(json))
    this.mediaHandler.upload(json, true, 'upload.php');
  }

  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      alert(JSON.stringify(resp))
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
     }).catch((error) => {
       alert(`Error getting location ${error}`);
     });
  }

}
