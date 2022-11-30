import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/core/cart/services/cart.service';
import { Order } from 'src/app/core/orders/orders.model';
import { Product } from 'src/app/core/products/models/IProduct.model';
import { UsersService } from 'src/app/core/users/users.service';
import { IFormField } from 'src/app/shared/components/forms/form-basic/form-basic.component';
import { ICheckoutCart, ICheckoutProduct, ICheckoutShipping, ICheckoutUser } from '../../models/checkout-cart.model';

@Component({
  selector: 'app-checkout-details2',
  templateUrl: './checkout-details.component.html',
  styleUrls: ['./checkout-details.component.less']
})
export class CheckoutDetails2Component implements OnInit {

  @Input()
  user: ICheckoutUser;

  @Input()
  shipping: ICheckoutShipping;

  @Input()
  products!: ICheckoutProduct[];

  @Input()
  total!: number;

  @Input()
  points!: number;

  @Input()
  disabled!: boolean;

  @Input()
  step!: 'carrito' | 'datos' | 'envio' | 'pago' | 'completado';

  @Output()
  nContinue = new EventEmitter();

  constructor(private $cart: CartService, private $user: UsersService) {  }

  ngOnInit(): void { }

  public get size(){
    return this.products.map(item => item.quantity).reduce((prev, curr) => prev + curr , 0);
  }

  public doContinue(){
    this.nContinue.emit();
  }

}
