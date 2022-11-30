import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/users/user.model';
import { UsersService } from 'src/app/core/users/users.service';
import { IFormField, IFormSubmit } from 'src/app/shared/components/forms/form-basic/form-basic.component';
import { formatDateToDDMMYYYY } from 'src/app/shared/helpers/date.helper';
import departments from 'src/app/shared/jsons/departments';


const UserFormFields: IFormField[] = [

  // 0 :: First Name
  {
    name: 'firstname',
    type: 'text',
    value: '',
    placeholder: 'Nombre',
    error: {
      message: 'Nombre Invalido',
      check: (value: any, value2?: any) => { return value && (value.length < 3); }
    }
  },

  // 1 :: Last Name
  {
    name: 'lastname',
    type: 'text',
    value: '',
    placeholder: 'Apellido',
    error: {
      message: 'Apellido Invalido',
      check: (value: any) => { return value && (value.length < 3); }
    }
  },

  // 2 :: Email
  {
    name: 'email',
    type: 'email',
    value: '',
    placeholder: 'Correo Eléctronico',
    error: {
      message: 'Correo Invalido',
      check: (value: any) => { return !(value.includes('@') && value.includes('.')); }
    }
  },

  // 3 :: Date
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

  // 4 :: Department
  {
  name: 'department',
  type: 'options',
  options: [],
  value: 'Bogotá D.C.',
  placeholder: 'Departamento',
  error: {
    message: 'Departameto Invalido',
    check: (value: any) => { return (!value); }
  }
} ,

  // 5 :: City
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

  // 6 :: Address
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

  // 7 :: Phone
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

  // 8 :: NID Type
  {
    name: 'nid_type',
    type: 'options',
    options: [
      {
        label: 'CC',
        value: 'CC',
      },
    ],
    value: 'CC',
    placeholder: 'Tipo de Documento',
    error: {
      message: 'Teléfono Invalida',
      check: (value: any) => { return (!value); }
    }
  },

  // 9 :: NID Number
  {
    name: 'nid_number',
    type: 'text',
    value: '',
    placeholder: 'Documento',
    error: {
      message: 'Documento Invalida',
      check: (value: any) => { return (!value); }
    }
  },

  // 10 :: Password
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

  // 11 :: Password2
  {
    name: 'password2',
    type: 'password',
    value: '',
    placeholder: 'Confirmar Contraseña',
    error: {
      message: 'Contraseñas no Coinciden',
      check: (value1: any) => { return (value1 !== UserFormFields[10].value); }
    }
  },
];

