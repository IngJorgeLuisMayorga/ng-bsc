import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CheckoutCartService } from 'src/app/core/cart/services/checkout-cart.service';
import { OrdersService } from 'src/app/core/orders/orders.service';
import { UsersService } from 'src/app/core/users/users.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { CheckoutViewComponent } from '../checkout-view/checkout-view.component';

const Boxs = {
  'yellow': 'yellow' as 'yellow',
}

@Component({
  selector: 'app-checkout-view4-finish',
  templateUrl: './checkout-view4-finish.component.html',
  styleUrls: ['./checkout-view4-finish.component.less']
})
export class CheckoutView4FinishComponent extends CheckoutViewComponent {

  public title = { message: '!Gracias por tu compra!', box: Boxs.yellow};
  public breadcrumbs: { text: string; path: string; }[] =[
    {
      text: 'Pedido Completado',
      path: '/checkout/finish',
    }
  ];
  
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
  }

}
