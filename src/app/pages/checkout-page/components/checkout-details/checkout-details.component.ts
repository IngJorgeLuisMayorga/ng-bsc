import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/core/cart/services/cart.service';
import { Product } from 'src/app/core/products/models/IProduct.model';
import { IFormField } from 'src/app/shared/components/forms/form-basic/form-basic.component';

@Component({
  selector: 'app-checkout-details',
  templateUrl: './checkout-details.component.html',
  styleUrls: ['./checkout-details.component.less']
})
export class CheckoutDetailsComponent implements OnInit {

  @Input()
  user: IFormField[] = [];

  @Input()
  shipping: IFormField[] = [];

  @Input()
  products!: Product[];

  @Input()
  isFinal!: boolean;

  @Input()
  total!: number;

  @Input()
  enabledFinishBtn!: boolean;

  @Output()
  nContinue = new EventEmitter();

  @Output()
  nFinish = new EventEmitter();
  
  public shippingStatus$;

  constructor(private $cart: CartService) { 
    this.shippingStatus$ = this.$cart.syncShippingStatus();
  }

  ngOnInit(): void {
  }


  get numberProducts(){
    return this.products
    .filter(product => product.cart)
    .map(product => product.cart.quantity)
    .reduce((sum, number) => sum + number);
  }

  doContinue(){
    this.nContinue.emit();
  }
  doFinish(){
    this.nFinish.emit();
  }

}
