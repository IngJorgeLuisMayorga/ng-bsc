import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CheckoutCartService } from 'src/app/core/cart/services/checkout-cart.service';
import { OrdersService } from 'src/app/core/orders/orders.service';
import { UsersService } from 'src/app/core/users/users.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import breadcrumbs from '../../helpers/breadcrumbs';
import { ICheckoutCart } from '../../models/checkout-cart.model';
import { CheckoutViewComponent } from '../checkout-view/checkout-view.component';

@Component({
  selector: 'app-checkout-view3-payment',
  templateUrl: './checkout-view3-payment.component.html',
  styleUrls: ['./checkout-view3-payment.component.less']
})
export class CheckoutView3PaymentComponent extends CheckoutViewComponent {
  @ViewChild('checkoutView') checkoutView!: CheckoutViewComponent;
  public breadcrumbs: { text: string; path: string; }[] = breadcrumbs.slice(0,5);

  public title = { message: 'Mi Pago' };
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

  

}
