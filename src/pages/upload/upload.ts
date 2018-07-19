import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CameraProvider } from '../../providers/camera/camera';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { HttpProvider } from '../../providers/http/http';
import { NativeStorage } from '@ionic-native/native-storage';
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
              private geolocation: Geolocation, private nativeSto: NativeStorage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
    this.nativeSto.getItem('loggeduser')
      .then(
        (data) => this.loggeduser = data,
        (err) => alert('error: ' + err)
      ).catch((err) => alert('error2: ' + err));    
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
    console.log(this.checkedLocation)
    console.log(json)
    this.mediaHandler.upload(json, true, 'upload.php');
  }

  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
     }).catch((error) => {
       alert(`Error getting location ${error}`);
     });
  }

}
