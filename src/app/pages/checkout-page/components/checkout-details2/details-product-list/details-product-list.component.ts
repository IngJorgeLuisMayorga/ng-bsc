import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/cart/services/cart.service';
import { Product } from 'src/app/core/products/models/IProduct.model';
import { ICheckoutProduct } from '../../../models/checkout-cart.model';

@Component({
  selector: 'app-details-product-list',
  templateUrl: './details-product-list.component.html',
  styleUrls: ['./details-product-list.component.less']
})
export class DetailsProductListComponent implements OnInit {

  @Input()
  products!: ICheckoutProduct[];

  public isOpenProducts: boolean = false;

  constructor(private $cart:CartService) { }

  ngOnInit(): void {
  }

  public doToogleProducts(){
    this.isOpenProducts = !this.isOpenProducts;
  }

  removeItem(_product: ICheckoutProduct){
    const product = this.$cart.getCart().find(item => item.id === _product.id);
    this.$cart.removeAllToCart(product);
  }

}
