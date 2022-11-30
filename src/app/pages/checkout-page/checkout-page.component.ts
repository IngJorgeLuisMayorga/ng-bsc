import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import products from 'src/app/config/products';
import { Coupon } from 'src/app/core/coupons/coupons.model';
import { CouponsService } from 'src/app/core/coupons/coupons.service';
import { IProduct, Product } from 'src/app/core/products/models/IProduct.model';
import { CartService } from 'src/app/core/cart/services/cart.service';
import { IFormField } from 'src/app/shared/components/forms/form-basic/form-basic.component';
import { OrdersService } from 'src/app/core/orders/orders.service';
import { UsersService } from 'src/app/core/users/users.service';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/core/orders/orders.model';
import { ProductsService } from 'src/app/core/products/products.service';
import { CheckoutUserFormComponent } from './components/checkout-user-form/checkout-user-form.component';
import { CheckoutShippingFormComponent } from './components/checkout-shipping-form/checkout-shipping-form.component';

const MAX_FREE_SHIPPING = 3 * 100000;

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.less']
})
export class CheckoutPageComponent implements OnInit {


  constructor(private $cart: CartService){}

  public ngOnInit(): void {
    this.$cart.initLoad()
  }

}
