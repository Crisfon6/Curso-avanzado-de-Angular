import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Game } from '../interfaces/game.interface';
import { catchError, map, of, tap } from 'rxjs';

const baseUrl = environment.api;
@Injectable({
  providedIn: 'root'
})
export class GameService {
  games: Game[]=[];
  constructor(private http:HttpClient) { }

  getGames(){
    if(this.games.length===0){
      return this.http.get<Game[]>(`${baseUrl}/goty`)
      .pipe(map((games:any)=>games.games),
      tap(games=>this.games=games));
    }
    else{
      return of(this.games);
    }
  }
  vote(id:string){
    return this.http.post(`${baseUrl}/goty/${id}`,{})
    .pipe(
      catchError((err:any)=>{
        console.log(err);
        return of(
          err.error
        );
      })
    )
    ;
  }
}
