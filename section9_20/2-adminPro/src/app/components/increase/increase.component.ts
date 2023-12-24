import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-increase',
  templateUrl: './increase.component.html',
  styles: [
  ]
})
export class IncreaseComponent implements OnInit {

  @Input('startValue') progress = 0;
  @Input() btnClass: string = "btn btn-primary";
  @Output() progressOutput =  new EventEmitter<number>();

  invalidPogress: boolean = false;

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  changeValue(value: number) {
    if (this.progress >= 100 && value > 0) {
      this.progress = 100;
      this.progressOutput.emit(100);
      return;
    }
    if (this.progress <= 0 && value < 0) {
      this.progress = 0;
      this.progressOutput.emit(0);
      return;
    }
    this.progress += value;
    this.progressOutput.emit(this.progress);
  }
  onChange(newProgress:number){
    if(newProgress>=100){
      this.progress = 100;
      this.invalidPogress  =true;
    }else if(newProgress<=0){
      this.invalidPogress  =true;
      this.progress = 0;
    }
    else{
      this.invalidPogress  = false;
      this.progress = newProgress;
    }
    this.progressOutput.emit(this.progress);
  }
}
