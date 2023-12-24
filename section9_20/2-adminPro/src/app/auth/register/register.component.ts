import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { equalsPasswords } from 'src/app/utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  formSubmitted = false;
  public registerForm = this.fb.group(
    {
      name: ['Cris', [Validators.required, Validators.minLength(3)]],
      email: ['crisfon7@gmail.com', [Validators.email, Validators.required]],
      password: ['1234', [Validators.minLength(3), Validators.required]],
      password2: ['1234', [Validators.required, Validators.minLength(3)]],
      terms: [true, [Validators.required]],
    },
    {
      validators: equalsPasswords('password', 'password2'),
    }
  );
  constructor(private fb: FormBuilder,private userService:UserService,private router:Router) {}
  createUser() {
    this.formSubmitted = true;
    if (this.registerForm.valid && this.registerForm.get('terms')!.value) {
      this.userService.createUser(this.registerForm.value).subscribe(resp=>{
        this.router.navigateByUrl('/');
      },(err)=>{
        Swal.fire('Error',err.error.msg,'error');
      });
    }
    else{
      return;
    }
  }

  invalidField(field: string): boolean {
    if (this.registerForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
  acceptTerms(): boolean {
    return !this.registerForm.get('terms')!.value && this.formSubmitted;
  }
  invalidPasswords() {
    const password1 = this.registerForm.get('password')!.value;
    const password2 = this.registerForm.get('password2')!.value;
    if (password1 !== password2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
}
