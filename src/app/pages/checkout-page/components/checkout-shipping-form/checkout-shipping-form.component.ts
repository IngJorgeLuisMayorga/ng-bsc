import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/users/user.model';
import { UsersService } from 'src/app/core/users/users.service';
import { IFormField, IFormSubmit } from 'src/app/shared/components/forms/form-basic/form-basic.component';
import departments from 'src/app/shared/jsons/departments';

@Component({
  selector: 'app-checkout-shipping-form',
  templateUrl: './checkout-shipping-form.component.html',
  styleUrls: ['./checkout-shipping-form.component.less']
})
export class CheckoutShippingFormComponent implements OnInit {



  public shippingFormSubmit: IFormSubmit = {
    type: 'none',
    color: 'yellow',
    placeholder: 'Guardar'
  }

  public shippingFormFields: IFormField[] = [
    //0
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
    //1
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
    //2
    {
      name: 'email',
      type: 'email',
      value: '',
      placeholder: 'Correo Eléctronico',
      error: {
        message: 'Correo Invalido',
        check: (value: any) => { return !value.includes('@'); }
      }
      //3
    },{
      name: 'country',
      type: 'text',
      value: 'Colombia',
      placeholder: 'Pais',
      error: {
        message: 'Pais Invalido',
        check: (value: any) => { return (!value); }
      }
      //4
    },{
      name: 'department',
      type: 'options',
      options: [],
      value: 'Amazonas',
      placeholder: 'Departamento',
      error: {
        message: 'Departameto Invalido',
        check: (value: any) => { return (!value); }
      }
    },
    //5
    {
      name: 'city',
      type: 'text',
      value: '',
      placeholder: 'Ciudad o Municipio',
      error: {
        message: 'Dirección Invalida',
        check: (value: any) => { return (!value); }
      }
    },
    //6
    {
      name: 'address',
      type: 'text',
      value: '',
      placeholder: 'Dirección de Envio',
      error: {
        message: 'Dirección Invalida',
        check: (value: any) => { return (!value); }
      }
    },
    //7
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

  @Input()
  showPrices: boolean = true;

  constructor(
    private $user: UsersService,
    private toaster: ToastrService,
    private currencyPipe: CurrencyPipe
    ) { }

  ngOnInit(): void {
    
    // Departments
    this.shippingFormFields[4].options = [
      ...[{
        label: 'Seleccionar Departamento',
        value: 'NA',
        price: 0
      }],
      ...departments.data.map(item => {
      const price = (item.name === 'Bogotá D.C.'  || item.name === 'Cundinamarca') ? 7000 : 12000;
      return {
        label: this.showPrices ? item.name + '  -  ' + this.currencyPipe.transform(price,'','$','1.0-0') : item.name,
        value: item.name,
        price: price
      }
    })]

    let user: User | string;
    user = localStorage.getItem('user');
    if(user) {
      user = JSON.parse(user) as User;
      this.shippingFormFields[0].value = user.name;
      this.shippingFormFields[1].value = user.name;
      this.shippingFormFields[2].value = user.email;
      this.shippingFormFields[3].value = 'Colombia';
      this.shippingFormFields[4].value = user.department;
      this.shippingFormFields[5].value = user.city;
      this.shippingFormFields[6].value = user.address;
      this.shippingFormFields[7].value = user.phone;
    }

    let shipping: any = null;
    shipping = localStorage.getItem('shipping');
    if(shipping) {
      shipping = JSON.parse(shipping);
      this.shippingFormFields[0].value = shipping.name;
      this.shippingFormFields[1].value = shipping.lastname;
      this.shippingFormFields[2].value = shipping.email;
      this.shippingFormFields[3].value = shipping.country;
      this.shippingFormFields[4].value = shipping.department; 
      this.shippingFormFields[5].value = shipping.city;
      this.shippingFormFields[6].value = shipping.address;
      this.shippingFormFields[7].value = shipping.phone;
      this.nChange.emit(this.shippingFormFields);
    }



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
      const shipping = {
        name: this.shippingFormFields[0].value,
        lastname: this.shippingFormFields[1].value,
        email: this.shippingFormFields[2].value,
        country: this.shippingFormFields[3].value,
        department: this.shippingFormFields[4].value,
        shipping: (this.shippingFormFields[4].value as any).price,
        city: this.shippingFormFields[5].value,
        address: this.shippingFormFields[6].value,
        phone: this.shippingFormFields[7].value
      }
      localStorage.setItem('shipping', JSON.stringify(shipping));
      this.nChange.emit(this.shippingFormFields);
      this.nContinue.emit();
    } else {
      this.toaster.error('Información de envio invalida')
    } 
    
  }

  setFormField(fields: IFormField[]){
    this.shippingFormFields = fields;
    this.nChange.emit(this.shippingFormFields);
  }




}
