import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { InputTextBasicComponent } from '../input-text-basic/input-text-basic.component';

@Component({
  selector: 'app-input-date-basic',
  templateUrl: './input-date-basic.component.html',
  styleUrls: ['./input-date-basic.component.less']
})
export class InputDateBasicComponent extends InputTextBasicComponent implements OnInit, OnChanges {

  date: string;

  constructor() { 
    super();
  }

  ngOnInit(): void {
    this.date = this.default;
  }


  ngOnChanges(changes: SimpleChanges) {
    console.log(' ')
    console.log(' this.default ')
    console.log(this.default)
    console.log(' ')
    this.date = this.default;
}

}
