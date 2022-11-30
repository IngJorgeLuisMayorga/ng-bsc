import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/cart/services/cart.service';
import { CouponsService } from 'src/app/core/coupons/coupons.service';
import { Product } from 'src/app/core/products/models/IProduct.model';
import { filter, map }  from  'rxjs/operators';
import { Observable } from 'rxjs';
import { ICheckoutProduct } from '../../models/checkout-cart.model';

@Component({
  selector: 'app-checkout-product-list',
  templateUrl: './checkout-product-list.component.html',
  styleUrls: ['./checkout-product-list.component.less']
})
export class CheckoutProductListComponent implements OnInit {

  @Input()
  products :  ICheckoutProduct[];

  @Input()
  total : number;

  @Input()
  missingToFree : number;

  @Input()
  isOrder : boolean = false;

  public coupon: string;
  
  constructor(private $cart: CartService, private $coupons: CouponsService) {
  }

  ngOnInit(): void {
  }

  async doCoupon(){
    const couponTag = this.coupon;
    const coupones = await this.$coupons.getCoupons();
    const coupon = coupones.find((_coupon: any) => _coupon.code.toUpperCase() === (couponTag as string + '').toUpperCase())
    this.$cart.setCoupon(coupon);
    this.$cart.applyCoupon(this.total);
  }


}
