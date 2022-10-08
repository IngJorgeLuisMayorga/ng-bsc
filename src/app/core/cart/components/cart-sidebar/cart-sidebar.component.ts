import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import products from 'src/app/config/products';
import { Coupon } from 'src/app/core/coupons/coupons.model';
import { CouponsService } from 'src/app/core/coupons/coupons.service';
import { IProduct, Product } from 'src/app/core/products/models/IProduct.model';
import { CartService } from '../../services/cart.service';
const MAX_FREE_SHIPPING = 3 * 100000;
@Component({
  selector: 'app-cart-sidebar',
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.less']
})
export class CartSidebarComponent implements OnInit {

  public isOpen$: Observable<boolean>;
  public coupon$: Observable<Coupon>;
  public cartProducts$: Observable<Product[]>;
  public cartTotal$: Observable<number>;
  public cartProducts:any[] = [];
  public cartTotal = 0;
  public cartTotalWithCoupon = 0;
  public cartFreeShipping = 0;
  public couponTag:any;
  
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private cartService: CartService, 
    private $cart: CartService, 
    private $coupons: CouponsService) { 
    this.isOpen$ = this.cartService.isOpen$;
    this.coupon$ = this.cartService.coupon$;

    this.cartProducts$ = this.cartService.sync().pipe(
      map((_products:Product[]) => _products.filter((_product:Product) =>  _product && _product.quantity > 0 && _product.cart && _product.cart.quantity > 0))
    )
    this.cartTotal$ = this.cartService.syncCartTotal();
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

  public isCartEmpty(){
    const items = this.cartProducts;
    return !(items && items.length > 0);
  }

  public get cartPercentage(): number{
    return  Math.min(100, Math.max(0,this.cartFreeShipping));
  }

  ngOnInit(): void {
  }

  doCloseCart(){
    this.cartService.doCloseCart();
  }

  async addToCart(product:Product){
    const response = await this.$cart.addToCart(product);
  }
  async removeFromCart(product:Product){
    this.$cart.removeToCart(product);
  }
  getProductQuantity(product: Product){
    if(product.cart) return product.cart.quantity;
    else return 0
  }
  async setCoupon(){
    const coupones = await this.$coupons.getCoupons();
    const coupon = coupones.find(_coupon => _coupon.code.toUpperCase() === (this.couponTag as string + '').toUpperCase())
    this.$cart.setCoupon(coupon);
  }

  goToCheckout(){
    if(!this.$cart.isCartEmpty()){
      this.doCloseCart();
      this.router.navigateByUrl('/checkout');
    } else{
      this.toastr.error('Error, el carrito esta vacio');
    }
  }




 
}
