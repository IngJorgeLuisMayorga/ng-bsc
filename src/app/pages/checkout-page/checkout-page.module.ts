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
import { CheckoutView0CartComponent } from './views/checkout-view0-cart/checkout-view0-cart.component';
import { CheckoutView1AccountComponent } from './views/checkout-view1-account/checkout-view1-account.component';
import { CheckoutView2DataComponent } from './views/checkout-view2-data/checkout-view2-data.component';
import { CheckoutView3PaymentComponent } from './views/checkout-view3-payment/checkout-view3-payment.component';
import { CheckoutView4FinishComponent } from './views/checkout-view4-finish/checkout-view4-finish.component';
import { RouterModule } from '@angular/router';
import { CheckoutViewComponent } from './views/checkout-view/checkout-view.component';
import { CheckoutDetails2Component } from './components/checkout-details2/checkout-details.component';
import { DetailsProductListComponent } from './components/checkout-details2/details-product-list/details-product-list.component';
import { DetailsSummaryComponent } from './components/checkout-details2/details-summary/details-summary.component';

export const Routes = [
  //  Home Page Component
  {
    path: 'checkout',
    component: CheckoutPageComponent,
    children: [
      {
        path:'cart', component: CheckoutView0CartComponent
      },
      {
        path:'account', component: CheckoutView1AccountComponent
      },
      {
        path:'data', component: CheckoutView2DataComponent
      },
      {
        path:'payment', component: CheckoutView3PaymentComponent
      },
      {
        path:'finish', component: CheckoutView4FinishComponent
      },
    ]
  },
];


@NgModule({
  declarations: [
    CheckoutPageComponent, 
    CheckoutProductListComponent, 
    CheckoutDetailsComponent, 
    CheckoutShippingFormComponent, 
    CheckoutPaymentFormComponent, 
    CheckoutUserFormComponent, 
    CheckoutThanksFormComponent, 
    CheckoutView0CartComponent, 
    CheckoutView1AccountComponent, 
    CheckoutView2DataComponent, 
    CheckoutView3PaymentComponent,
     CheckoutView4FinishComponent,
     CheckoutDetails2Component, 
     CheckoutViewComponent, DetailsProductListComponent, DetailsSummaryComponent],
  exports: [CheckoutPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
     RouterModule.forRoot(Routes, { useHash: false }),
    InputTextModule,
    CoreModule,
    LayoutsModule,
  ],
  providers:[CurrencyPipe]
})
export class CheckoutPageModule { }
