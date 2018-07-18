import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { HttpProvider } from '../../providers/http/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { CameraProvider } from '../../providers/camera/camera';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
  providers: [
    Camera,
    FileTransfer,
    FileTransferObject,
    HttpProvider,
    NativeStorage,
    CameraProvider
  ]
})
export class EditProfilePage {

  profileData = <any>{};
  updateForm; 
  avatarImage: string = '';
  path: string = '';
  loggeduser = <any>{};
  local = 'http://192.168.1.3:80/trippygram/';

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
              private camera: Camera, private cameraMenu: ActionSheetController, private transfer: FileTransfer,
              private http: HttpProvider, private nativeSto: NativeStorage, private mediaHandler: CameraProvider) {
    console.log(navParams.get('data'));

    this.nativeSto.getItem('loggeduser')
      .then(
        (data) => this.loggeduser = data,
        (err) => alert('error: ' + err)
      ).catch((err) => alert('error2: ' + err));  

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
    this.updateForm.value['userid'] = this.loggeduser['userid'];
    alert(this.loggeduser['userid']);
    // alert(this.mediaHandler.getBase64())
    if((this.mediaHandler.getBase64()).length === 0) {
      this.updateForm.value['haveAvatar'] = false;
      alert('okaa');
      this.http.fetch(this.updateForm.value, 'POST', 'updateUser.php')
        .subscribe((res) => {
          alert('oka')
          console.log('asdas'+(alert(JSON.stringify(res))))
        },
        (err) => console.log(alert(JSON.stringify(err))));
        //alert((this.updateForm.value))
    } else {
      this.updateForm.value['haveAvatar'] = true;
      //this.upload(this.avatarImage);
      this.mediaHandler.upload(this.updateForm, false);
      //alert((this.updateForm.value))
    }
  }

  chooseAvatar() {
    this.mediaHandler.choose();
  }

  closeit() {
    this.viewCtrl.dismiss();
  }

}
