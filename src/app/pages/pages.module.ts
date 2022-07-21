import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PagesRoutes } from './pages.routes';
import { HomePageModule } from './home-page/home-page.module';
import { ProductPageModule } from './product-page/product-page.module';
import { AdminPagesModule } from './admin-pages/admin-pages.module';
import { ProfilePageModule } from './profile-page/profile-page.module';
import { CheckoutPageModule } from './checkout-page/checkout-page.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,

    HomePageModule,
    ProductPageModule,
    AdminPagesModule,
    ProfilePageModule,
    CheckoutPageModule,
    
    RouterModule.forRoot(PagesRoutes, { useHash: false })
  ]
})
export class PagesModule { }
