import { Injectable, NgZone } from '@angular/core';
import { LoginForm, LoginResponse } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models';

declare const google: any;
const { base_url } = environment;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user!: User;
  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {}
  login(formData: LoginForm) {
    console.log('Logging user', formData);
    return this.http
      .post(`${base_url}/login`, formData)
      .pipe(tap((resp: any) => localStorage.setItem('token', resp.token)));
  }
  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem('email', resp.email);
        localStorage.setItem('token', resp.token);
      })
    );
  }

  validateToken() {
    const token = localStorage.getItem('token') || '';
    return this.http
      .get(`${base_url}/login/renew`, {
        headers: { 'x-token': token },
      })
      .pipe(
        map((resp: any) => {
          const loginResponse: LoginResponse = resp;
          const { name, email, role, google, img='', uid } = loginResponse.user;
          this.user = new User(email, name, role, '', img, google, uid);
          localStorage.setItem('token', resp.token);
          return true;
        }),
        catchError((error) => {
          console.log(error);
          return of(false);
        })
      );
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
    const email = localStorage.getItem('email');
    if (email) {
      google.accounts.id.revoke(email, () => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/login');
        });
      });
    }
  }
}
