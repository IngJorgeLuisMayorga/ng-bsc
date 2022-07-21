import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputTextBasicComponent } from '../input-text-basic/input-text-basic.component';

@Component({
  selector: 'app-input-text-password',
  templateUrl: './input-text-password.component.html',
  styleUrls: ['./input-text-password.component.less']
})
export class InputTextPasswordComponent extends InputTextBasicComponent implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit(): void {
  }

}
