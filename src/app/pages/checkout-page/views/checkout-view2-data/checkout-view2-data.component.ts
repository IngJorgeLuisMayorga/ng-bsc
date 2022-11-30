import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CheckoutCartService } from 'src/app/core/cart/services/checkout-cart.service';
import { OrdersService } from 'src/app/core/orders/orders.service';
import { UsersService } from 'src/app/core/users/users.service';
import { IFormField } from 'src/app/shared/components/forms/form-basic/form-basic.component';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { CheckoutShippingFormComponent } from '../../components/checkout-shipping-form/checkout-shipping-form.component';
import { CheckoutViewComponent } from '../checkout-view/checkout-view.component';

@Component({
  selector: 'app-checkout-view2-data',
  templateUrl: './checkout-view2-data.component.html',
  styleUrls: ['./checkout-view2-data.component.less']
})
export class CheckoutView2DataComponent extends CheckoutViewComponent  {

  public title = { message: 'Mis Datos' };

  public form: any[] = [];
  @ViewChild(CheckoutShippingFormComponent) shippingFormComponent : CheckoutShippingFormComponent;

  constructor(
    public $router: Router, 
    public $toastr: ToastrService,
    public $orders: OrdersService,
    public $users: UsersService,
    public $breadcrumbs: BreadcrumbsService,
    public $cart: CheckoutCartService
  ) { 
    super($router, $toastr, $orders, $users, $breadcrumbs, $cart);
  }

  ngOnInit(): void {}

  onChange( form: IFormField[]){
    this.form = form;
    this.$cart.setShipping(
      {
        firstname: this.form[0].value,
        lastname: this.form[1].value,
        email: this.form[2].value,
        country: this.form[3].value,
        department: this.form[4].value,
        city: this.form[5].value,
        address: this.form[6].value,
        phone: this.form[7].value,
      }, 
      this.getDepartmentValue(this.form[4].value),
      null
    );
  }

  onContinueBtn(){
    if(!this.form[4].value){
      return '';
    }
    this.$cart.setShipping(
      {
        firstname: this.form[0].value,
        lastname: this.form[1].value,
        email: this.form[2].value,
        country: this.form[3].value,
        department: this.form[4].value,
        city: this.form[5].value,
        address: this.form[6].value,
        phone: this.form[7].value,
      }, 
      this.getDepartmentValue(this.form[4].value),
      null
    );

    this.onContinue()
    return 'OK';
  }

  getDepartmentValue(departmentName: string): number{
    if(departmentName == 'Bogotá D.C.') return 7000;
    return 12000;
  }


}
