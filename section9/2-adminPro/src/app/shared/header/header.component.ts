import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  private authService = inject(AuthService);
  logout() {
    console.log('logout');
    this.authService.logout();
  }
}
