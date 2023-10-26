import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styleUrls: ['./promises.component.css'],
})
export class PromisesComponent implements OnInit {
  ngOnInit(): void {
    // this.firstExercisePromises();
    this.getUsers().then(console.log);
  }
  firstExercisePromises() {
    const promise = new Promise((resolve, reject) => {
      // setTimeout(()=> console.log('Promise'),1000); // Test promises are executed of way async
      if (false) {
        resolve('Hello world');
      } else {
        reject('Error executing promise');
      }
    });
    promise
      .then((message) => {
        console.log('Ey finished message: ', message);
      })
      .catch((message) => {
        console.error('Error executing task : ', message);
      });
    console.log('OnInit finished');
  }
  getUsers(){
    return new Promise(resolve=>{
      const url = 'https://reqres.in/api/users';
      fetch(url)
      .then(resp => resp.json())
      .then(body => resolve(body.data));
    });
  }
}
