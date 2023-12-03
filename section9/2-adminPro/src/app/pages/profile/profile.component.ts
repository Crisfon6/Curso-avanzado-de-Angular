import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UploadsService, UserService } from 'src/app/services';
import Swal from 'sweetalert2';
import { equalsPasswords } from 'src/app/utils';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent {
  public profileForm!: FormGroup;
  // profileForm = this.fb.group({
  //   username: ['getName', Validators.required],
  //   email: ['getEmail', [Validators.required, Validators.email]],
  // });
  public passwordForm!: FormGroup;
  public avatarForm!: FormGroup;

  public token!: string;
  public fileAvatar!:File;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private uploadService:UploadsService
  ) {
    this.initForms();
  }
  initForms() {
    //user form init
    this.userFormInit();
    this.passwordFormInit();
    this.avatarFormInit();
  }
  get googleSigned(){
    return this.authService.user.google;
  }
  userFormInit() {
    const { email, name } = this.authService.user;

    this.profileForm = this.fb.group({
      name: [name, Validators.required],
      email: [email, [Validators.required, Validators.email]],
    });
  }
  passwordFormInit() {
    this.passwordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: equalsPasswords('password', 'confirmPassword'),
      }
    );
  }
  avatarFormInit() {
    const { urlImg } = this.authService.user;
    this.avatarForm = this.fb.group({
      img: [urlImg],
    });
  }
  updateProfile() {
    this.userService.updateUser(this.profileForm.value).subscribe(
      (e) => {
        Swal.fire('Success', 'User Updated', 'success');
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }
  updatePassword() {
    this.userService
      .updatePassword(
        this.authService.user.uid!,
        this.passwordForm.value.password
      )
      .subscribe(
        (_) => {
          Swal.fire('Success', 'Password updated', 'success');
        },
        (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      );
  }
  updateAvatar(){
    this.uploadService.updateAvatar(this.fileAvatar,'users', this.authService.user.uid!)
    .then(img=>{
      // this.authService.user.setUrlImg(img)
      Swal.fire('Success','Updated image','success');
    })
    .catch(err=>{
      Swal.fire('Error','Updated image','error');
    });
  }
  onImgSelected(event: any) {
    const file: File = event.target.files[0];
    if(!file) return;
    this.fileAvatar = file;
    let reader = new FileReader();

    reader.onload = (e) => {
      // get the dataUrl
      let dataUrl = e.target?.result;
      // DO something with tht dataURl
      this.avatarForm.get('img')?.setValue(dataUrl);
    };
    reader.readAsDataURL(file);
  }

}
