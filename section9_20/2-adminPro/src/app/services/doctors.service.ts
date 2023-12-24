import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Doctor } from '../models';
import { Observable, map } from 'rxjs';

const {base_url} = environment;
@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  constructor(private http:HttpClient) { }

  get token(){
    return localStorage.getItem('token');
  }
  get headers(){
    return {headers:{'x-token': this.token!}};
  }
  getDoctors(){
    const url = `${base_url}/doctors`;
    return this.http.get<Doctor[]>(url, this.headers)
    .pipe(map((resp:any)=>resp.doctors));
  }
  createDoctor(data :{name:string,hospital:string}){
    const url = `${base_url}/doctors`;
    return this.http.post(url,data, this.headers)
  }
  updateDoctor(id:string,data :{name:string,hospital:string}){
    const url = `${base_url}/doctors/${id}`;
    return this.http.put(url,data, this.headers)
  }
  deleteDoctor(id:string){
    const url = `${base_url}/doctors/${id}`;
    return this.http.delete(url, this.headers)
  }
  getDoctorById(id:string){
    const url = `${base_url}/doctors/${id}`;
    return this.http.get<{ok:boolean,doctor:Doctor}>(url, this.headers);
  }
}
