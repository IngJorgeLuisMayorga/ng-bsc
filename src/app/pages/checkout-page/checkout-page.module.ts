import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CheckoutPageComponent } from './checkout-page.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { LayoutsModule } from 'src/app/layouts/layouts.module';

import {InputTextModule} from 'primeng/inputtext';
import { CheckoutProductListComponent } from './components/checkout-product-list/checkout-product-list.component';
import { CheckoutDetailsComponent } from './components/checkout-details/checkout-details.component';
import { CheckoutShippingFormComponent } from './components/checkout-shipping-form/checkout-shipping-form.component';
import { CheckoutPaymentFormComponent } from './components/checkout-payment-form/checkout-payment-form.component';
import { CheckoutUserFormComponent } from './components/checkout-user-form/checkout-user-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CheckoutThanksFormComponent } from './components/checkout-thanks-form/checkout-thanks-form.component';

@NgModule({
  declarations: [CheckoutPageComponent, CheckoutProductListComponent, CheckoutDetailsComponent, CheckoutShippingFormComponent, CheckoutPaymentFormComponent, CheckoutUserFormComponent, CheckoutThanksFormComponent],
  exports: [CheckoutPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CoreModule,
    LayoutsModule,
    InputTextModule
  ],
  providers:[CurrencyPipe]
})
export class CheckoutPageModule { }
