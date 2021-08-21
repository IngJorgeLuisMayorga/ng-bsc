import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dark-button',
  templateUrl: './dark-button.component.html',
  styleUrls: ['./dark-button.component.less']
})
export class DarkButtonComponent implements OnInit {

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
