import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import products from 'src/app/config/products';
import { IProduct } from 'src/app/core/products/models/IProduct.model';
import { CartService } from '../../services/cart.service';
const MAX_FREE_SHIPPING = 6 * 100000;
@Component({
  selector: 'app-cart-sidebar',
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.less']
})
export class CartSidebarComponent implements OnInit {

  public isOpen$: Observable<boolean>;
  public cartProducts$: Observable<IProduct[]>;
  public cartTotal$: Observable<number>;
  public cartProducts:any[] = [];
  public cartTotal = 0;
  public cartFreeShipping = 0;
  
  constructor(private cartService: CartService, private $cart: CartService) { 
    this.isOpen$ = this.cartService.isOpen$;
    this.cartProducts$ = this.cartService.sync().pipe(
      map((_products:IProduct[]) => _products.filter((_product:IProduct) =>  _product && _product.quantity > 0 && _product.cart && _product.cart.quantity > 0))
    )
    this.cartTotal$ = this.cartService.syncCartTotal();
    this.cartTotal$.subscribe(total => {
      this.cartTotal = total;
      this.cartFreeShipping = 100 * total / MAX_FREE_SHIPPING;
    });
    this.cartProducts$.subscribe(products => {
      this.cartProducts = products
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

  async addToCart(product:IProduct){
    const response = await this.$cart.addToCart(product);
  }
  async removeFromCart(product:IProduct){
    this.$cart.removeToCart(product);
  }
  getProductQuantity(product: IProduct){
    if(product.cart) return product.cart.quantity;
    else return 0
  }
}
