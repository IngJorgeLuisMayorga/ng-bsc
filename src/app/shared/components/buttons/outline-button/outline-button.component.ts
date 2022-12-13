import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-outline-button',
  templateUrl: './outline-button.component.html',
  styleUrls: ['./outline-button.component.less']
})
export class OutlineButtonComponent implements OnInit {

  @Input()
  text: string = '';

  @Input()
  icon: string = '';

  @Output()
  nClick  = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  doClick(){
    this.nClick.emit();
  }
}
