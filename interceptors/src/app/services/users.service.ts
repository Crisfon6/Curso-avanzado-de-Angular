import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  getUser(){
    let params = new HttpParams().append('page','1');
    params = params.append('name','cris');

   return this.http.get('https://reqres.xin/api/res',{params})
   .pipe(
    map((resp:any)=>resp.data),
    //catchError(this.errorHandler)
    )
   ;
  }

}
