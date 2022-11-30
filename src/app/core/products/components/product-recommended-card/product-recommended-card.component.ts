import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from 'src/app/core/cart/services/cart.service';
import { WishlistService } from 'src/app/core/wishlist/services/wishlist.service';
import { IProduct, Product } from '../../models/IProduct.model';

@Component({
  selector: 'app-product-recommended-card',
  templateUrl: './product-recommended-card.component.html',
  styleUrls: ['./product-recommended-card.component.less']
})
export class ProductRecommendedCardComponent implements OnInit {

  @Input()
  size: string = '33.3%';

  @Input()
  product: Product;

  public wishlist$: Observable<Product[]>;
  public inWishlist$: Observable<boolean>;
  public inCartlist$: Observable<boolean>;
  public cartlist$: Observable<number>;

  public cart$: Observable<Product[]>;
  public status = 'none';

  public cartIsUpdating$: Observable<number>;
  public cartProductItems$: Observable<number>;

  @Input()
  showStepLabel: boolean = false;

  @Input()
  colorStepLabel: string = '';

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

    
    this.cartlist$ = this.$cart.sync().pipe(
      map((products: Product[]) => 
        {
          if(
            products && 
            products.find(product => product.id === this.product.id) &&
            (products.find(product => product.id === this.product.id) as any).cart?.quantity > 0
            ){
            return products.find(product => product.id === this.product.id).cart?.quantity;
          } else {
            return 0;
          }
        }
      )
    )
  }

  ngOnInit(): void {
   
  }

  async addToCart2(){

    const isCartEmpty = this.$cart.isCartEmpty();
    const product = JSON.parse(JSON.stringify(this.product) + '');
    const response = await this.$cart.addToCart(product);
    if(isCartEmpty){
      setTimeout(() => this.$cart.doOpenCart(), 1000);
    }

  }
  async removeFromCart2(){
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


}
