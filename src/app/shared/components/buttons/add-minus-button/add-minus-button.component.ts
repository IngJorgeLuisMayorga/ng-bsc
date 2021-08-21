import { Component, Input, OnInit,  Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-add-minus-button',
  templateUrl: './add-minus-button.component.html',
  styleUrls: ['./add-minus-button.component.less']
})
export class AddMinusButtonComponent implements OnInit {

   @Input()
   value: number = 0;

   @Output()
   onMin = new EventEmitter();

   @Output()
   onMax = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  doMin(){ this.onMin.emit(null) }
  doMax(){ this.onMax.emit(null) }

}
