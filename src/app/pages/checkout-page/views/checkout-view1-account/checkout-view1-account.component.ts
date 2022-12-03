import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CheckoutCartService } from 'src/app/core/cart/services/checkout-cart.service';
import { OrdersService } from 'src/app/core/orders/orders.service';
import { UsersService } from 'src/app/core/users/users.service';
import { IFormField } from 'src/app/shared/components/forms/form-basic/form-basic.component';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { CheckoutUserFormComponent } from '../../components/checkout-user-form/checkout-user-form.component';
import { CheckoutViewComponent } from '../checkout-view/checkout-view.component';
import Breadcrumbs from '../../helpers/breadcrumbs';

@Component({
  selector: 'app-checkout-view1-account',
  templateUrl: './checkout-view1-account.component.html',
  styleUrls: ['./checkout-view1-account.component.less']
})
export class CheckoutView1AccountComponent extends CheckoutViewComponent {


  public title = { message: 'Mi Cuenta' };
  public breadcrumbs: { text: string; path: string; }[] = Breadcrumbs.slice(0,3);

  public tab = 'signup';
  public disabled = true;
  public init = false;

  @ViewChild(CheckoutUserFormComponent) userFormComponent : CheckoutUserFormComponent;
  @ViewChild('checkoutView') checkoutView!: CheckoutViewComponent;

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

  ngOnInit(): void {
    setTimeout(() => this.init = true, 1000);
  }

  onChange($event: { form: IFormField[], tab: string, isOk: boolean }){
    this.tab = $event.tab;
    if(this.init) this.disabled = false;
  }

  onContinueBtn(): void {
    if(this.tab === 'signin'){
      this.userFormComponent.doSignIn().then( user => {
        this.onContinue();
      }).catch( error => console.error(error))
    }
    if(this.tab === 'signup'){
      this.userFormComponent.doSignUp().then( user => {
        this.onContinue();
      }).catch( error => console.error(error))
    }
  }



}
