import { Component, Input, OnInit } from '@angular/core';
import { ICheckoutProduct, ICheckoutShipping } from '../../../models/checkout-cart.model';

@Component({
  selector: 'app-details-summary',
  templateUrl: './details-summary.component.html',
  styleUrls: ['./details-summary.component.less']
})
export class DetailsSummaryComponent implements OnInit {

  @Input()
  shipping: ICheckoutShipping;

  @Input()
  products!: ICheckoutProduct[];

  @Input()
  totalQuantity!: number;

  @Input()
  totalPrice!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
