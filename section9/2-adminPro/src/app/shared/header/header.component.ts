import { Component, inject } from '@angular/core';
import { User } from 'src/app/models';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  private authService = inject(AuthService);
  user!:User;
  constructor(){
    this.user = this.authService.user;
  }
  logout() {
    console.log('logout');
    this.authService.logout();
  }
}
