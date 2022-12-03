import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderStateHeaderComponent } from './components/order-state-header/order-state-header.component';



@NgModule({
  declarations: [OrderStateHeaderComponent],
  exports:[OrderStateHeaderComponent],
  imports: [
    CommonModule
  ]
})
export class OrdersModule { }
