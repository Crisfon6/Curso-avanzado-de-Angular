import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models';
import { ModalImageService, SearchService, UserService } from 'src/app/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit, OnDestroy{
  public totalUsers!:number;
  public users!: User[];
  public usersTemp !: User[];
  public from: number = 0;
  public loading = true;
  public subs!: Subscription;
  constructor(private userService:UserService,private searchService:SearchService,private modalImageService:ModalImageService){

  }
  ngOnInit(): void {
    this.getUsers();
      this.subs = this.modalImageService.newImage.subscribe(img=>{
        this.getUsers();
      });
  }
  ngOnDestroy(): void {
      this.subs.unsubscribe();
  }
  changePage(value:number){
    this.from +=value;
    if(this.from<0){
      this.from = 0;
    }
    else if(this.from>=this.totalUsers){
      this.from -=value;
    }

    this.getUsers();
  }
  getUsers(){
    this.loading = true;
    this.userService.getUsers(this.from).subscribe(({total,users})=>{
      this.totalUsers= total;
      this.users = users;
      this.usersTemp = users;
      this.loading= false;
    })
  }
  search(mean:string){
    if(mean.length==0) {this.users = this.usersTemp; return;};
    this.loading = true;
    this.searchService.search('users',mean).subscribe(data=>{
      this.users = data;
      this.loading =false;
    })
  }
  deleteUser(user:User){
    if(user.uid===this.userService.id){
      return Swal.fire('Error',"You cannot eliminate yourself.", 'error');
    }
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to rever this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result)=>{
      if(result.value){
        this.userService.deleteUser(user.uid!).subscribe(user=>{
          Swal.fire(
            'Deleted',
            'Your User has been deleted.',
            'success'
          );
          this.getUsers();
        })

      }
    });
    return;
  }
  openModal(user:User){
    this.modalImageService.openModal(user.urlImg,'users',user.uid!);
  }
  changeRole(user:User){
    this.userService.saveUser(user).subscribe(resp=>{
      console.log("user saved: ",resp);
    });
  }
}