const UserLoginFormFields: IFormField[] = [
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

@Component({
  selector: 'app-checkout-user-form',
  templateUrl:  './checkout-user-form.component.html',
  styleUrls: ['./checkout-user-form.component.less']
})
export class CheckoutUserFormComponent implements OnInit {

  public userFormSubmitSignUp: IFormSubmit = {
    type: 'none',
    color: 'blue',
    placeholder: 'Crear Cuenta'
  }

  public userFormSubmitSignIn: IFormSubmit = {
    type: 'none',
    color: 'blue',
    placeholder: 'Ingresar'
  }


  public userFormFields: IFormField[] = UserFormFields;
  public userLoginFormFields: IFormField[] = UserLoginFormFields;
  

  @Output()
  nContinue = new EventEmitter<{form: IFormField[], tab: string}>();
  

  @Output()
  nChange = new EventEmitter<{form: IFormField[], tab: string, isOk: boolean}>();
  

  constructor(
    private $user: UsersService,
  ) { }

  ngOnInit(): void {

      
    // Departments
    this.userFormFields[4].options = [
      ...[{
        label: 'Seleccionar Departamento',
        value: 'NA',
        price: 0
      }],
      ...departments.data.map(item => {
      const price = (item.name === 'Bogotá D.C.'  || item.name === 'Cundinamarca') ? 7000 : 12000;
      return {
        label: item.name,
        value: item.name,
        price: price
      }
    })]

    let user: User | string;
    user = localStorage.getItem('user');
    if(user) {
      user = JSON.parse(user) as User;

      //Login Form
      this.userLoginFormFields[0].value = user.email;
      this.userLoginFormFields[1].value = '';

      //SignUp Form
      this.userFormFields[0].value = user.first_name;
      this.userFormFields[1].value = user.last_name;
      this.userFormFields[2].value = user.email;
      this.userFormFields[3].value = formatDateToDDMMYYYY(new Date(user.birthdate));
      this.userFormFields[4].value = user.department;
      this.userFormFields[5].value = user.city;
      this.userFormFields[6].value = user.address;
      this.userFormFields[7].value = user.phone;
      this.userFormFields[8].value = user.nid_type;
      this.userFormFields[9].value = user.nid_number;

      this.userFormFields[10].value = '';
      this.userFormFields[11].value = '';

      const {ok} = this.checkSignUpForm();

      this.nChange.emit({ form: this.userFormFields, tab: 'signin', isOk: ok});   
      this.nContinue.emit({ form: this.userFormFields, tab: 'signin'});
      
    }
  }

  doSignIn(){
    return new Promise((resolve, reject) => {
      const email = this.userLoginFormFields[0].value;
      const password = this.userLoginFormFields[1].value;
      this.$user.login(email, password)
      .then(response => {
        //this.nChange.emit({ form: this.userLoginFormFields, tab: 'signin'});
        //this.nContinue.emit({ form: this.userLoginFormFields, tab: 'signin'});
        resolve(response)
      }).catch( error => {
        console.error(' ')
        console.error(' doSignIn() ')
        console.error(' ===> ERROR ')
        console.error(error)
        console.error(' ')
        reject(error)
      })
    })
  }

  doSignUp(){
    return new Promise((resolve, reject) => {
      const {ok, user} = this.checkSignUpForm();
      if(ok){
        this.$user.signup({
          id:-1,
          name: user.firstname + ' ' + user.lastname,
          first_name: user.firstname,
          last_name: user.lastname,
          email: user.email,
          nid_type: user.nid_type,
          nid_number: user.nid_number,
          birthdate: new Date(user.date),
          points: 0,
          photo: 'https://www.pngitem.com/middle/hhmRJo_profile-icon-png-image-free-download-searchpng-employee/',
          phone: user.phone ,
          city: user.city,
          address: user.address,
          department: user.department,
          signin_at: new Date(),
          password: user.password,
          created_at:new Date(),
          updated_at:new Date(),
          comments:' ',
        }).then(response => {
            //this.nChange.emit({ form: this.userFormFields, tab: 'signup'});
            //this.nContinue.emit({ form: this.userFormFields, tab: 'signup'});
            resolve(response)
          }).catch( error => {
            console.log(' ')
            console.log(' doSignUp() ')
            console.log(' ===> ERROR ')
            console.log(error)
            console.log(' ')
            reject(error);
          })
      } else {
        reject('Fail Checking Form')
      }
    });
  }

  doSignInOrSignUp(){
    const email = this.userLoginFormFields[0].value;
    const password = this.userLoginFormFields[1].value;
    if(email && password){
      this.doSignIn();
    } else {
      this.doSignUp();
    }
  }

  checkSignUpForm(){
    const user = this.userFormFields.
    filter( item => 
      !item.error.check(item.value)
    ).
    map( item => { 
      const keypair: {[key: string]: string} = {};
      keypair[item.name] = item.value;
      return keypair;
    }).reduce((sum, val) => {
      return {...sum, ...val}
    }, {});
    const isOk = Object.values(user).every(x => x) && this.userFormFields.length === Object.values(user).length;
    return {
      ok :isOk,
      user: user
    }
  }

  setUserFormField(fields: IFormField[], tab: string){
    this.userFormFields = fields;
    this.userLoginFormFields = UserLoginFormFields;
    const {ok} = this.checkSignUpForm();
    this.nChange.emit({ form: this.userFormFields, tab: tab, isOk:ok});
  }

  setUserLoginFormFields(fields: IFormField[], tab: string){
    this.userLoginFormFields = fields;
    this.userFormFields = UserFormFields;
    const {ok} = this.checkSignUpForm();
    this.nChange.emit({ form: this.userLoginFormFields, tab: tab, isOk: ok});
  }

  onTabChange(tab: string){
    const isOk = false;
    if(tab === 'Crear Cuenta') this.nChange.emit({ form: this.userFormFields, tab: 'signup', isOk: isOk});
    if(tab === 'Iniciar Sesión') this.nChange.emit({ form: this.userLoginFormFields, tab: 'signin', isOk: isOk});
  }



}
