import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( ) {
    console.log('Servicio de autenticación listo para usar!!!')
   }
}
