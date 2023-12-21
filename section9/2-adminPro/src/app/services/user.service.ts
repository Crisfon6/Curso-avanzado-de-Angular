import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { registerForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment.development';
import {
  ListUsers,
  LoginForm,
  UpdatePasswordForm,
  UpdateUserForm,
} from '../interfaces';
import { tap, map } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../models';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  get token(): string {
    return localStorage.getItem('token')!;
  }
  get id(): string {
    return this.authService.user.uid || '';
  }
  get headers() {
    return { headers: { 'x-token': this.token } };
  }
  createUser(formData: registerForm) {
    return this.http.post(`${base_url}/users`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
        localStorage.setItem('menu',JSON.stringify( resp.menu));
      })
    );
  }
  updateUser(formData: UpdateUserForm) {
    formData = {
      ...formData,
      role: this.authService.user.role,
    };
    return this.http
      .put(`${base_url}/users/${this.id}`, formData, this.headers)
      .pipe(
        tap((resp: any) => {
          this.authService.user.email = resp.user.email;
          this.authService.user.name = resp.user.name;
        })
      );
  }
  updatePassword(id: string, password: UpdatePasswordForm) {
    return this.http.put(
      `${base_url}/users/password/${this.id}`,
      { password },
      this.headers
    );
  }

  getUsers(from: number = 0) {
    const headers = { 'x-token': this.token };
    const url = `${base_url}/users/?from=${from}`;
    return this.http.get<ListUsers>(url, this.headers).pipe(
      map((resp) => {
        const users = resp.users.map(
          (user) =>
            new User(
              user.email,
              user.name,
              user.role,
              undefined,
              user.img,
              user.google,
              user.uid
            )
        );
        resp.users = users;
        console.log('Mapped', resp);
        return resp;
      })
    );
  }
  deleteUser(uid: string) {
    return this.http.delete(`${base_url}/users/${uid}`, this.headers);
  }
  saveUser(user: User) {
    return this.http.put(`${base_url}/users/${user.uid}`, user, this.headers);
  }
}
