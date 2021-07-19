import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/core/cart/services/cart.service';
import { IProduct } from '../../models/IProduct.model';

import { map } from 'rxjs/operators';
import { WishlistService } from 'src/app/core/wishlist/services/wishlist.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.less']
})
export class ProductCardComponent implements OnInit {

  @Input()
  product!: IProduct;

  @Input()
  discount!: number;

  @Input()
  mode: string = 'full';

  public wishlist$: Observable<IProduct[]>;
  public inWishlist$: Observable<boolean>;
  public inCartlist$: Observable<boolean>;

  public cart$: Observable<IProduct[]>;
  public status = 'none';

  public cartIsUpdating$: Observable<number>;
  public cartProductItems$: Observable<number>;

  constructor(private $cart: CartService, private $wishlist: WishlistService) {

    this.cart$ = this.$cart.sync();
    this.wishlist$ = this.$wishlist.sync();

    this.cartIsUpdating$ = this.$cart.syncIsUpdating();
    this.cartProductItems$ = this.$cart.sync().pipe(
      map((products: IProduct[]) => 
        ((products.find(product => product.id === this.product.id) || {quantity: 0}).cart?.quantity || 0)
      )
    )

    this.inWishlist$ = this.$wishlist.sync().pipe(
      map((products: IProduct[]) => 
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
      map((products: IProduct[]) => 
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

  async addToCart(){
    const product = JSON.parse(JSON.stringify(this.product) + '');
    const response = await this.$cart.addToCart(product);
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
