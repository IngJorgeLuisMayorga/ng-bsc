import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AdminPagesComponent } from './admin-pages.component';
import { AdminPagesRoutingModule } from './admin-pages.routing';
import { AdminPageUsersComponent } from './admin-page-users/admin-page-users.component';
import { AdminPageProductsComponent } from './admin-page-products/admin-page-products.component';
import { AdminPageCouponsComponent } from './admin-page-coupons/admin-page-coupons.component';
import { AdminPagePaymentsComponent } from './admin-page-payments/admin-page-payments.component';
import { AdminPageOrdersComponent } from './admin-page-orders/admin-page-orders.component';
import { AdminPageCategoriesComponent } from './admin-page-categories/admin-page-categories.component';
import { AdminPageUserComponent } from './admin-page-user/admin-page-user.component';
import { AdminPageCouponComponent } from './admin-page-coupon/admin-page-coupon.component';
import { AdminPageCategoryComponent } from './admin-page-category/admin-page-category.component';
import { AdminPageOrderComponent } from './admin-page-order/admin-page-order.component';
import { AdminPagePaymentComponent } from './admin-page-payment/admin-page-payment.component';
import { AdminPageProductComponent } from './admin-page-product/admin-page-product.component';


import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import {SelectButtonModule} from 'primeng/selectbutton';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RippleModule} from 'primeng/ripple';
import {TabViewModule} from 'primeng/tabview';
import { FormsModule } from '@angular/forms';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputSwitchModule} from 'primeng/inputswitch';

const pages = [
  AdminPageUserComponent, 
  AdminPageCouponComponent, 
  AdminPageCategoryComponent, 
  AdminPageOrderComponent, 
  AdminPagePaymentComponent, 
  AdminPageProductComponent,
  AdminPagesComponent,
   AdminPageUsersComponent, 
   AdminPageProductsComponent, 
   AdminPageCouponsComponent, 
   AdminPagePaymentsComponent, 
   AdminPageOrdersComponent, 
   AdminPageCategoriesComponent
];

@NgModule({
  declarations: [...pages, AdminPageUserComponent, AdminPageCouponComponent, AdminPageCategoryComponent, AdminPageOrderComponent, AdminPagePaymentComponent, AdminPageProductComponent],
  exports: [...pages],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    TableModule,
    ButtonModule,
    InputTextModule,
		CheckboxModule,
		RadioButtonModule,
    RippleModule,
    FormsModule,
    DropdownModule,
    InputTextareaModule,
    BrowserAnimationsModule,
    AdminPagesRoutingModule,
    InputSwitchModule,
    SelectButtonModule
  ]
})
export class AdminPagesModule { }
