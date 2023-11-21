import { Component } from '@angular/core';
import { User } from 'src/app/models';
import { AuthService, SidebarService } from 'src/app/services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {
  menuItems: any[];
  user!:User;
  constructor(private sidebarService:SidebarService,private authService: AuthService){
    this.menuItems = sidebarService.menu;
    this.user = this.authService.user;
  }
  logout(){
    this.authService.logout();
  }
}
