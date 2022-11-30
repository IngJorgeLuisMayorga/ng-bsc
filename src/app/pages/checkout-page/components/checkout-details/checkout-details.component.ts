import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/core/cart/services/cart.service';
import { Order } from 'src/app/core/orders/orders.model';
import { Product } from 'src/app/core/products/models/IProduct.model';
import { UsersService } from 'src/app/core/users/users.service';
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
  isDone!: boolean;

  @Input()
  total!: number;

  @Input()
  points!: any;

  @Input()
  enabledFinishBtn!: boolean;

  @Input()
  isOrder: boolean = false;

  @Input()
  order!: Order;

  @Input()
  step!: 'carrito' | 'datos' | 'envio' | 'pago' | 'completado';

  @Output()
  nContinue = new EventEmitter();

  @Output()
  nFinish = new EventEmitter();
  
  public shippingStatus$;
  public bubblePoints  = 0;
  public isOpenProducts = false;

  constructor(private $cart: CartService, private $user: UsersService) { 
    this.shippingStatus$ = this.$cart.syncShippingStatus();
  }

  ngOnInit(): void {

  }


  doOpenProducts(){
    this.isOpenProducts = !this.isOpenProducts;
  }
  get shippingPrice(){
    if(!(this.shipping && this.shipping[4])){
      return null;
    } 
    return this.shipping[4].options.find( option => option.value === this.shipping[4].value ).price;
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
  async doFinish(){
    this.nFinish.emit();
    
  }

}
