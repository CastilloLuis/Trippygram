import { Injectable } from '@angular/core';
import { HttpProvider } from '../http/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { ActionSheetController } from 'ionic-angular';
/*
  Generated class for the CameraProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CameraProvider {

  profileData = <any>{};
  updateForm; 
  image: string = '';
  path: string = '';
  local = 'http://192.168.1.6:80/trippygram';

  constructor(private camera: Camera, private cameraMenu: ActionSheetController, private transfer: FileTransfer,
              private http: HttpProvider) {
    console.log('Hello CameraProvider Provider');
  }

  choose() {
    const menu = this.cameraMenu.create({
      title: 'Select your option',
      buttons: [
        {
          text: 'Take picture',
          handler: () => {
            this.cameraOp(1)
          }
        },{
          text: 'Select picture',
          handler: () => this.cameraOp(0)         
        }
      ]
    });
    menu.present();
  }

  upload(form: any, isPost: boolean, url: any) {
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
       fileKey: 'file',
       fileName: this.generateName(form.username, isPost),
       chunkedMode: false,
       mimeType: "image/jpeg",
       headers: {},
       params: {data: form}
    }
    fileTransfer.upload(this.image, `${this.local}/api/api/uploadFile.php`, options)
     .then((data) => { 
       let path = (JSON.parse(data.response)).path;
       this.path = path;
       form.path = this.path;
       // alert(JSON.stringify(form.value))
       this.http.fetch(form, 'POST', url)
        .subscribe((res) => {
          alert('asdasdasdas'+JSON.stringify(res))
        },
        (err) => alert('xdxd'+JSON.stringify(err)))
    })
    .catch(err => alert('xdxd22'+JSON.stringify(err)))
  }

  cameraOp(sourceType:number) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType:sourceType,
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.image = base64Image;
      // alert(this.avatarImage);
      // this.upload(this.avatarImage);

    }, (err) => {
      // Handle error
      alert(JSON.stringify(err))
    });
  }

  getBase64() {
    // alert(this.avatarImage)
    return this.image;
  }

  generateName(username: string, isPost: boolean) {
    let randomNum = Math.random() * (153462458942 - 1253) + 1732;
    return ((isPost) ? `${username}_post_${randomNum}.jpg` : `${username}_avatar_${randomNum}.jpg`);
  }  

}
