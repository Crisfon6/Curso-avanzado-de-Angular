import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router:Router){
    this.user = this.authService.user;
  }
  logout() {
    console.log('logout');
    this.authService.logout();
  }
  search(mean:string){
    this.router.navigateByUrl(`/dashboard/search/${mean}`)
  }
}
