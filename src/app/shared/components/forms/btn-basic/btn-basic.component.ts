import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-btn-basic',
  templateUrl: './btn-basic.component.html',
  styleUrls: ['./btn-basic.component.less']
})
export class BtnBasicComponent implements OnInit {

  @Input()
  placeholder!: string;

  @Input()
  color:  string = 'blue';

  @Output()
  nClick = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  doButton(){
    this.nClick.emit()
  }

}
