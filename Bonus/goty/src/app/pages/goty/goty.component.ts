import { Component } from '@angular/core';
import { Game } from 'src/app/interfaces/game.interface';
import { GameService } from 'src/app/services/game.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styleUrls: ['./goty.component.css']
})
export class GotyComponent {
  games!: Game[];

  constructor(private gameService:GameService){
    this.gameService.getGames()
    .subscribe(games=> {
      this.games = games;
    })
  }
  vote(id:string){
    this.gameService.vote(id).subscribe((vote:any)=>{
      if(vote.ok){
        Swal.fire('Sucess',vote.msg,'success');
      }
      else{
        Swal.fire('Error',vote.msg,'error');
      }
    });
  }

}
