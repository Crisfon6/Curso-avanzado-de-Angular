import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../models';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http:HttpClient) { }
  get token() :string{
    return localStorage.getItem('token')!;
  }
  get headers(){
    return {headers:{'x-token': this.token}};
  }
  transformUsers(resp:any) : User[]{
    return resp.data.map((user:any)=> new User(user.email,user.name,user.role,undefined,user.img,user.google,user.uid));
  }
  search(type: 'users' | 'doctors' | 'hospitals',mean:string){
    const url = `${base_url}/search/${type}/${mean}`;
    return this.http.get(url,this.headers)
    .pipe(
      map((resp:any)=>{
        switch(type){
          case 'users':
            return this.transformUsers(resp);
            break;

          default:
            return resp.data;
          break;
        }

      })
    )
  }
}
