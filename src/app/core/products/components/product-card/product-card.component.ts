import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/core/cart/services/cart.service';
import { IProduct, Product } from '../../models/IProduct.model';

import { map } from 'rxjs/operators';
import { WishlistService } from 'src/app/core/wishlist/services/wishlist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.less']
})
export class ProductCardComponent implements OnInit {

  @Input()
  product!: Product;  

  @Input()
  discount!: number;

  @Input()
  mode: string = 'full';

  @Input()
  showStepLabel: boolean = false;

  @Input()
  colorStepLabel: string = '';

  public wishlist$: Observable<Product[]>;
  public inWishlist$: Observable<boolean>;
  public inCartlist$: Observable<boolean>;

  public cart$: Observable<Product[]>;
  public status = 'none';

  public cartIsUpdating$: Observable<number>;
  public cartProductItems$: Observable<number>;

  constructor(
    private route: Router,
    private $cart: CartService, 
    private $wishlist: WishlistService) {

    this.cart$ = this.$cart.sync();
    this.wishlist$ = this.$wishlist.sync();

    this.cartIsUpdating$ = this.$cart.syncIsUpdating();
    this.cartProductItems$ = this.$cart.sync().pipe(
      map((products: Product[]) => 
        ((products.find(product => product.id === this.product.id) || {quantity: 0}).cart?.quantity || 0)
      )
    )

    this.inWishlist$ = this.$wishlist.sync().pipe(
      map((products: Product[]) => 
        {
          if((products && products.length > 0 && products.find(product => product.id === this.product.id))){
            return true;
          } else {
            return false;
          }
        }
      )
    )
    this.inCartlist$ = this.$cart.sync().pipe(
      map((products: Product[]) => 
        {
          if(
            products && 
            products.find(product => product.id === this.product.id) &&
            (products.find(product => product.id === this.product.id) as any).cart?.quantity > 0
            ){
            return true;
          } else {
            return false;
          }
        }
      )
    )
  }

  ngOnInit(): void {
    this.cartProductItems$.subscribe(cartSize => {
      if(cartSize > 0) this.status = 'added';
      if(cartSize == 0) this.status = 'none';
    })
  }

  goToProductPage(productId: any){
    this.route.navigateByUrl('/products/'+productId)
  }

  async addToCart(){
    const isCartEmpty = this.$cart.isCartEmpty();
    const product = JSON.parse(JSON.stringify(this.product) + '');
    const response = await this.$cart.addToCart(product);
    if(isCartEmpty){
      setTimeout(() => this.$cart.doOpenCart(), 1000);
    }
  }
  async removeFromCart(){
    const product = JSON.parse(JSON.stringify(this.product) + '');
    this.$cart.removeToCart(product);
  }
  async removeAllFromCart(){
    const product = JSON.parse(JSON.stringify(this.product) + '');
    this.$cart.removeAllToCart(product);
  }

  async toogleToWishlist(){
    const product = JSON.parse(JSON.stringify(this.product) + '');
    this.$wishlist.toogleToWishlist(product);
  }
  isProductDiscount(product:any){
    return (product && product.discount && product.discount > 0) ? true : false;
  }
  

}
