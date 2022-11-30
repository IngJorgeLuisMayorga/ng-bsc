import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-options-basic',
  templateUrl: './input-options-basic.component.html',
  styleUrls: ['./input-options-basic.component.less']
})
export class InputOptionsBasicComponent implements OnInit {

  @Input()
  default!:any;

  @Input()
  options!:any[];

  @Input()
  placeholder!:  string;

  @Input()
  error:boolean = false;

  @Input()
  errorMsg:string = '';

  @Output()
  nChange = new EventEmitter();

  @Input()
  errorCheck:  (value: any) => boolean = () => { return false};

  public isError = false;
  public isFill = false;


  constructor() { }

  ngOnInit(): void {
  }

  onChange(option:any){
    const value = option.value;
    this.isError = this.errorCheck(value);
    if(!this.isError){
      this.nChange.emit(value);
    }

    this.isFill = true;
  }
}
