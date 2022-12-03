import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../orders.model';

@Component({
  selector: 'app-order-state-header',
  templateUrl: './order-state-header.component.html',
  styleUrls: ['./order-state-header.component.less']
})
export class OrderStateHeaderComponent implements OnInit {

  @Input()
  order?: Order;
  
  constructor() { }

  ngOnInit(): void {
  }

  get id(): string{
    return String(this.order?.id).padStart(6,'0')
  }

}
