import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/interfaces';
import { AuthService } from 'src/app/services';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';
declare const google: any;
const { base_url, google_client_id } = environment;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('googleBtn') googleBtn!: ElementRef;
  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required]],
    password: ['1234', [Validators.required, Validators.minLength(3)]],
    remember: [false],
  });
  formSubmitted = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private ngZone:NgZone
  ) {}
  ngAfterViewInit(): void {
    this.googleInit();
  }
  googleInit() {
    google.accounts.id.initialize({
      client_id: google_client_id,
      callback: (response: any) => this.handleCredentialResponse(response),
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      {
        theme: 'outline',
        size: 'large',
      } // customization attributes
    );
    google.accounts.id.prompt();
  }
  handleCredentialResponse(response: any) {
    this.authService.loginGoogle(response.credential).subscribe(
      (r) => {
        console.log("Login response :",r);
        this.ngZone.run(()=>this.router.navigateByUrl('/')

        )
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }
  login() {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value as LoginForm).subscribe(
        (resp) => {
          if (this.loginForm.get('remember')!.value) {
            localStorage.setItem(
              'email',
              this.loginForm.get('email')!.value as string
            );
          } else {
            localStorage.removeItem('email');
          }
          this.router.navigateByUrl('/');
        },
        (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      );
    }
    // this.router.navigateByUrl('/dashboard');
  }
  invalidField(field: string): boolean {
    if (this.loginForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
}
