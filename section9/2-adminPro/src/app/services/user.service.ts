import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { registerForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment.development';
import { LoginForm, UpdatePasswordForm, UpdateUserForm } from '../interfaces';
import { tap } from 'rxjs';
import { AuthService } from './auth.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private authService:AuthService) { }

  get token() :string{
    return localStorage.getItem('token')!;
  }
  get id():string{
    return this.authService.user.getUid || '';
  }

  createUser(formData:registerForm){
    console.log('creating users',formData);
   return this.http.post(`${base_url}/users`,formData) .pipe(
    tap((resp:any)=> localStorage.setItem('token',resp.token))
  );
  }
  updateUser(formData:UpdateUserForm){
    const headers = {'x-token': this.token};
    return this.http.put(`${base_url}/users/${this.id}`,formData,{headers})
    .pipe(
      tap((resp:any)=>{
        this.authService.user.setEmail = resp.user.email;
        this.authService.user.setName = resp.user.name;

      })
    );
  }
  updatePassword(id:string,password:UpdatePasswordForm){
    const headers = {'x-token': this.token};
    return this.http.put(`${base_url}/users/password/${this.id}`, {password},{headers});
  }
}
