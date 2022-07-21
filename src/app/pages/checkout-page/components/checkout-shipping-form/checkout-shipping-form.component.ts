import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/users/user.model';
import { UsersService } from 'src/app/core/users/users.service';
import { IFormField, IFormSubmit } from 'src/app/shared/components/forms/form-basic/form-basic.component';

@Component({
  selector: 'app-checkout-shipping-form',
  templateUrl: './checkout-shipping-form.component.html',
  styleUrls: ['./checkout-shipping-form.component.less']
})
export class CheckoutShippingFormComponent implements OnInit {



  public shippingFormSubmit: IFormSubmit = {
    type: 'basic',
    color: 'yellow',
    placeholder: 'Guardar'
  }

  public shippingFormFields: IFormField[] = [
    {
      name: 'name',
      type: 'text',
      value: '',
      placeholder: 'Nombre',
      error: {
        message: 'Nombre Invalido',
        check: (value: any, value2?: any) => { return (value.length < 3); }
      }
    },
    {
      name: 'lastname',
      type: 'text',
      value: '',
      placeholder: 'Apellido',
      error: {
        message: 'Apellido Invalido',
        check: (value: any) => { return (value.length < 3); }
      }
    },
    {
      name: 'email',
      type: 'email',
      value: '',
      placeholder: 'Correo Eléctronico',
      error: {
        message: 'Correo Invalido',
        check: (value: any) => { return !value.includes('@'); }
      }
    },{
      name: 'country',
      type: 'text',
      value: 'Colombia',
      placeholder: 'Pais',
      error: {
        message: 'Pais Invalido',
        check: (value: any) => { return (!value); }
      }
    },{
      name: 'department',
      type: 'options',
      options: [{
        label: 'Amazonas',
        value: 'Amazonas'
      },{
        label: 'Bogota',
        value: 'Bogota'
      }],
      value: 'Amazonas',
      placeholder: 'Departamento',
      error: {
        message: 'Departameto Invalido',
        check: (value: any) => { return (!value); }
      }
    },
    {
      name: 'address',
      type: 'text',
      value: '',
      placeholder: 'Dirección',
      error: {
        message: 'Dirección Invalida',
        check: (value: any) => { return (!value); }
      }
    },
    {
      name: 'phone',
      type: 'text',
      value: '',
      placeholder: 'Telefóno',
      error: {
        message: 'Teléfono Invalida',
        check: (value: any) => { return (!value); }
      }
    },
  ];
  

  @Output()
  nContinue = new EventEmitter();

  @Output()
  nChange = new EventEmitter<IFormField[]>();

  @Input()
  userFields!: IFormField[];

  constructor(
    private $user: UsersService,
  ) { }

  ngOnInit(): void {



    if(this.userFields[0]){
      this.shippingFormFields[0].value = this.userFields[0].value;
    }

    console.log(' ')
    console.log(' shippingFormFields[0] ')
    console.log(this.shippingFormFields[0])
    console.log(' ')
    console.log(' ')
    console.log(' this.userFields[0] ')
    console.log(this.userFields[0])
    console.log(' ')
    
    //this.shippingFormFields[1].value = this.userFields[1].value;
    //this.shippingFormFields[2].value = this.userFields[2].value;
  }

  doSetShipping(){
    const shipping = this.shippingFormFields.map( item => { 
      const keypair: {[key: string]: string} = {};
      keypair[item.name] = item.value;
      return keypair;
    }).reduce((sum, val) => {
      return {...sum, ...val}
    }, {});
    const isOk = Object.values(shipping).every(x => x);
    if(isOk){
      this.nChange.emit(this.shippingFormFields);
      this.nContinue.emit();
    }
    
  }

  setFormField(fields: IFormField[]){
    this.shippingFormFields = fields;
  }




}
