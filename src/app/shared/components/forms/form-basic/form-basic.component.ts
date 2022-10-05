import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface IFormField{
  name: string;
  type: string;
  value:string;
  options?: Array<{
    label: string;
    value: string;
    price?: number;
  }>;
  error?: {
    message: string;
    check: (value: any) => boolean;
  }
  placeholder: string;
}
export interface IFormSubmit{
  type: string;
  color: string;
  placeholder: string;
}

@Component({
  selector: 'app-form-basic',
  templateUrl: './form-basic.component.html',
  styleUrls: ['./form-basic.component.less']
})
export class FormBasicComponent implements OnInit {

  @Input()
  formFields!: IFormField[];

  @Input()
  formSubmit!: IFormSubmit;

  
  @Output()
  nChange = new EventEmitter<IFormField[]>();

  @Output()
  nSubmit = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.nSubmit.emit();
  }

  setField(field: IFormField, value: any){
    field.value = value;
    this.nChange.emit(this.formFields);
  }

}
