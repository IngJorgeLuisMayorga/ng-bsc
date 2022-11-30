import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/core/orders/orders.model';
import { OrdersService } from 'src/app/core/orders/orders.service';

@Component({
  selector: 'app-checkout-thanks-form',
  templateUrl: './checkout-thanks-form.component.html',
  styleUrls: ['./checkout-thanks-form.component.less']
})
export class CheckoutThanksFormComponent implements OnInit {

  
  @Input()
  order!: Order;

  constructor(private orderService: OrdersService) { 
   
  }

  ngOnInit(): void {
  }



}
