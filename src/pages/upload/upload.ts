import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CameraProvider } from '../../providers/camera/camera';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { HttpProvider } from '../../providers/http/http';
import { NativeStorage } from '@ionic-native/native-storage';

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
    CameraProvider    
  ]
})
export class UploadPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaHandler: CameraProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  choosePicture() {
    //this.mediaHandler.choose();
    alert('xd')
  }

  submitForm() {

  }

}
