import { Component, OnInit } from '@angular/core';
import { InputTextBasicComponent } from '../input-text-basic/input-text-basic.component';

@Component({
  selector: 'app-input-date-basic',
  templateUrl: './input-date-basic.component.html',
  styleUrls: ['./input-date-basic.component.less']
})
export class InputDateBasicComponent extends InputTextBasicComponent implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit(): void {
  }

}
