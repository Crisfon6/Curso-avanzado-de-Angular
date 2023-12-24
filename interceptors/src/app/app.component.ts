import { Component } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'interceptors';
  constructor(private userSerice:UsersService){
    this.userSerice.getUser()
    .subscribe(resp=>{
      console.log(resp);
    },err=>{
      console.log('Error in the app component');
    })
  }


}
