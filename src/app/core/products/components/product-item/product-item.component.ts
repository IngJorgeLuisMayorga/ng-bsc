import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/cart/services/cart.service';
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
  product!: Product;

  @Input()
  isOrder: boolean = false;
  
  constructor(
    private $cart: CartService
  ) { }

  ngOnInit(): void {
  }

  addItemToCart(){
    this.$cart.addToCart(this.product);
  }
  removeItemToCart(){
    this.$cart.removeToCart(this.product);
  }
  removeItem(){
    this.$cart.removeAllToCart(this.product);
  }
}
