import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/users/user.model';
import { UsersService } from 'src/app/core/users/users.service';
import { IFormField, IFormSubmit } from 'src/app/shared/components/forms/form-basic/form-basic.component';
import { formatDateToDDMMYYYY } from 'src/app/shared/helpers/date.helper';

@Component({
  selector: 'app-checkout-user-form',
  templateUrl:  './checkout-user-form.component.html',
  styleUrls: ['./checkout-user-form.component.less']
})
export class CheckoutUserFormComponent implements OnInit {

  public userFormSubmitSignUp: IFormSubmit = {
    type: 'basic',
    color: 'blue',
    placeholder: 'Crear Cuenta'
  }

  public userFormSubmitSignIn: IFormSubmit = {
    type: 'basic',
    color: 'blue',
    placeholder: 'Ingresar'
  }

  public userFormFields: IFormField[] = [
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
    },
    {
      name: 'date',
      type: 'date',
      value: '',
      placeholder: 'Fecha de Nacimiento',
      error: {
        message: 'Fecha Invalida',
        check: (value: any) => { return (!value); }
      }
    },
    {
      name: 'password',
      type: 'password',
      value: '',
      placeholder: 'Contraseña',
      error: {
        message: 'Contraseña Invalida',
        check: (value: any) => { return (!value); }
      }
    },
    {
      name: 'password2',
      type: 'password',
      value: '',
      placeholder: 'Confirmar Contraseña',
      error: {
        message: 'Contraseñas no Coinciden',
        check: (value1: any) => { return (value1 !== this.userFormFields[4].value); }
      }
    },
  ];

  public userLoginFormFields: IFormField[] = [
    {
      name: 'email',
      type: 'email',
      value: '',
      placeholder: 'Correo Eléctronico',
      error: {
        message: 'Correo Invalido',
        check: (value: any) => { return !value.includes('@'); }
      }
    },
    {
      name: 'password',
      type: 'password',
      value: '',
      placeholder: 'Contraseña',
      error: {
        message: 'Contraseña Invalida',
        check: (value: any) => { return (!value); }
      }
    },
  ];
  

  @Output()
  nContinue = new EventEmitter();
  

  @Output()
  nChange = new EventEmitter<IFormField[]>();
  

  constructor(
    private $user: UsersService,
  ) { }

  ngOnInit(): void {
    let user: User | string;
    user = localStorage.getItem('user');
    if(user) {
      user = JSON.parse(user) as User;

      //Login Form
      this.userLoginFormFields[0].value = user.email;
      this.userLoginFormFields[1].value = '';

      //SignUp Form
      this.userFormFields[0].value = user.name;
      this.userFormFields[1].value = user.name;
      this.userFormFields[2].value = user.email;
      this.userFormFields[3].value = formatDateToDDMMYYYY(new Date(user.birthdate));
      this.userFormFields[4].value = user.password;
      this.userFormFields[5].value = user.password;

      

   
    }
  }

  doSignIn(){
    const email = this.userLoginFormFields[0].value;
    const password = this.userLoginFormFields[1].value;
    this.$user.login(email, password)
    .then(response => {
      this.nChange.emit(this.userLoginFormFields);
      this.nContinue.emit();
    }).catch( error => {
      console.error(' ')
      console.error(' doSignIn() ')
      console.error(' ===> ERROR ')
      console.error(error)
      console.error(' ')
    })
  }

  doSignUp(){
    const {ok, user} = this.checkSignUpForm();
    if(ok){
    this.$user.signup({
      id:-1,
      name: user.name + ' ' + user.lastname,
      email: user.email,
      nid_type: 'CC',
      nid_number: 'NA',
      birthdate: new Date(user.date),
      points: 0,
      photo: 'https://www.pngitem.com/middle/hhmRJo_profile-icon-png-image-free-download-searchpng-employee/',
      phone: user.phone + ' ' + user.mobile ,
      city: 'NA',
      address: 'NA',
      signin_at: new Date(),
      password: user.password,
      created_at:new Date(),
      updated_at:new Date(),
      comments:' ',
    }).then(response => {
        this.nChange.emit(this.userFormFields);
        this.nContinue.emit();
      }).catch( error => {
        console.log(' ')
        console.log(' doSignUp() ')
        console.log(' ===> ERROR ')
        console.log(error)
        console.log(' ')
      })
    } else {

    }
    
  }

  checkSignUpForm(){
    const user = this.userFormFields.map( item => { 
      const keypair: {[key: string]: string} = {};
      keypair[item.name] = item.value;
      return keypair;
    }).reduce((sum, val) => {
      return {...sum, ...val}
    }, {});
    const isOk = Object.values(user).every(x => x);
    return {
      ok :isOk,
      user: user
    }
  }

  setUserFormField(fields: IFormField[]){
    this.userFormFields = fields;
    this.nChange.emit(fields);
  }

  setUserLoginFormFields(fields: IFormField[]){
    this.userFormFields = fields;
    this.userLoginFormFields = fields;
  }



}
