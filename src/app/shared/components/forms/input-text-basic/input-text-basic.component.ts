import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-text-basic',
  templateUrl: './input-text-basic.component.html',
  styleUrls: ['./input-text-basic.component.less']
})
export class InputTextBasicComponent implements OnInit {

  @Input()
  placeholder!:  string;

  @Input()
  default!:  string;

  @Input()
  errorMsg:  string = '';

  @Input()
  errorCheck:  (value: any) => boolean = () => { return false};

  public isError = false;
  public value = '';


  @Output()
  nChange = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  onChange($event: any){
    const value = $event.target.value;
    this.value = value;
    this.isError = this.errorCheck(value);
    this.nChange.emit(value);
    /*
    if(!this.isError){
      this.nChange.emit(value);
    }
    */
  }

}
