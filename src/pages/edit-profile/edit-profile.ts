import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { HttpProvider } from '../../providers/http/http';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
  providers: [
    Camera,
    FileTransfer,
    FileTransferObject,
    HttpProvider
  ]
})
export class EditProfilePage {

  profileData = <any>{};
  updateForm; 
  avatarImage: string = '';
  path: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
              private camera: Camera, private cameraMenu: ActionSheetController, private transfer: FileTransfer,
              private http: HttpProvider) {
    console.log(navParams.get('data'));
    this.profileData = navParams.get('data');
    this.updateForm = new FormGroup({
      name: new FormControl(this.profileData['name'], [Validators.required]),
      email: new FormControl(this.profileData['email'], [Validators.required, Validators.email]),
      username: new FormControl(this.profileData['username'], [Validators.required]),
      password: new FormControl("", [Validators.required]),
      biography: new FormControl(this.profileData['biography'], [Validators.required])
    });    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  submitForm() {
    console.log('asdasd');
    this.updateForm.value['userid'] = 1;
    if(this.avatarImage.length === 0) {
      this.updateForm.value['haveAvatar'] = false;
      alert('okaa');
      this.http.fetch(this.updateForm.value, 'POST', 'updateUser.php')
        .subscribe((res) => {
          alert('oka')
          console.log('asdas'+(JSON.stringify(res)))
        },
        (err) => console.log(JSON.stringify(err)));
        //alert((this.updateForm.value))
    } else {
      this.updateForm.value['haveAvatar'] = true;
      this.upload(this.avatarImage);
      //alert((this.updateForm.value))
    }
  }

  chooseAvatar() {
    const menu = this.cameraMenu.create({
      title: 'Select your option wey',
      buttons: [
        {
          text: 'Take picture',
          handler: () => {
          this.cameraOp(1);
          console.log('taking picture')
          }
        },{
          text: 'Select picture',
          handler: () => {
          this.cameraOp(0);
          console.log('selecting picture');
          }          
        }
      ]
    });
    menu.present();
  }

  upload(avatar: any) {
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
       fileKey: 'file',
       fileName: this.generateAvatarName(this.updateForm.value.username),
       chunkedMode: false,
       mimeType: "image/jpeg",
       headers: {},
       params: {data: this.updateForm.value}
    }
    fileTransfer.upload(avatar, 'http://192.168.1.105:80/trippygram/api/api/uploadFile.php', options)
     .then((data) => {
       let path = (JSON.parse(data.response)).path;
       this.path = path;
       this.updateForm.value.path = this.path;
       alert(JSON.stringify(this.updateForm.value))
       this.http.fetch(this.updateForm.value, 'POST', 'updateUser.php')
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

  generateAvatarName(username: string) {
    let randomNum = Math.random() * (153462458942 - 1253) + 1732;
    return `${username}_ava_${randomNum}.jpg`;
  }

  closeit() {
    this.viewCtrl.dismiss();
  }

}
