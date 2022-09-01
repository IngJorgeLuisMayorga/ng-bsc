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
      name: 'shipping',
      type: 'options',
      options: [{
        label:'Envios a Bogota',
        value: '8000'
      },{
        label:'Envios a Costa Atlantica',
        value:'15000'
      },{
        label:'Envios a Antioquia ',
        value:'10000'
      }],
      value: 'Envios a Bogota',
      placeholder: 'Opciones Envio',
      error: {
        message: 'Envio Invalido',
        check: (value: any) => { return (!value); }
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
      options: [],
      value: 'Amazonas',
      placeholder: 'Departamento',
      error: {
        message: 'Departameto Invalido',
        check: (value: any) => { return (!value); }
      }
    },
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
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    
    // Departments
    this.shippingFormFields[5].options = departments.data.map(item => {
      return {
        label: item.name,
        value: item.name
      }
    })

    let user: User | string;
    user = localStorage.getItem('user');
    if(user) {
      user = JSON.parse(user) as User;
      this.shippingFormFields[0].value = user.name;
      this.shippingFormFields[1].value = user.name;
      this.shippingFormFields[2].value = user.email;
      this.shippingFormFields[8].value = user.phone;
    }

    let shipping: any = null;
    shipping = localStorage.getItem('shipping');
    if(shipping) {
      shipping = JSON.parse(shipping);
      this.shippingFormFields[0].value = shipping.name;
      this.shippingFormFields[1].value = shipping.lastname;
      this.shippingFormFields[2].value = shipping.email;
      this.shippingFormFields[3].value = shipping.shipping;
      this.shippingFormFields[4].value = shipping.country;
      this.shippingFormFields[5].value = shipping.department; 
      this.shippingFormFields[6].value = shipping.city;
      this.shippingFormFields[7].value = shipping.address;
      this.shippingFormFields[8].value = shipping.phone;
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
        shipping: this.shippingFormFields[3].value,
        country: this.shippingFormFields[4].value,
        department: this.shippingFormFields[5].value,
        city: this.shippingFormFields[6].value,
        address: this.shippingFormFields[7].value,
        phone: this.shippingFormFields[8].value
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
  }




}
