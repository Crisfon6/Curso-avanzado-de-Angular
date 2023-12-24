import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorsService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      'User-token': 'hola'
    });
    const reqClone = req.clone({
      headers
    });
    console.log('Pass for the interceptor');
    return next.handle(reqClone).pipe(
      catchError(this.errorHandler)
    );
  }
  errorHandler(error:HttpErrorResponse){
    return throwError('Custom error');
    }
}
