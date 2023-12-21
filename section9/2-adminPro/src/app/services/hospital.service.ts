import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Hospital } from '../models/hospital.model';
import { map } from 'rxjs';

const {base_url} = environment;
@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http:HttpClient) { }

  get token(){
    return localStorage.getItem('token');
  }
  get headers(){
    return {headers:{'x-token': this.token!}};
  }
  getHospitals(){
    const url = `${base_url}/hospitals`;
    // return this.http.get<{ok:boolean,hospitals:Hospital[]}>(url, this.headers)
    return this.http.get<Hospital[]>(url, this.headers)
    .pipe(map((resp:any)=>resp.hospitals));
  }
  createHopital(name:string){
    const url = `${base_url}/hospitals`;
    return this.http.post(url,{name}, this.headers)
  }
  updateHopital(id:string,name:string){
    const url = `${base_url}/hospitals/${id}`;
    return this.http.put(url,{name}, this.headers)
  }
  deleteHopital(id:string){
    const url = `${base_url}/hospitals/${id}`;
    return this.http.delete(url, this.headers)
  }
}
