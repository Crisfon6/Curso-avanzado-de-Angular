import { Component, inject } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Game } from 'src/app/interfaces/game.interface';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  item$!: Observable<any>;
  firestore: Firestore = inject(Firestore);
  games = [];
  constructor(){
   const itemCollection = collection(this.firestore,'goty');
   this.item$ = collectionData(itemCollection);
   this.item$
   .pipe(map((games:Game[])=>{
    return games.map(game=>({
      name: game.name,
      value: game.votes
    }))
   }))
   .subscribe
   ((e:any)=>{this.games=e});
  //  console.log(collec);
  //  const coldata = collectionData(collec);
  //  console.log(coldata);
  //  coldata.subscribe(s=>console.log(s));
  }

}
