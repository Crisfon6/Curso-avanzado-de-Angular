import { Component } from '@angular/core';
import { AuthService, SidebarService } from 'src/app/services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {
  menuItems: any[];
  constructor(private sidebarService:SidebarService,private authService: AuthService){
    this.menuItems = sidebarService.menu;
  }
  logout(){
    this.authService.logout();
  }
}
