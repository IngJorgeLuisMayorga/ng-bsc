import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from 'src/app/core/cart/services/cart.service';
import { IProduct } from 'src/app/core/products/models/IProduct.model';
import Products from '../../../app/config/products';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.less']
})
export class ProductPageComponent implements OnInit {

  public tab = 'description';

  public products: IProduct[] = [];
  public productId: number = 0;
  public product: IProduct | null = null;

  public breadcumbs: Array<{ path: string; text: string }> = [];

  public isCartOpen$ :  Observable<boolean>;
  public cartlist$: Observable<number>;

  constructor(private route: ActivatedRoute, private $cart: CartService) { 
      this.isCartOpen$ = this.$cart.isOpen$;
      
  }

  ngOnInit(): void {
    this.products = Products;
    this.productId = parseInt(this.route.snapshot.paramMap.get("id"), 10);
    this.product = this.products.find(product => product.id === this.productId)
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
    map((products: IProduct[]) => 
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


  setTab(tabname: string){
    this.tab = tabname;
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

}
