import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor, Hospital, User } from 'src/app/models';
import { SearchService } from 'src/app/services';

@Component({
  selector: 'app-searchs',
  templateUrl: './searchs.component.html',
  styleUrls: ['./searchs.component.css']
})
export class SearchsComponent implements OnInit{
  constructor(private activateRoute:ActivatedRoute,
    private searchService:SearchService,
    private router:Router){}
    users:User[] = [];
    hospitals:Hospital[]= [];
    doctors:Doctor[] = [];
  ngOnInit(): void {
      this.search();
  }
  search(){
    this.activateRoute.params.subscribe(({mean})=>{
      if(mean && mean.trim().length>0){
        this.searchService.searchAll(mean).subscribe(results=>{
          console.log(results);
          this.hospitals= results.hospitals;
          this.doctors = results.doctors;
          this.users = results.users;
        })
      }
      else{
        this.router.navigateByUrl('/dashboard');
      }
    })
  }
  openDoctor(doctor:Doctor){
    this.router.navigateByUrl(`/dashboard/doctor/${doctor._id}`);
  }
}
