import { Component, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-chart-bar-horizontal',
  templateUrl: './chart-bar-horizontal.component.html',
  styleUrls: ['./chart-bar-horizontal.component.css']
})
export class ChartBarHorizontalComponent implements OnDestroy {
  @Input() results: any[] = [];
//   results: any[] = [{
//     "name": "Game 1",
//     "value": 8940000
//   },
//   {
//     "name": "Game 2",
//     "value": 5000000
//   },
//   {
//     "name": "Game 3",
//     "value": 7200000
//   },
//   {
//     "name": "Game 4",
//     "value": 7200000
//   },
// ];
  view: [number,number] = [700, 400];
  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
   gradient: boolean = true;
   showLegend: boolean = true;
   showXAxisLabel: boolean = true;
   yAxisLabel: string  = 'Games';
  showYAxisLabel: boolean = true;

  xAxisLabel: string = 'Votes';
  colorScheme ='nightLights'// { domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] };
  interval!:any;
     constructor() {

    // this.interval =   setInterval(()=>{
    //     const newResults = [...this.results];
    //     for (let i in newResults) {
    //       const randomNumber = Math.round(Math.random()*500);
    //      newResults[i].value = randomNumber;
    //     }
    //     this.results = [...newResults];
    //   },1500);

    }
  ngOnDestroy(): void {
    // clearInterval(this.interval);
  }

    onSelect(data:any): void {
      console.log('Item clicked', JSON.parse(JSON.stringify(data)));
     }
  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }
  onDeactivate(data:any): void { console.log('Deactivate', JSON.parse(JSON.stringify(data))); }
}
