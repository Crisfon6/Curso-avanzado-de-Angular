import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: [
  ]
})
export class DonutComponent implements OnInit{
  @Input() title = '';
  @Input() data: number[]=[200,540,300];
  @Input() labels : string[] = ['Virus', 'Artificial intelligence','Space travels'];
  @Input() backgroundColor: string[]=  ['#6857E6','#009FEE','#F02059'];

  public doughnutChartData!: ChartData<'doughnut'> ;

  ngOnInit(): void {
  this.initGraph();
  }
  initGraph(){
    this.doughnutChartData = {
      labels : this.labels,
      datasets :[
        {
          data : this.data,
          backgroundColor: this.backgroundColor
          }
      ]
    }
  }
   charOptions = {
    resposive: true,
    maintainAspectRatio: false
  };
  public doughnutChartType: ChartType = 'doughnut';
    // events
    public chartClicked({
      event,
      active,
    }: {
      event: ChartEvent;
      active: object[];
    }): void {
      console.log(event, active);
    }

    public chartHovered({
      event,
      active,
    }: {
      event: ChartEvent;
      active: object[];
    }): void {
      console.log(event, active);
    }
}
