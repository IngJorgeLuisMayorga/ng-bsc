import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartSidebarComponent } from './components/cart-sidebar/cart-sidebar.component';



@NgModule({
  declarations: [
    CartSidebarComponent
  ],
  exports:[
    CartSidebarComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CartModule { }
