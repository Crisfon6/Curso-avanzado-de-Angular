import { Component, OnDestroy } from '@angular/core';
import { Observable, retry, interval, take, map,filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnDestroy {

  intervalSubs !: Subscription;

  constructor(){
  //  this.returnObservable().subscribe(val=>{console.log('Subscribe: ',val);},
  //   err=>{console.warn('error: ',err)},
  //   ()=>console.info('Completed'));
  // this.firstReturnInterval().subscribe(console.log);
  this.intervalSubs = this.secondReturnInterval().subscribe(console.log);

  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }
  firstReturnInterval(): Observable<string>{
    return interval(1000)
    .pipe(
      filter(val=>val%2===0),
      take(4),
      map(val=>`the current value is: ${val}`)
    );
  }

  secondReturnInterval(): Observable<string>{
    return interval(100)
    .pipe(
      filter(val=>val%2===0),
      // take(4),
      map(val=>`the current value is: ${val}`)
    );
  }
  observablesFirstExercise(){
    let i = -1;
    const obs$ = new Observable<number>(observer=>{
     const interval = setInterval(()=>{
        observer.next(i++);
        if(i===4){
          clearInterval(interval);
          observer.complete();
        }
        if(i===2){
          observer.error('i is 2');
        }
      },1000)
    });
    obs$.pipe(
      retry()
    ).subscribe(val=>{console.log('Subscribe: ',val);},
    err=>{console.warn('error: ',err)},
    ()=>console.info('Completed'));
  }
  returnObservable() : Observable<number>{
    let i = -1;
    const obs$ = new Observable<number>(observer=>{
      const interval = setInterval(()=>{
         observer.next(i++);
         if(i===4){
           clearInterval(interval);
           observer.complete();
         }
        //  if(i===2){
        //    observer.error('i is 2');
        //  }
       },1000)
     });
     return obs$;
  }
}
