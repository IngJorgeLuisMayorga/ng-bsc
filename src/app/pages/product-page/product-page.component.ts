import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from 'src/app/core/cart/services/cart.service';
import { IProduct, Product } from 'src/app/core/products/models/IProduct.model';
import { ProductsService } from 'src/app/core/products/products.service';
import { WishlistService } from 'src/app/core/wishlist/services/wishlist.service';
import Products from '../../../app/config/products';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.less']
})
export class ProductPageComponent implements OnInit {

  public tab = 'description';
  
  public wishlist$: Observable<Product[]>;
  public inWishlist$: Observable<boolean>;

  public products: Product[] = [];
  public productId: number = 0;
  public product: Product | null = null;

  public productA: Product | null = null;
  public productB: Product | null = null;
  public productC: Product | null = null;

  public breadcumbs: Array<{ path: string; text: string }> = [];

  public isCartOpen$ :  Observable<boolean>;
  public cartlist$: Observable<number>;

  public numberToAddCart = 1;
  public activeThumb = 0;
  
  public MAX_INGREDIENTS_SIZE = 400;
  public maxIngredientSize = this.MAX_INGREDIENTS_SIZE;

  constructor(private route: ActivatedRoute, private $cart: CartService, private $wishlist: WishlistService, private $products:ProductsService) { 
      this.isCartOpen$ = this.$cart.isOpen$;
      this.wishlist$ = this.$wishlist.sync();

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

  async ngOnInit() {
    this.products = await this.$products.getProducts();
    this.productId = parseInt(this.route.snapshot.paramMap.get("id"), 10);
    // this.product = this.products.find(product => product.id === this.productId);
    this.product = await this.$products.getProduct(this.productId);
    const _products: Product[] = await this.$products.getProductsRecommended(this.product);
    this.productA = _products[0];
    this.productB = _products[1];
    this.productC = _products[2];
    this.breadcumbs = [
    {
      text:'Inicio',
      path: '/',
    },
    {
      text:'Rutina Coreana',
      path: '/rutina',
    },
    {
      text:'Serums',
      path: '/Serums',
    },
    {
      text: this.product.name,
      path: '/product/' + this.product.id,
    },
    ]

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

  toogleVerMas(){
    if(this.maxIngredientSize === this.MAX_INGREDIENTS_SIZE){
      this.maxIngredientSize = 1000;
    } else {
      this.maxIngredientSize = this.MAX_INGREDIENTS_SIZE;
    }
  }
  setThumb(index: number){
    this.activeThumb = index;
  }

  setTab(tabname: string){
    this.maxIngredientSize = this.MAX_INGREDIENTS_SIZE;
    this.tab = tabname;
  }

  sortBy(items: any[]) {
    if(items){
    return items.sort(function( a , b){
      if(a.value.index > b.value.index ) return 1;
      if(a.value.index  < b.value.index ) return -1;
      return 0;
    });
  } else {
    return []
  }
  }


  addToCart(){
    this.numberToAddCart = this.numberToAddCart + 1;
  }
  removeFromCart(){
    this.numberToAddCart = Math.max(0, this.numberToAddCart - 1);
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
