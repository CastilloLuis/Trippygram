import { HttpClient } from '@angular/common/http';
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
  avatarImage: string = '';
  path: string = '';
  loggeduser = <any>{};
  local = 'http://192.168.1.3:80/trippygram/';
  currentavatar: string = '';

  constructor(private camera: Camera, private cameraMenu: ActionSheetController, private transfer: FileTransfer,
              private http: HttpProvider) {
    console.log('Hello CameraProvider Provider');
  }

  chooseAvatar() {
    const menu = this.cameraMenu.create({
      title: 'Select your option wey',
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

  upload(form: any) {
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
       fileKey: 'file',
       fileName: this.generateAvatarName(form.value.username),
       chunkedMode: false,
       mimeType: "image/jpeg",
       headers: {},
       params: {data: form.value}
    }
    fileTransfer.upload(this.avatarImage, 'http://192.168.1.3:80/trippygram/api/api/uploadFile.php', options)
     .then((data) => {
       let path = (JSON.parse(data.response)).path;
       this.path = path;
       form.value.path = this.path;
       // alert(JSON.stringify(form.value))
       this.http.fetch(form.value, 'POST', 'updateUser.php')
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
      this.avatarImage = base64Image;
      // alert(this.avatarImage);
      // this.upload(this.avatarImage);

    }, (err) => {
      // Handle error
      alert(JSON.stringify(err))
    });
  }

  getBase64() {
    // alert(this.avatarImage)
    return this.avatarImage;
  }

  generateAvatarName(username: string) {
    let randomNum = Math.random() * (153462458942 - 1253) + 1732;
    return `${username}_ava_${randomNum}.jpg`;
  }  

}
