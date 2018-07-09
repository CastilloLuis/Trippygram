import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
  providers: [
    Camera
  ]
})
export class EditProfilePage {

  profileData: Object = {};
  updateForm; 
  avatarImage: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
              private camera: Camera, private cameraMenu: ActionSheetController) {
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
    console.log(this.updateForm.value)
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
          console.log('selecting picture')
          }          
        }
      ]
    });
    menu.present();
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
      alert(this.avatarImage);
    }, (err) => {
      // Handle error
    });
  }



  closeit() {
    this.viewCtrl.dismiss();
  }

}
