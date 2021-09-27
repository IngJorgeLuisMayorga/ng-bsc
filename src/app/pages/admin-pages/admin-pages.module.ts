import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

const pages = [AdminPagesComponent, AdminPageUsersComponent, AdminPageProductsComponent, AdminPageCouponsComponent, AdminPagePaymentsComponent, AdminPageOrdersComponent, AdminPageCategoriesComponent];

@NgModule({
  declarations: [...pages, AdminPageUserComponent, AdminPageCouponComponent, AdminPageCategoryComponent, AdminPageOrderComponent, AdminPagePaymentComponent, AdminPageProductComponent],
  exports: [...pages],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    AdminPagesRoutingModule
  ]
})
export class AdminPagesModule { }
