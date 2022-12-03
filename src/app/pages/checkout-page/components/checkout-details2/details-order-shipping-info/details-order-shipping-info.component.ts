import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/core/orders/orders.model';
import { User } from 'src/app/core/users/user.model';
import { ICheckoutUser } from '../../../models/checkout-cart.model';

@Component({
  selector: 'app-details-order-shipping-info',
  templateUrl: './details-order-shipping-info.component.html',
  styleUrls: ['./details-order-shipping-info.component.less']
})
export class DetailsOrderShippingInfoComponent implements OnInit {

  @Input()
  order!: Order;
  
  @Input()
  user!: ICheckoutUser;

  constructor() { }

  ngOnInit(): void {
  }

  get points(): number{
    if(!this.user){
      return 0;
    }
    if(!this.order){
      return 0;
    }
    return Math.round(this.user?.points + this.order?.order_points);
  }

}
