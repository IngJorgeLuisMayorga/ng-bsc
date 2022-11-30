import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/cart/services/cart.service';
import { ICheckoutProduct } from 'src/app/pages/checkout-page/models/checkout-cart.model';
import { Product } from '../../models/IProduct.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.less']
})
export class ProductItemComponent implements OnInit {

  @Input()
  index!: number;

  @Input()
  product!: ICheckoutProduct;

  @Input()
  isOrder: boolean = false;
  
  constructor(
    private $cart: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  addItemToCart(){
    const product = this.$cart.getCart().find(item => item.id === this.product.id);
    this.$cart.addToCart(product);
  }
  removeItemToCart(){
    const product = this.$cart.getCart().find(item => item.id === this.product.id);
    this.$cart.removeToCart(product);
  }
  removeItem(){
    const product = this.$cart.getCart().find(item => item.id === this.product.id);
    this.$cart.removeAllToCart(product);
  }

  goToProduct(id: number){
    this.router.navigateByUrl('products/'+id)
  }
  goToBrand(brand: string){
    this.router.navigateByUrl('brands/'+brand)
  }
}
