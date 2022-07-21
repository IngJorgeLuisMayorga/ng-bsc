import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import products from 'src/app/config/products';
import { Coupon } from 'src/app/core/coupons/coupons.model';
import { CouponsService } from 'src/app/core/coupons/coupons.service';
import { IProduct, Product } from 'src/app/core/products/models/IProduct.model';
import { CartService } from 'src/app/core/cart/services/cart.service';
import { IFormField } from 'src/app/shared/components/forms/form-basic/form-basic.component';

const MAX_FREE_SHIPPING = 3 * 100000;

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.less']
})
export class CheckoutPageComponent implements OnInit {

  public step = 1;
  public products: any[] = [];
  public breadcrumb: { path: string; text: string } = { path: '', text: ''};
  public breadcrumbs: Array<{ path: string; text: string }> = [];

  
  public isOpen$: Observable<boolean>;
  public coupon$: Observable<Coupon>;
  public cartProducts$: Observable<Product[]>;
  public cartTotal$: Observable<number>;
  public cartProducts:any[] = [];
  public cartTotal = 0;
  public cartTotalWithCoupon = 0;
  public cartFreeShipping = 0;
  public couponTag:any;
  

  public userFormFields: IFormField[] = [];
  public shippingFormFields: IFormField[] = [];
  public paymentFormFields: IFormField[] = [];

  constructor(private router: Router, private $cart: CartService, private $coupons: CouponsService) {

    this.breadcrumbs = [
      {
        text:'Inicio',
        path: '/',
      },
      {
        text:' Carrito',
        path: '/checkout/cart',
      },
      {
        text:' Datos',
        path: '/checkout/info',
      },
      {
        text:' Envio',
        path: '/checkout/shipping',
      },
      {
        text: 'Pago',
        path: '/checkout/payment',
      },
    ];

    this.coupon$ = this.$cart.coupon$;

    this.cartProducts$ = this.$cart.sync().pipe(
      map((_products:Product[]) => _products.filter((_product:Product) =>  _product && _product.quantity > 0 && _product.cart && _product.cart.quantity > 0))
    )
    this.cartTotal$ = this.$cart.syncCartTotal();
    this.cartTotal$.subscribe(total => {
      this.cartTotal = total;
      this.cartFreeShipping = 100 * total / MAX_FREE_SHIPPING;
    });
    this.cartProducts$.subscribe(products => {
      this.cartProducts = products
    })
    this.coupon$.subscribe( coupon => {
      this.cartTotalWithCoupon = this.$cart.applyCoupon(this.cartTotal);
    })

  }

  ngOnInit(): void {
    const cartCache = JSON.parse(localStorage.getItem('cart') || '[]');
    this.$cart.setCart(cartCache);
  }

  setBreadcrumb(breadcumb: { path: string; text: string }){
    this.breadcrumb = breadcumb;
  }

  setStep(step: number){
    this.step = step;
  }

  async setCoupon(){
    const coupones = await this.$coupons.getCoupons();
    const coupon = coupones.find(_coupon => _coupon.code.toUpperCase() === (this.couponTag as string + '').toUpperCase())
    this.$cart.setCoupon(coupon);
  }

  onContinue(){
    const currentPath =  this.breadcrumb.path;
    const nextPathIndex = Math.min( this.breadcrumbs.length,  1 + this.breadcrumbs.findIndex((breadcrumb => breadcrumb.path === currentPath)) );
    const nextPath = this.breadcrumbs[nextPathIndex];
    this.router.navigateByUrl(nextPath.path);
  }

  setUserForm(userForm: IFormField[]){
    this.userFormFields = userForm;
  }

  setShippingForm(shippingForm: IFormField[]){
    this.shippingFormFields = shippingForm;
  }

  setPaymentForm(paymentForm: IFormField[]){
    this.paymentFormFields = paymentForm;
  }

}
