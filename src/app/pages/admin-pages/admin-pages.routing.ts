import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminPageCategoriesComponent } from './admin-page-categories/admin-page-categories.component';
import { AdminPageCouponComponent } from './admin-page-coupon/admin-page-coupon.component';
import { AdminPageCouponsComponent } from './admin-page-coupons/admin-page-coupons.component';
import { AdminPageOrdersComponent } from './admin-page-orders/admin-page-orders.component';
import { AdminPagePaymentsComponent } from './admin-page-payments/admin-page-payments.component';
import { AdminPageProductComponent } from './admin-page-product/admin-page-product.component';
import { AdminPageProductsComponent } from './admin-page-products/admin-page-products.component';
import { AdminPageUserComponent } from './admin-page-user/admin-page-user.component';
import { AdminPageUsersComponent } from './admin-page-users/admin-page-users.component';

import { AdminPagesComponent } from './admin-pages.component';

export const routes = [
  {
    path: 'admin',
    component: AdminPagesComponent,
    children: [
        {
            path: 'users',
            component: AdminPageUsersComponent,
        },
        {
            path: 'users/:id',
            component: AdminPageUserComponent,
        },
        {
            path: 'products',
            component: AdminPageProductsComponent,
        },
        {
          path: 'products/:id',
           component: AdminPageProductComponent,
        },
        {
            path: 'coupons',
            component: AdminPageCouponsComponent,
        },
        {
            path: 'coupons/:id',
             component: AdminPageCouponComponent,
          },
        {
            path: 'orders',
            component: AdminPageOrdersComponent,
        },
        {
            path: 'categories',
            component: AdminPageCategoriesComponent,
        },
        {
            path: 'payments',
            component: AdminPagePaymentsComponent,
        }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPagesRoutingModule {}