import { Injectable, NgZone } from '@angular/core';
import { LoginForm } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
declare const google: any;
const { base_url } = environment;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router,private ngZone:NgZone) {}

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
        tap((resp: any) => localStorage.setItem('token', resp.token)),
        map((resp) => true),
        catchError((error) => of(false))
      );
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
    const email = localStorage.getItem('email');
    if(email){
      google.accounts.id.revoke(email, () => {
        this.ngZone.run(()=>{
          this.router.navigateByUrl('/login');
        })
      });
    }
  }

}
