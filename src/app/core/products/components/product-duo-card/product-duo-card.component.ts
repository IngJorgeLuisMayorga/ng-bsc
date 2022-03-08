import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/core/cart/services/cart.service';
import { IProduct, Product } from '../../models/IProduct.model';

import { map } from 'rxjs/operators';
import { WishlistService } from 'src/app/core/wishlist/services/wishlist.service';
import products from 'src/app/config/products';

@Component({
  selector: 'app-product-duo-card',
  templateUrl: './product-duo-card.component.html',
  styleUrls: ['./product-duo-card.component.less']
})
export class ProductDuoCardComponent implements OnInit {

  @Input()
  id!: number;

  @Input()
  price!: number;

  @Input()
  discount!: number;

  @Input()
  product!: Product;

  @Input()
  productA!: Product;

  @Input()
  productB!: Product;

  public wishlist$: Observable<Product[]>;
  public inWishlist$: Observable<boolean>;
  public inCartlist$: Observable<boolean>;

  public cart$: Observable<Product[]>;
  public status = 'none';

  public cartIsUpdating$: Observable<number>;
  public cartProductItems$: Observable<number>;

  

  constructor(private $cart: CartService, private $wishlist: WishlistService) {
    
    this.cart$ = this.$cart.sync();
    this.wishlist$ = this.$wishlist.sync();

    this.cartIsUpdating$ = this.$cart.syncIsUpdating();
    this.cartProductItems$ = this.$cart.sync().pipe(
      map((products: Product[]) => 
        ((products.find(product => product.id === this.id) || {quantity: 0}).cart?.quantity || 0)
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
    const productA = products.find(_product => _product.id === product.duo.productA_id);
    const productB = products.find(_product => _product.id === product.duo.productB_id);
  
    setTimeout(() => this.$wishlist.toogleToWishlist(product),500)
    setTimeout(() => this.$wishlist.toogleToWishlist(productA),1000)
    setTimeout(() => this.$wishlist.toogleToWishlist(productB),1500)

  }

  isProductDiscount(product:any){
    return (product && product.discount && product.discount > 0) ? true : false;
  }

  get_whishlist(){
      return this.$wishlist.wishlist$;
  }

  public get duo(){
    return this.product.duo;
  }
  
}
