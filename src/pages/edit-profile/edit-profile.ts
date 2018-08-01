import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { UserProvider } from '../../providers/http/user/user';
import { NativeStorage } from '@ionic-native/native-storage';
import { CameraProvider } from '../../providers/camera/camera';
import { TokenProvider } from '../../providers/token/token';
import { environment as ENV } from '../../environments/enviroment';
@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
  providers: [
    Camera,
    FileTransfer,
    FileTransferObject,
    UserProvider,
    NativeStorage,
    CameraProvider,
    TokenProvider
  ]
})
export class EditProfilePage {

  profileData = <any>{};
  updateForm; 
  avatarImage: string = '';
  path: string = '';
  loggeduser = <any>{};
  local = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
              private camera: Camera, private cameraMenu: ActionSheetController, private transfer: FileTransfer,
              private http: UserProvider, private nativeSto: NativeStorage, private mediaHandler: CameraProvider,
              private userToken: TokenProvider, private loading: LoadingController) {
                console.log(navParams.get('data'));
                userToken.userToken()
                  .then((data) => this.loggeduser = data)
                  .catch((err) => console.log(err))
                this.profileData = navParams.get('data');
                this.initReactiveForm();
                this.local = `${ENV.BASE_URL}/`;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  submitForm() {
    const loader = this.showLoader();
    loader.present();
    this.updateForm.value['userid'] = this.loggeduser['userid'];
    // alert(this.loggeduser['userid']);
    // alert(this.mediaHandler.getBase64())
    if((this.mediaHandler.getBase64()).length === 0) {
      this.updateForm.value['haveAvatar'] = false;
      // alert('okaa');
      this.http.userEditProfile('updateUser.php', this.updateForm.value)
        .subscribe((res) => {
          // alert('oka')
          loader.dismiss();
          console.log('Error-> '+(alert(JSON.stringify(res))))
        },
        (err) => alert(JSON.stringify(err)));
        //alert((this.updateForm.value))
    } else {
      this.updateForm.value['haveAvatar'] = true;
      //this.upload(this.avatarImage);
      this.mediaHandler.upload(this.updateForm.value, false, 'updateUser.php');
      loader.dismiss();
      //alert((this.updateForm.value))
    }
  }

  chooseAvatar() {
    this.mediaHandler.choose();
  }

  initReactiveForm() {
    this.updateForm = new FormGroup({
      name: new FormControl(this.profileData['name'], [Validators.required]),
      email: new FormControl(this.profileData['email'], [Validators.required, Validators.email]),
      username: new FormControl(this.profileData['username'], [Validators.required]),
      password: new FormControl("", [Validators.required]),
      biography: new FormControl(this.profileData['biography'], [Validators.required])
    });   
  }

  showLoader() {
    const loading = this.loading.create({
      content: 'Uploading...',
      spinner: 'dots'
    });
    return loading;  
  }

  closeit() {
    this.viewCtrl.dismiss();
  }

}
