import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pink-button',
  templateUrl: './pink-button.component.html',
  styleUrls: ['./pink-button.component.less']
})
export class PinkButtonComponent implements OnInit {


  @Input()
  text: string = '';

  @Input()
  icon: string = '';

  
  @Input()
  hover_text: string = '';

  @Input()
  hover_icon: string = '';

  @Output()
  nClick  = new EventEmitter();


  isHover = false;

  constructor() { }

  ngOnInit(): void {
  }

  doClick(){
    this.nClick.emit();
  }

  setHover(){
    this.isHover = true;
  }
  resetHover(){
    this.isHover = false;
  }

}
