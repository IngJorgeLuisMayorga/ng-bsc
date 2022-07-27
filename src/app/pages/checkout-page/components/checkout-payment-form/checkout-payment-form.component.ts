import { Component, OnInit } from '@angular/core';
import { IFormField, IFormSubmit } from 'src/app/shared/components/forms/form-basic/form-basic.component';

@Component({
  selector: 'app-checkout-payment-form',
  templateUrl: './checkout-payment-form.component.html',
  styleUrls: ['./checkout-payment-form.component.less']
})
export class CheckoutPaymentFormComponent implements OnInit {

  
  public paymentFormSubmit: IFormSubmit = {
    type: 'basic',
    color: 'pink',
    placeholder: 'Guardar'
  }

  public paymentFormFields: IFormField[] = [
   
  ];

  constructor() { }

  ngOnInit(): void {
  }

  setFormField(fields: IFormField[]){
    this.paymentFormFields = fields;
  }


}
