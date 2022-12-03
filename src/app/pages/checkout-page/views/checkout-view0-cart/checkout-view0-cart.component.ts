import { Component , ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CheckoutCartService } from 'src/app/core/cart/services/checkout-cart.service';
import { OrdersService } from 'src/app/core/orders/orders.service';
import { Product } from 'src/app/core/products/models/IProduct.model';
import { UsersService } from 'src/app/core/users/users.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import Breadcrumbs from '../../helpers/breadcrumbs';
import { ICheckoutCart } from '../../models/checkout-cart.model';
import { CheckoutViewComponent } from '../checkout-view/checkout-view.component';

@Component({
  selector: 'app-checkout-view0-cart',
  templateUrl: './checkout-view0-cart.component.html',
  styleUrls: ['./checkout-view0-cart.component.less']
})
export class CheckoutView0CartComponent extends CheckoutViewComponent {
 
  @ViewChild('checkoutView') checkoutView!: CheckoutViewComponent;
  
  public title = { message: 'Mi Carrito' };

  public breadcrumbs: { text: string; path: string; }[] = Breadcrumbs.slice(0,2);

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
