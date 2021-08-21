import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  }


  setTab(tabname: string){
    this.tab = tabname;
  }

}
