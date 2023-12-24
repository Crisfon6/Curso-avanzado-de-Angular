import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { AuthService } from "./auth.service";

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UploadsService {
  constructor(private authService:AuthService){

  }
  async updateAvatar(
    file: File,
    type: 'users' | 'doctors' | 'hospitals', id:string
  ){
    try {
      const url = `${base_url}/uploads/${type}/${id}`;
      const formData = new FormData();
      formData.append('file',file);
      const resp = await fetch(url,{
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });
      const data =  await resp.json();
      if(data.ok){
        this.authService.user.img = data.filename;
        return data;
      }else{
        return false;
      }

    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
